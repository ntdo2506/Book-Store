const express = require("express");
const controller = require("../controllers/logic.controller");

const router = express.Router();

router.get("/login", controller.auth);

router.post("/login", controller.postAuth);

module.exports = router;
