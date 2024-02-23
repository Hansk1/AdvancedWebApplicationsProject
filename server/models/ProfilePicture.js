const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profilePictureSchema = new Schema({
    encoding: String,
    mimetype: String,
    buffer: Buffer,
});

module.exports = mongoose.model("ProfilePicture", profilePictureSchema);
