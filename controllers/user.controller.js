const shortid = require('shortid')
const db = require('../db')
const md5 = require('md5')
const bcrypt = require('bcrypt')

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
    res.render("users/update",{
        id: id,
        user: db.get("users").find({id: id}).value()
    });
}

module.exports.postUpdate = (req, res) =>{
    let id = req.body.id;
    db.get('users').find({id: id}).assign({ name: req.body.name}).write();
    res.redirect("/users");
}