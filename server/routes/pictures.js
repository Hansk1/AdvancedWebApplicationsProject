var express = require("express");
var multer = require("multer");
var router = express.Router();
const mongoose = require("mongoose");
const ProfilePicture = require("../models/ProfilePicture");
const User = require("../models/User");
const passport = require("../auth/validateToken");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const upload = multer();

//GET img
router.get("/:pictureId", (req, res, next) => {
    const pictureId = req.params.pictureId;
    console.log(pictureId);
    ProfilePicture.findOne({ _id: pictureId }, (err, img) => {
        if (err) return next(err);
        if (img) {
            //const imgData = Buffer.from(img.buffer, "binary");

            res.setHeader("Content-Type", img.mimetype);
            res.setHeader("Content-Disposition", "inline");
            return res.json({ imgbuffer: img.buffer });
            //return res.send(img);
        } else {
            return res.status(403).send("Not Found!");
        }
    });
});

/* POST img. */
router.post("/add", upload.single("profilePicture"), function (req, res, next) {
    const image = req.file;
    const { name, encoding, mimetype, buffer } = image;

    const newPicture = new ProfilePicture({
        encoding: encoding,
        mimetype: mimetype,
        buffer: buffer,
    });

    newPicture.save((err, savedPicture) => {
        if (err) return next(err);
        return res.json({ pictureId: savedPicture._id });
    });
});

module.exports = router;
