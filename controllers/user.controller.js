const shortid = require('shortid')
const db = require('../db')
const md5 = require('md5')
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'echsd', 
    api_key: '574173492831595', 
    api_secret: 'snv5aigseeto6DQYd_RL9z8jpLQ' 
});

module.exports.index = (req, res) =>{
    let page = parseInt(req.query.page) || 1;
    let perPage = 10;
    let start = (page -1) * perPage;
    let end = page * perPage;
    res.render('users/index',{
        users: db.get("users").value().slice(start, end)
    });   
}

module.exports.add = (req, res) =>{
    res.render('users/add')
}

module.exports.postAdd = (req, res) =>{
    req.body.id = shortid.generate(); 
    req.body.isAdmin = false;
    req.body.avatarUrl = "https://res.cloudinary.com/echsd/image/upload/v1587956694/avatar_pswii2.png";
    req.body.wrongLoginCount = 0;
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        req.body.password = hash;
        db.get('users').push(req.body).write();
    });
    res.redirect("/users");
}

module.exports.delete = (req, res) =>{
    let id = req.params.id;
    db.get('users').remove({id: id}).write();
    res.redirect("/users");
}

module.exports.update = (req, res) =>{
    let id = req.params.id;
    res.render("users/profile",{
        id: id,
        user: db.get("users").find({id: id}).value()
    });
}

module.exports.postUpdate = (req, res) =>{
    let id = req.body.id;
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        req.body.password = hash;
        db.get('users').find({id: id}).assign({ 
            name: req.body.name, 
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password
        }).write();
        res.redirect("/users");
    });
}

module.exports.updateAvatar = (req,res) =>{
    let id = req.params.id;
    res.render("users/updateAvatar",{
        id: id,
        user: db.get("users").find({id: id}).value()
    });
}

module.exports.postUpdateAvatar = (req, res) =>{
    let id = req.body.id;
    cloudinary.uploader.upload(req.body.coverUrl, function(error, result) {
        db.get('users').find({id: id}).assign({ 
            avatarUrl: result.url
        }).write();
        res.redirect("/users");
    });
}