const User = require("../models/user.model");
const Book = require("../models/book.model");
const Transaction = require("../models/transaction.model");

module.exports.index = async (req, res) => {
    // let page = parseInt(req.query.page) || 1;
    // let perPage = 5;
    // let start = (page - 1) * perPage;
    // let end = page * perPage;
    let transactions = await Transaction.find();
    let users = await User.find();
    let books = await Book.find();
    res.render("transactions/index", {
        transactions: transactions,
        users: users,
        books: books,
    });
};

module.exports.create = async (req, res) => {
    let users = await User.find();
    let books = await Book.find();
    res.render("transactions/create", {
        users: users,
        books: books,
    });
};

module.exports.postCreate = async (req, res) => {
    await Transaction.create({
        isComplete: false,
        userId: req.body.userId,
        bookId: req.body.bookId,
    });
    res.redirect("/transactions");
};

module.exports.complete = async (req, res) => {
    let id = req.params.id;
    if (!(await Transaction.findById(id))) {
        res.redirect("/transactions");
        return;
    }
    await Transaction.findByIdAndUpdate(id, {
        isComplete: true,
    });
    res.redirect("/transactions");
};
