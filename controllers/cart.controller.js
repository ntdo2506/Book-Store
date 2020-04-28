const db = require('../db')

module.exports.addToCart = (req, res) =>{
    let sessionId = req.signedCookies.sessionId;
    let bookId = req.params.bookId;
    if(!sessionId){
        res.redirect('/store');
        return;
    }
    let count =  db.get('sessions').find({id : sessionId}).get('cart.' + bookId, 0).value();
    db.get('sessions').find({id : sessionId}).set('cart.' + bookId, count + 1).write();
    res.redirect('/store');
}

module.exports.index = (req, res) =>{
    let sessionId = req.signedCookies.sessionId;
    let cartData = db.get('sessions').find({id: sessionId}).value();
    let data
    if(db.get("sessions").find({ id: sessionId }).get("cart").value()) 
        { data = cartData.cart; } 
    else 
        { data =''; }
    res.render('books/cartData', { 
        dataBook: data,
        cartData: cartData,
        books: db.get("books").value()
    });
}