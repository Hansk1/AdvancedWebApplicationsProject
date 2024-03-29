const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let messageSchema = new Schema({
    sender: { type: String },
    receiver: { type: String },
    content: { type: String },
    date: { type: String },
});

module.exports = mongoose.model("messages", messageSchema);
