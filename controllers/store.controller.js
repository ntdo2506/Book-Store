const db = require('../db')

module.exports.index = (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let perPage = 8;
    let start = (page -1) * perPage;
    let end = page * perPage;
    let sessionId = req.signedCookies.sessionId;
    if(db.get("sessions").find({ id: sessionId }).get("cart").value() )
        {res.locals.cartCount = Object.values(db.get("sessions")
        .find({ id: sessionId }).get("cart").value())
        .reduce((acc, cur) => acc + cur, 0);}
    res.render("store/index", {
    books: db.get("books").value().slice(start, end)
    });
}
