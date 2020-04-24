const md5 = require('md5')
const bcrypt = require('bcrypt')
const db = require('../db')
var nodemailer = require('nodemailer');

module.exports.auth = (req, res) => {
    res.render('auth/login')
}

module.exports.postAuth = (req, res) =>{
    let email = req.body.email;
    let password = req.body.password;
    let user = db.get("users").find({email: email}).value();
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "ntdo.13cdt1@gmail.com",
            pass: 'nguyenthanhdo12'
        }
    });
    var mailOptions = {
        from: "ntdo.13cdt1@gmail.com",
        to: "do.nguyen.tt.1995@gmail.com",
        subject: 'Gửi email dùng Node.js --- dammio.com',
        text: 'Xin chào, đây là email gửi bằng Node.js --- dammio.com'
    };
    if(!user){
        res.redirect('/auth/login');
        return;
    }
    let count = user.wrongLoginCount; 
    if (count >= 4){
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
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
            if (!user.isAdmin){
                res.redirect('/transaction/menu')
            }
            res.redirect('/users')
        }
    });    
    
}