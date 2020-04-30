const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const User = require("../models/user.model");

cloudinary.config({
    cloud_name: "echsd",
    api_key: "574173492831595",
    api_secret: "snv5aigseeto6DQYd_RL9z8jpLQ",
});

module.exports.index = async (req, res) => {
    // let page = parseInt(req.query.page) || 1;
    // let perPage = 10;
    // let start = (page - 1) * perPage;
    // let end = page * perPage;
    const user = await User.find();
    res.render("users/index", {
        users: user,
    });
};

module.exports.add = (req, res) => {
    res.render("users/add");
};

module.exports.postAdd = async (req, res) => {
    bcrypt.hash(req.body.password, 10, async function (err, hash) {
        await User.create({
            isAdmin: false,
            avatarUrl:
                "https://res.cloudinary.com/echsd/image/upload/v1587956694/avatar_pswii2.png",
            wrongLoginCount: 0,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: hash,
        });
    });
    res.redirect("/users");
};

module.exports.delete = async (req, res) => {
    let id = req.params.id;
    await User.findByIdAndDelete(id, {});
    res.redirect("/users");
};

module.exports.update = async (req, res) => {
    let id = req.params.id;
    let user = await User.findById(id);
    res.render("users/profile", {
        id: id,
        user: user,
    });
};

module.exports.postUpdate = async (req, res) => {
    let id = req.body.id;
    bcrypt.hash(req.body.password, 10, async function (err, hash) {
        await User.findByIdAndUpdate(id, {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: hash,
        });
        res.redirect("/users");
    });
};

module.exports.updateAvatar = async (req, res) => {
    let id = req.params.id;
    const user = await User.findById(id);
    res.render("users/updateAvatar", {
        id: id,
        user: user,
    });
};

module.exports.postUpdateAvatar = async (req, res) => {
    let id = req.body.id;
    cloudinary.uploader.upload(req.file.path, async function (error, result) {
        await User.findByIdAndUpdate(id, {
            avatarUrl: result.url,
        });
        res.redirect("/users");
    });
};
