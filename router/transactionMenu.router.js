const express = require('express')
const controller = require('../controllers/transactionMenu.controller')

const router = express.Router()

router.get('/menu', controller.menu)

module.exports = router;