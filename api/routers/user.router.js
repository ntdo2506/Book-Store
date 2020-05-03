const express = require("express");
const controller = require("../controllers/user.controller");

const router = express.Router();

router.get("/users", controller.index);

router.post("/users", controller.postCreate);

router.delete("/users/:id/delete", controller.delete);

router.patch("/users/:id/update", controller.update);

module.exports = router;
