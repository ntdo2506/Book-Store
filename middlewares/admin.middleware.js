const db = require('../db')

module.exports.requireRole = (isAdmin) =>{
    return function (req, res, next){
        let user = db.get("users").find({id: req.cookies.userId1}).value();
        if (user.isAdmin === isAdmin){
            next();
        } else res.send(403);
    }
}
