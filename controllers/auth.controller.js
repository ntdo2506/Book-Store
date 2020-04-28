const md5 = require('md5')
const bcrypt = require('bcrypt')
const db = require('../db')
var nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const shortid = require('shortid')

module.exports.auth = (req, res) => {
    res.render('auth/login')
}

module.exports.postAuth = (req, res) =>{
    let email = req.body.email;
    let password = req.body.password;
    let user = db.get("users").find({email: email}).value();
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: 'ntdo.13cdt1@gmail.com',
        from: 'do.nguyen.tt.1995@gmail.com',
        subject: 'Login book store',
        text: 'Mat khau sai qua 4 lan',
        html: '<strong>Mat khau sai qua 4 lan</strong>',
    };
    if(!user){
        res.redirect('/auth/login');
        return;
    }
    let count = user.wrongLoginCount; 
    if (count >= 4){
        sgMail
            .send(msg)
            .then(() => {}, error => {
                console.error(error);
            
                if (error.response) {
                console.error(error.response.body)
                }
            });
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
            res.cookie("userId1", user.id,{
                signed: true
            });
            let sessionId = req.signedCookies.sessionId;
            let bookId = db.get("sessions").find({id : sessionId}).value();
            let data = {
                userId: user.id,
                bookId: Object.keys(bookId.cart),
                id: shortid.generate(),
                isComplete: false
            };
            if (user.isAdmin === false){
                db.get('transactions').push(data).write();
                res.redirect('/transaction/menu')
            } else res.redirect('/users')
        }
    });    
    
}