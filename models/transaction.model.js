var mongoose = require("mongoose");

var transactionSchema = new mongoose.Schema({
    userId: String,
    isComplete: Boolean,
    bookId: [
        {
            _id: String,
            bookId: String,
            quantity: Number,
        },
    ],
});

var Transaction = mongoose.model(
    "Transaction",
    transactionSchema,
    "transactions"
);

module.exports = Transaction;
