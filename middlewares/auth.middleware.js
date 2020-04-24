const db = require('../db')

module.exports.authRequire = (req, res, next) =>{
    if(!req.cookies.userId1){
        res.redirect('/auth/login');
        return;
    }
    let user = db.get("users").find({id: req.cookies.userId1}).value();
    if(!user){
        res.redirect('/auth/login');
        return;
    }
    next();
}