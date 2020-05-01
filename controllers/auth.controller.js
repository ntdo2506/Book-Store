const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
const User = require("../models/user.model");
const Session = require("../models/session.mdel");
const Transaction = require("../models/transaction.model");

module.exports.auth = (req, res) => {
    res.render("auth/login");
};

module.exports.postAuth = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.findOne({ email: email });
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: "ntdo.13cdt1@gmail.com",
        from: "do.nguyen.tt.1995@gmail.com",
        subject: "Login book store",
        text: "Mat khau sai qua 4 lan",
        html: "<strong>Mat khau sai qua 4 lan</strong>",
    };
    if (!user) {
        res.redirect("/auth/login");
        return;
    }
    let count = user.wrongLoginCount;
    if (count >= 2) {
        sgMail.send(msg).then(
            () => {},
            (error) => {
                console.error(error);
                if (error.response) {
                    console.error(error.response.body);
                }
            }
        );
        res.send("Wrong password more 3! Reset database");
        return;
    }
    bcrypt.compare(password, user.password, async function (err, result) {
        if (!result) {
            count = count + 1;
            await User.findOneAndUpdate(
                { email: email },
                { wrongLoginCount: count }
            );
            res.redirect("/auth/login");
            return;
        } else {
            res.cookie("userId1", user.id, {
                signed: true,
            });
            const sessionId = req.signedCookies.sessionId;
            const session = await Session.findOne({ sessionId });
            let data = {
                userId: user.id,
                bookId: session.cart,
                isComplete: false,
            };
            if (user.isAdmin === false) {
                await Transaction.create(data);
                res.redirect("/transaction/menu");
            } else res.redirect("/users");
        }
    });
};
