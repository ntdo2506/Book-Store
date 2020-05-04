const mongoose = require("mongoose");

const transactionShopSchema = new mongoose.Schema({
    shopId: {
        type: String,
        ref: "Shop",
    },
    transactions: [
        {
            userId: {
                type: String,
                ref: "User",
            },
            bookId: {
                type: String,
                ref: "Shop",
            },
            quantity: Number,
            isComplete: Boolean,
        },
    ],
});

var TransactionShop = mongoose.model(
    "TransactionShop",
    transactionShopSchema,
    "transactionshops"
);

module.exports = TransactionShop;
