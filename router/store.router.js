const express = require('express')
const controller = require('../controllers/store.controller')

const router = express.Router()

router.get('/', controller.index);

module.exports = router;