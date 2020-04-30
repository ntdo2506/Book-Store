const Session = require("../models/session.mdel");
const Transaction = require("../models/transaction.model");
const Book = require("../models/book.model");

module.exports.addToCart = async (req, res) => {
    let sessionId = req.signedCookies.sessionId;
    let bookId = req.params.bookId;
    if (!sessionId) {
        res.redirect("/store");
        return;
    }
    const session = await Session.findOneAndUpdate({ sessionId });
    let shouldPush = true;
    session.cart.forEach((item) => {
        if (item.bookId.toString() === bookId) {
            item.quantity += 1;
            shouldPush = false;
        }
    });
    await session.save();
    if (shouldPush) {
        await Session.findOneAndUpdate(
            { sessionId },
            { $push: { cart: { bookId, quantity: 1 } } }
        );
    }
    res.redirect("/store");
};

module.exports.index = async (req, res) => {
    let sessionId = req.signedCookies.sessionId;
    let cartData = await Session.findOne({ sessionId });
    let books = await Book.find();
    res.render("books/cartData", {
        cartData: cartData.cart,
        books: books,
    });
};
