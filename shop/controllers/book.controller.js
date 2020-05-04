const cloudinary = require("cloudinary").v2;
const Shop = require("../models/shop.model");

cloudinary.config({
    cloud_name: "echsd",
    api_key: "574173492831595",
    api_secret: "snv5aigseeto6DQYd_RL9z8jpLQ",
});

module.exports.index = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let perPage = 10;
    let start = (page - 1) * perPage;
    let end = page * perPage;
    const shop = await Shop.findOne();
    let numberPage = Math.ceil(shop.shop.length / perPage);
    res.render("shop/books/index", {
        shopList: shop.shop.slice(start, end),
        numberPage: numberPage,
        titleLink: "shop/books",
        page: page,
        shopId: req.signedCookies.shopId,
    });
};

module.exports.create = (req, res) => {
    res.render("shop/books/create");
};

module.exports.postCreate = async (req, res) => {
    let shopId = req.signedCookies.shopId;
    let title = req.body.title;
    let description = req.body.description;
    let quantity = req.body.quantity;
    let coverUrl =
        "https://res.cloudinary.com/echsd/image/upload/v1587956694/avatar_pswii2.png";
    let shop = await Shop.findOneAndUpdate(shopId, {
        $push: { shop: { title, description, quantity, coverUrl } },
    });
    res.redirect("/shop/books");
};

module.exports.delete = async (req, res) => {
    let id = req.params.id;
    let shop = await Shop.find({});
    shop.forEach((item) => {
        let book = item.shop;
        let i = 0;
        book.find((y) => {
            if (y.id === id) {
                i = book.indexOf(y);
            }
        });
        console.log(book.slice(i, 1));
    });

    res.redirect("/shop/books");
};

module.exports.update = async (req, res) => {
    let id = req.params.id;
    const book = await Shop.findById(id);
    res.render("/shop/books/update", {
        id: id,
        book: book,
    });
};

module.exports.postUpdate = async (req, res) => {
    let id = req.body.id;
    cloudinary.uploader.upload(req.file.path, async function (error, result) {
        await Shop.findByIdAndUpdate(id, {
            title: req.body.title,
            coverUrl: result.url,
        });
        res.redirect("/shop/books");
    });
};

module.exports.store = async (req, res) => {
    let id = req.params.id;
    let shop = await Shop.findById(id);
    let page = parseInt(req.query.page) || 1;
    let perPage = 10;
    let start = (page - 1) * perPage;
    let end = page * perPage;
    let numberPage = Math.ceil(shop.shop.length / perPage);
    res.render("shop/books/store", {
        books: shop.shop.slice(start, end),
        numberPage: numberPage,
        titleLink: "shop/" + id + "/books",
        page: page,
    });
};
