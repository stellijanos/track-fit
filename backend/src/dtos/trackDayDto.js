const Joi = require('joi');
const caloricTargetDto = require('./caloricTargetDto');

const response = (data) => ({
    id: data._id,
    date: data.date,
    waterIntake: data.waterIntake,
    waterTarget: data.waterTarget,
    caloricTarget: caloricTargetDto.response(data.caloricTarget),
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
});

module.exports = {
    response,
};
