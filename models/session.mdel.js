var mongoose = require("mongoose");

var sessionSchema = new mongoose.Schema({
    sessionId: {
        type: String,
    },
    cart: [
        {
            bookId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: Number,
        },
    ],
});

var Session = mongoose.model("Session", sessionSchema, "sessions");

module.exports = Session;
