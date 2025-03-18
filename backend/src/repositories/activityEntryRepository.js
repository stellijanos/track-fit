const ActivityEntry = require('../models/ActivityEntry');

const create = async (data) => await ActivityEntry.create(data);

module.exports = {
    create,
};
