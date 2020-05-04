const User = require("../models/user.model");

module.exports.authRequire = async (req, res, next) => {
    if (!req.signedCookies.userId1) {
        res.redirect("/auth/login");
        return;
    }
    let user = await User.findById(req.signedCookies.userId1);
    if (!user) {
        res.redirect("/auth/login");
        return;
    }
    res.locals.user = user;
    next();
};
