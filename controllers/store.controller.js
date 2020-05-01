const Book = require("../models/book.model");
const Session = require("../models/session.mdel");

module.exports.index = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let perPage = 8;
    let start = (page - 1) * perPage;
    let end = page * perPage;
    let sessionId = req.signedCookies.sessionId;
    let result = 0;
    if (sessionId) {
        const session = await Session.findOne({ sessionId });
        if (session.cart !== []) {
            session.cart.forEach((item) => {
                result = result + item.quantity;
            });
        }
    }
    res.locals.cartCount = result;
    const book = await Book.find();
    var numberPage = Math.ceil(book.length / perPage);
    res.render("store/index", {
        books: book.slice(start, end),
        numberPage: numberPage,
        titleLink: "store",
        page: page,
    });
};
