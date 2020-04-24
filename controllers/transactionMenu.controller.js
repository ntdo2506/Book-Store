const db = require('../db')

module.exports.menu = (req, res) =>{ 
    if(!req.signedCookies.userId1){
        res.redirect('/auth/login');
        return;
    }
    let transaction = db.get('transactions').filter({userId : req.signedCookies.userId1}).value();
    res.render("transactions/menu",{
        transaction: transaction,
        books: db.get("books").value()
    })
}