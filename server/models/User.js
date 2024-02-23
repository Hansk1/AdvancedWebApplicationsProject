const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let userSchema = new Schema({
    registerationDate: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    profileText: {
        type: String,
        default: "User has not provided any information.",
    },
    profilePicture: { type: String, default: null },
    password: { type: String },
    outgoingLikes: { type: Array },
    incomingLikes: { type: Array },
    chats: { type: Array },
});

module.exports = mongoose.model("users", userSchema);
