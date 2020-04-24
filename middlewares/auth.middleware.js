const db = require('../db')

module.exports.authRequire = (req, res, next) =>{
    if(!req.signedCookies.userId1){
        res.redirect('/auth/login');
        return;
    }
    let user = db.get("users").find({id: req.signedCookies.userId1}).value();
    if(!user){
        res.redirect('/auth/login');
        return;
    }
    res.locals.user = user;
    next();
}