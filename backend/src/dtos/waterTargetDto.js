const Joi = require('joi');

const create = Joi.object({
    quantity: Joi.number().min(1).required(),
});

const update = Joi.object({
    quantity: Joi.number().min(1).required(),
}).min(1);

const response = (data) => {
    return {
        id: data._id,
        quantity: data.quantity,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
    };
};

module.exports = {
    create,
    update,
    response,
};
