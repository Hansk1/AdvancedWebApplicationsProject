const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");
const passport = require("passport");

require("dotenv").config();

var opts = {};

opts.secretOrKey = "ABCD123";

opts.jwtFromRequest = function (req) {
    var token = null;
    console.log(req.cookies);
    if (req && req.cookies) {
        token = req.cookies.token;
    }
    return token;
};

passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({ _id: jwt_payload.id }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    })
);

module.exports = passport;
