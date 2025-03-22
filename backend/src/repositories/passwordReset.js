const PasswordReset = require('../models/PasswordReset');

const create = async (data) => await PasswordReset.create(data);

const findByCode = async (code) => await PasswordReset.findOne({ code });

const update = async (id, data) => await PasswordReset.findByIdAndUpdate(id, data);

module.exports = {
    create,
    findByCode,
    update,
};
