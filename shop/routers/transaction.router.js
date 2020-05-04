const express = require("express");
const controller = require("../controllers/transaction.controller");

const router = express.Router();

router.get("/transactions/", controller.index);

router.get("/transactions/:id/complete", controller.complete);

module.exports = router;
