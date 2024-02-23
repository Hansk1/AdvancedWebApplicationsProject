var express = require("express");
const User = require("../models/User");
const passport = require("../auth/validateToken");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
var router = express.Router();

// Register a new user
router.post(
    "/register",
    // Validate email and password
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            // Check if email already exists
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(403).json({ email: "Email already in use." });
            }
            // Hash the password
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            //Get the current date
            const currentDate = new Date();
            // Create a new user
            await User.create({
                registerationDate: currentDate.toISOString().split("T")[0],
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPassword,
            });
            return res.json({ message: "Registration successful" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to register user" });
        }
    }
);

// Login user
router.post("/login", body("email").isEmail(), async (req, res, next) => {
    try {
        // Find user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res
                .status(403)
                .json({ message: "Invalid credentials (Email)" });
        }
        // Compare passwords
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res
                .status(403)
                .json({ message: "Invalid credentials (Password)" });
        }
        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            "ABCD123", // TODO Replace with env variable
            { expiresIn: 30000 }
        );
        return res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to login" });
    }
});

// Get logged-in user's data
router.get(
    "/userdata",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            // Find user by ID
            const userData = await User.findOne({ _id: req.user._id });
            return res.json({ success: true, foundUser: userData });
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ success: false, message: "Failed to fetch user data" });
        }
    }
);

// Update user information
router.post(
    "/update-user",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            console.log(req.body);

            // Check if email is already in use
            const foundUser = await User.findOne({ email: req.body.email });
            if (foundUser) {
                return res.status(403).json({ email: "Email already in use." });
            }
            // Update user data
            await User.updateOne(
                { _id: req.user._id },
                {
                    $set: {
                        firstName: req.body.firstname,
                        lastName: req.body.lastname,
                        email: req.body.email,
                        profileText: req.body.profileText,
                        profilePicture: req.body.profilePictureId,
                    },
                }
            );
            return res.json({ success: true });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Failed to update user information",
            });
        }
    }
);

// Get a random user from the database
router.get(
    "/random",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        User.aggregate(
            [
                //Check that the found user isn't the logged user:
                { $match: { _id: { $ne: req.user._id } } },
                { $sample: { size: 1 } },
            ],
            (err, userObject) => {
                if (err) {
                    console.error(err);
                    return res
                        .status(500)
                        .json({ message: "Failed to get random user" });
                }
                if (userObject) {
                    return res.json({
                        message: "success",
                        foundUser: userObject[0],
                    });
                } else {
                    return res.json({ message: "No random user found" });
                }
            }
        );
    }
);

//Get user using id:
router.get(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const userId = req.params.id;
        User.findById(userId, (err, userObject) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Failed to get user" });
            }
            if (userObject) {
                return res.json({ foundUser: userObject });
            } else {
                return res.json({ message: "User not found" });
            }
        });
    }
);

// Add like
router.post(
    "/addlike",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            // Add outgoing like
            await User.updateOne(
                { _id: req.user._id },
                { $addToSet: { outgoingLikes: req.body.likedUserId } }
            );
            // Add incoming like
            await User.updateOne(
                { _id: req.body.likedUserId },
                { $addToSet: { incomingLikes: req.user._id.toString() } }
            );

            //If both users have liked each other, add their IDs to the chats list for both users
            const likedUser = await User.findById(req.body.likedUserId);

            if (likedUser.outgoingLikes.includes(req.user._id.toString())) {
                console.log("KISSA");
                await User.updateOne(
                    { _id: req.user._id },
                    { $addToSet: { chats: req.body.likedUserId.toString() } }
                );
                await User.updateOne(
                    { _id: req.body.likedUserId },
                    { $addToSet: { chats: req.user._id.toString() } }
                );
            }

            return res.json({ success: true, message: "Likes added" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Failed to add user to liked users list",
            });
        }
    }
);

module.exports = router;
