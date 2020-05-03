const User = require("../../models/user.model");

module.exports.index = async (req, res) => {
    res.json(await User.find());
};

module.exports.postCreate = async (req, res) => {
    let newUser = await User.create(req.body);
    res.json(newUser);
};

module.exports.delete = async (req, res) => {
    let id = req.params.id;
    let user = await User.findOneAndDelete(id);
    res.json(user);
};

module.exports.update = async (req, res) => {
    let id = req.params.id;
    let updateUser = await User.findOneAndUpdate(id, req.body);
    res.json(updateUser);
};
