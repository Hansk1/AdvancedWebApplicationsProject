var express = require("express");
const passport = require("../auth/validateToken");
const Message = require("../models/Message");
var router = express.Router();
const moment = require("moment");

// Add message
router.post(
    "/add",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            await Message.create({
                sender: req.user._id,
                receiver: req.body.receiver,
                content: req.body.content,
                date: moment().format("DD.MM, HH:mm"),
            });
            return res.json({ success: true });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Failed to send message",
            });
        }
    }
);

// Get messages
router.get(
    "/get-messages/:receiverId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const senderId = req.user._id;
            const receiverId = req.params.receiverId;

            // Find all messages where sender is senderId and receiver is receiverId
            const messages = await Message.find({
                $or: [
                    { sender: senderId, receiver: receiverId },
                    { sender: receiverId, receiver: senderId },
                ],
            });

            return res.json({ success: true, messages: messages });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve messages",
            });
        }
    }
);

module.exports = router;
