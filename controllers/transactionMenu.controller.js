const Transaction = require("../models/transaction.model");
const Book = require("../models/book.model");

module.exports.menu = async (req, res) => {
    if (!req.signedCookies.userId1) {
        res.redirect("/auth/login");
        return;
    }
    let transaction = await Transaction.find({
        userId: req.signedCookies.userId1,
    });
    let books = await Book.find();
    res.render("transactions/menu", {
        transaction: transaction,
        books: books,
    });
};
