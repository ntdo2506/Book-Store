var mongoose = require("mongoose");

var shopSchema = new mongoose.Schema({
    nameShop: String,
    email: String,
    password: String,
    phone: String,
    shop: [
        {
            title: String,
            description: String,
            coverUrl: String,
            quantity: Number,
        },
    ],
});

var Shop = mongoose.model("Shop", shopSchema, "shops");

module.exports = Shop;
