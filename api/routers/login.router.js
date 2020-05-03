const express = require("express");
const controller = require("../controllers/login.controller");

const router = express.Router();

router.get("/login", controller.login);

module.exports = router;
