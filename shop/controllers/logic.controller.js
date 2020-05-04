const bcrypt = require("bcrypt");
const Shop = require("../models/shop.model");

module.exports.auth = (req, res) => {
    res.render("shop/auth/login");
};

module.exports.postAuth = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let shop = await Shop.findOne({ email: email });
    if (!shop) {
        res.redirect("/shop/login");
        return;
    }
    bcrypt.compare(password, shop.password, async function (err, result) {
        if (result) {
            res.cookie("shopId", shop.id, {
                signed: true,
            });
            res.redirect("/shop/books");
        } else {
            res.redirect("/shop/login");
        }
    });
};
