const bcrypt = require("bcrypt");
const User = require("../../models/user.model");

module.exports.login = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let user = User.findOne({ email });
    if (!user) {
        res.json(["Dont have user"]);
        return;
    }
    if (!user.wrongLoginCount) {
        await User.findByIdAndUpdate(user.id, {
            wrongLoginCount: 0,
        });
    }

    if (user.wrongLoginCount >= 4) {
        res.json({
            errors: ["Your account has been locked."],
            values: req.body,
        });
        return;
    }
    if (!(await bcrypt.compare(password, user.password))) {
        await User.findByIdAndUpdate(user.id, {
            wrongLoginCount: (user.wrongLoginCount += 1),
        });

        res.json({
            errors: ["Wrong password."],
            values: req.body,
        });

        return;
    }

    res.json({ login: true });
};
