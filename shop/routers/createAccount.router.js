const express = require("express");
const controller = require("../controllers/createAccount.controller");

const router = express.Router();

router.get("/createAccount", controller.create);

router.post("/createAccount", controller.postCreate);

module.exports = router;
