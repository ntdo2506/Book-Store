const express = require('express')
const controller = require('../controllers/cart.controller')

const router = express.Router()

router.get('/', controller.index);

router.get('/add/:bookId', controller.addToCart);

module.exports = router;