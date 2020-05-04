const User = require("../../models/user.model");
const Shop = require("../models/shop.model");
const TransactionShop = require("../models/transactionShop.model");

module.exports.index = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let perPage = 5;
    let start = (page - 1) * perPage;
    let end = page * perPage;
    let transactions = await TransactionShop.find();
    let numberPage = Math.ceil(transactions.length) / perPage;
    let users = await User.find();
    let books = await Book.find();
    res.render("shop/transactions/index", {
        transactions: transactions.slice(start, end),
        users: users,
        numberPage: numberPage,
        titleLink: "transactions",
        books: books,
        page: page,
    });
};

module.exports.complete = async (req, res) => {
    let id = req.params.id;
    if (!(await TransactionShop.findById(id))) {
        res.redirect("/shop/transactions");
        return;
    }
    await TransactionShop.findByIdAndUpdate(id, {
        isComplete: true,
    });
    res.redirect("/shop/transactions");
};
