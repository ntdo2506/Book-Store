const Transaction = require("../../models/transaction.model");

module.exports.index = async (req, res) => {
    res.json(await Transaction.find());
};
