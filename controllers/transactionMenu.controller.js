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
    let page = parseInt(req.query.page) || 1;
    let perPage = 10;
    let start = (page - 1) * perPage;
    let end = page * perPage;
    let numberPage = Math.ceil(transaction.length / perPage);
    let books = await Book.find();
    res.render("transactions/menu", {
        transaction: transaction,
        books: books,
        numberPage: numberPage,
        titleLink: "transaction/menu",
        page: page,
    });
};
