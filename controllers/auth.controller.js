const md5 = require('md5')
const bcrypt = require('bcrypt')
const db = require('../db')

module.exports.auth = (req, res) => {
    res.render('auth/login')
}

module.exports.postAuth = (req, res) =>{
    let email = req.body.email;
    let password = req.body.password;
    let user = db.get("users").find({email: email}).value();
    if(!user){
        res.redirect('/auth/login');
        return;
    }
    let count = user.wrongLoginCount; 
    if (count >= 4){
        res.send("Wrong password more 4! Reset database");
        return;
    }
    bcrypt.compare(password, user.password, function(err, result) {
        if(!result){
            count = count + 1;
            db.get("users").find({email: email}).assign({wrongLoginCount: count }).write();
            res.redirect('/auth/login');
            return;
        } else {
            res.cookie("userId1", user.id);
            if (!user.isAdmin){
                res.redirect('/transaction/menu')
            }
            res.redirect('/users')
        }
    });    
    
}