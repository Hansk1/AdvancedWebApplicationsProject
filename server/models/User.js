const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    profileText: {
        type: String,
        defaul: "User has not provided any information.",
    },
    password: { type: String },
    outgoingLikes: { type: Array },
    incomingLikes: { type: Array },
});

module.exports = mongoose.model("users", userSchema);
