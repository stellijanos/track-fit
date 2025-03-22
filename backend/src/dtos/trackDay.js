const caloricTargetDto = require('./caloricTarget');

module.exports = (data) => ({
    id: data._id,
    date: data.date,
    waterIntake: data.waterIntake,
    waterTarget: data.waterTarget,
    caloricTarget: caloricTargetDto.response(data.caloricTarget),
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
});
