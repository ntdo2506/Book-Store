const Shop = require("../models/shop.model");
const bcrypt = require("bcrypt");

module.exports.create = (req, res) => {
    res.render("shop/auth/createAccount");
};

module.exports.postCreate = async (req, res) => {
    bcrypt.hash(req.body.password, 10, async function (err, hash) {
        await Shop.create({
            nameShop: req.body.nameShop,
            phone: req.body.phone,
            email: req.body.email,
            password: hash,
        });
    });
    res.redirect("/shop/login");
};
