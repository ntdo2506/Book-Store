const Book = require("../../models/book.model");

module.exports.index = async (req, res) => {
    res.json(await Book.find());
};

module.exports.postCreate = async (req, res) => {
    let newBook = await Book.create(req.body);
    res.json(newBook);
};

module.exports.delete = async (req, res) => {
    let id = req.params.id;
    let book = await Book.findOneAndDelete(id);
    res.json(book);
};

module.exports.update = async (req, res) => {
    let id = req.params.id;
    let updateBook = await Book.findOneAndUpdate(id, req.body);
    res.json(updateBook);
};
