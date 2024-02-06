var express = require("express");
const User = require("../models/User");
//const Todo = require("../models/Todo");
const passport = require("../auth/validateToken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

//Register:
router.post(
    "/register",
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                console.log(err);
                throw err;
            }
            if (user) {
                return res.status(403).json({ email: "Email already in use." });
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) {
                            throw err;
                        }
                        User.create(
                            {
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                email: req.body.email,
                                password: hash,
                            },
                            (err, ok) => {
                                if (err) throw err;
                                return res.json({
                                    message: "registeration ok",
                                });
                            }
                        );
                    });
                });
            }
        });
    }
);

//Login:
router.post(
    "/login",
    body("email").isEmail(),
    body("password").isStrongPassword(),
    (req, res, next) => {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) throw err;
            if (!user) {
                return res.status(403).json({ message: "Invalid credentials" });
            } else {
                bcrypt.compare(
                    req.body.password,
                    user.password,
                    (err, isMatch) => {
                        if (err) {
                            throw err;
                        }
                        if (isMatch) {
                            const jwtPayload = {
                                id: user._id,
                                email: user.email,
                            };
                            jwt.sign(
                                jwtPayload,
                                "ABCD123",
                                //process.env.SECRET,
                                {
                                    expiresIn: 30000,
                                },
                                (err, token) => {
                                    res.json({ success: true, token });
                                }
                            );
                        } else {
                            return res
                                .status(403)
                                .json({ message: "Invalid credentials" });
                        }
                    }
                );
            }
        });
    }
);

//Get random user from database:
router.get(
    "/random",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        User.aggregate(
            [
                { $match: { _id: { $ne: req.user._id } } },
                { $sample: { size: 1 } },
            ],
            function (err, userObject) {
                if (err) {
                    throw err;
                }
                if (userObject) {
                    return res.json({ foundUser: userObject[0] });
                } else {
                    res.json({ message: ["Error!"] });
                }
            }
        );
    }
);

//AddToLiked:
router.post(
    "/addlike",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        User.updateOne(
            { _id: req.user._id },
            { $addToSet: { likedUsers: req.body.likedUserId } }
        )
            .then((result) => {
                console.log(req.body.likedUserId);
                res.json({
                    success: true,
                    message: "User added to liked users list",
                });
            })
            .catch((error) => {
                res.status(500).json({
                    success: false,
                    message: "Failed to add user to liked users list",
                });
            });
    }
);

module.exports = router;
