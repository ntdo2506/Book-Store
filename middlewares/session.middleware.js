const shortid = require("shortid");
const Session = require("../models/session.mdel");

module.exports = async (req, res, next) => {
    let sessionId = shortid.generate();
    if (!req.signedCookies.sessionId) {
        res.cookie("sessionId", sessionId, { signed: true });
        await Session.create({
            sessionId: sessionId,
        });
    }
    next();
};
