const express = require("express");
const multer = require("multer");
const controller = require("../controllers/book.controller");

const router = express.Router();

const upload = multer({ dest: "./public/uploads/bookCovers/" });

router.get("/books", controller.index);

router.get("/books/create", controller.create);

router.post("/books/create", controller.postCreate);

router.get("/books/:id/delete", controller.delete);

router.get("/books/:id/update", controller.update);

router.post("/books/update", upload.single("coverUrl"), controller.postUpdate);

module.exports = router;
