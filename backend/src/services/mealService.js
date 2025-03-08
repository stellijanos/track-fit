const mealRepository = require('../repositories/mealRepository');

const getAllByUserOrPublic = async (userId) =>
    await mealRepository.findAllByUserOrPublic(userId);

module.exports = {
    getAllByUserOrPublic,
};
