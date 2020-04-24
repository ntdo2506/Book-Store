const db = require('../db')

module.exports.requireRole = (isAdmin) =>{
    return function (req, res, next){
        let user = db.get("users").find({id: req.signedCookies.userId1}).value();
        if (user.isAdmin === isAdmin){
            res.locals.user = user;
            next();
        } else res.send(403);
    }
}
