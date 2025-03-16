const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');
const caloricTargetRepository = require('../repositories/caloricTargetRepository');
const userRepository = require('../repositories/userRepository');
const { default: mongoose } = require('mongoose');

const create = async (userId, data) => {
    const created = await caloricTargetRepository.create({
        user: userId,
        name: data.name,
        kcal: data.kcal,
        protein: data.protein,
        carb: data.carb,
        fat: data.fat,
        proteinPerKg: data.proteinPerKg,
        carbPerKg: data.carbPerKg,
        fatPerKg: data.fatPerKg,
    });

    if (!created) throw new BadRequestError('Failed to create caloric target');

    await userRepository.updateById(userId, { currentCaloricTarget: created._id });
    return created;
};

const getAllByUserId = async (userId) => await caloricTargetRepository.getAllByUserId(userId);

const renameByIdAndUserId = async (id, userId, name) => {
    const updated = await caloricTargetRepository.updateByIdAndUserId(id, userId, { name });
    if (!updated) throw new BadRequestError('Failed to rename caloric target: not found or missing permissions');
    return updated;
};

const deleteByIdAndUserId = async (id, userId, currentTargetId) => {
    if (currentTargetId.toString() === id) throw new ConflictError('Current caloric target cannot be deleted.');
    const deleted = await caloricTargetRepository.deleteByIdAndUserId(id, userId);
    if (!deleted) throw new BadRequestError('Failed to delete caloric target: not found or missing permissions');
};

module.exports = {
    create,
    getAllByUserId,
    renameByIdAndUserId,
    deleteByIdAndUserId,
};
