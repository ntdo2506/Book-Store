const shortid = require('shortid')
const db = require('../db')
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'echsd', 
    api_key: '574173492831595', 
    api_secret: 'snv5aigseeto6DQYd_RL9z8jpLQ' 
});

module.exports.index = (req, res) => {
    res.render("books/index", {
    bookList: db.get("books").value()
    });
}

module.exports.add = (req, res) => {
    res.render("books/add")
}

module.exports.postAdd = (req, res) =>{
    req.body.id = shortid.generate();
    db.get("books").push(req.body).write();
    res.redirect("/books");
}

module.exports.delete = (req, res) =>{
    let id = req.params.id
    db.get("books").remove({id: id}).write();
    res.redirect("/books");
}

module.exports.update = (req, res) => {
    let id = req.params.id;
    res.render("books/update",{
        id: id,
        book: db.get("books").find({id: id}).value()
    });
}

module.exports.postUpdate = (req, res) => {
    let id = req.body.id
    cloudinary.uploader.upload(req.file.path, function(error, result) {
        db.get('books').find({ id: id }).assign({ 
            title: req.body.title,
            coverUrl: result.url
            }).write()
        res.redirect("/books");
    });
    
}