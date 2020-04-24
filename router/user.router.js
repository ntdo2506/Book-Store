const express = require('express')
const controller = require("../controllers/user.controller")
const validate = require('../validate/user.validate')

const router = express.Router()

router.get("/", controller.index);

router.get("/add", controller.add);

router.post("/add", validate.postAdd, controller.postAdd);

router.get("/:id/delete", controller.delete);

router.get("/:id/update", controller.update);

router.post("/update", controller.postUpdate);

module.exports = router;