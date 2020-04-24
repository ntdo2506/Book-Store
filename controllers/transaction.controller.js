const shortid = require('shortid')
const db = require('../db')

module.exports.index = (req, res) =>{
    let page = parseInt(req.query.page) || 1;
    let perPage = 5;
    let start = (page - 1) * perPage;
    let end = page * perPage;
    res.render("transactions/index",{
        transactions: db.get('transactions').value().slice(start, end),
        users: db.get('users').value(),
        books: db.get('books').value()
    })
}

module.exports.create = (req, res) =>{
    res.render("transactions/create",{
        users: db.get('users').value(),
        books: db.get('books').value()
    })
}

module.exports.postCreate = (req, res) =>{
    req.body.id = shortid.generate();
    req.body.isComplete = false;
    db.get('transactions').push(req.body).write();
    res.redirect("/transactions");
}

module.exports.complete = (req, res) =>{
    let id = req.params.id;
    if (!db.get('transactions').find({id : id}).value()){
        res.redirect("/transactions");
        return;
    }
    db.get('transactions').find({id: id}).assign({ isComplete: true}).write();
    res.redirect("/transactions");
}

module.exports.menu = (req, res) =>{
    res.render("transactions/menu")
}
