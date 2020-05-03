const express = require("express");
const controller = require("../controllers/book.controller");

const router = express.Router();

router.get("/books", controller.index);

router.post("/books", controller.postCreate);

router.delete("/books/:id/delete", controller.delete);

router.patch("/books/:id/update", controller.update);

module.exports = router;
