const PasswordReset = require('../models/PasswordReset');

const create = async (data) => await PasswordReset.create(data);

module.exports = {
    create,
};
