const measurementRepository = require('../repositories/measurement');
const NotFoundError = require('../errors/NotFound');
const jsonToCsv = require('../utils/functions/jsonToCsv');

const measurements = async (userId, from, until) => {
    let data;
    if (!from || !until) {
        data = await measurementRepository.findAllByUserId(userId);
    } else {
        data = await measurementRepository.findAllByUserIdBetweenDates(userId, from, until);
    }
    if (!data.length) throw new NotFoundError('Measurements');

    return jsonToCsv.measurements(data);
};

module.exports = { measurements };
