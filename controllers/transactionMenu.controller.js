const db = require('../db')

module.exports.menu = (req, res) =>{ 
    if(!req.cookies.userId1){
        res.redirect('/auth/login');
        return;
    }
    let transaction = db.get('transactions').filter({userId : req.cookies.userId1}).value();
    res.render("transactions/menu",{
        transaction: transaction,
        books: db.get("books").value()
    })
}