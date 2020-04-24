const express = require('express')
const controller = require('../controllers/book.controller')

const router = express.Router()

router.get('/', controller.index);

router.get('/add', controller.add);

router.post("/add", controller.postAdd);

router.get("/:id/delete", controller.delete);

router.get("/:id/update", controller.update);

router.post("/update", controller.postUpdate); 

module.exports = router;