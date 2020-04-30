const cloudinary = require("cloudinary").v2;
const Book = require("../models/book.model");

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
    const book = await Book.find();
    let numberPage = Math.ceil(book.length / perPage);
    res.render("books/index", {
        bookList: book.slice(start, end),
        numberPage: numberPage,
        titleLink: "books",
        page: page,
    });
};

module.exports.add = (req, res) => {
    res.render("books/add");
};

module.exports.postAdd = async (req, res) => {
    await Book.create({
        title: req.body.title,
        description: req.body.description,
    });
    res.redirect("/books");
};

module.exports.delete = async (req, res) => {
    let id = req.params.id;
    await Book.findByIdAndDelete(id, {});
    res.redirect("/books");
};

module.exports.update = async (req, res) => {
    let id = req.params.id;
    const book = await Book.findById(id);
    res.render("books/update", {
        id: id,
        book: book,
    });
};

module.exports.postUpdate = (req, res) => {
    let id = req.body.id;
    cloudinary.uploader.upload(req.file.path, async function (error, result) {
        await Book.findByIdAndUpdate(id, {
            title: req.body.title,
            coverUrl: result.url,
        });
        res.redirect("/books");
    });
};
