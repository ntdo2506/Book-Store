const db = require("../db");
const User = require("../models/user.model");

module.exports.requireRole = (isAdmin) => {
    return async function (req, res, next) {
        let user = await User.findById(req.signedCookies.userId1);
        if (user.isAdmin === isAdmin) {
            next();
        } else res.send(403);
    };
};
