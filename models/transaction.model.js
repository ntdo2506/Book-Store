var mongoose = require("mongoose");

var transactionSchema = new mongoose.Schema({
    userId: String,
    isComplete: Boolean,
    bookId: String,
});

var Transaction = mongoose.model(
    "Transaction",
    transactionSchema,
    "transactions"
);

module.exports = Transaction;
