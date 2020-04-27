const express = require('express')
const multer  = require('multer')
const controller = require('../controllers/book.controller')

const router = express.Router()

const upload = multer({ dest: './public/uploads/bookCovers/' })

router.get('/', controller.index);

router.get('/add', controller.add);

router.post("/add", controller.postAdd);

router.get("/:id/delete", controller.delete);

router.get("/:id/update", controller.update);

router.post("/update", upload.single('coverUrl'), controller.postUpdate); 

module.exports = router;