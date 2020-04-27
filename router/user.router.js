const express = require('express')
const controller = require("../controllers/user.controller")
const validate = require('../validate/user.validate')
const multer  = require('multer')

const router = express.Router()
const upload = multer({ dest: './public/uploads/avatar/' })

router.get("/", controller.index);

router.get("/add", controller.add);

router.post("/add", validate.postAdd, controller.postAdd);

router.get("/:id/delete", controller.delete);

router.get("/:id/profile", controller.update);

router.post("/profile", controller.postUpdate);

router.get("/:id/profile/avatar", controller.updateAvatar);

router.post("/profile/avatar", upload.single('avatarUrl'), controller.postUpdateAvatar);

module.exports = router;