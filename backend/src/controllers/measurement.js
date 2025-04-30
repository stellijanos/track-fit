const catchAsync = require('../utils/functions/catchAsync');

const measurementDto = require('../dtos/measurement');
const measurementValidator = require('../validators/measurement');
const measurementService = require('../services/measurement');

const SuccessResponse = require('../utils/classes/SuccessResponse');
const UnprocessableEntityError = require('../errors/UnprocessableEntity');

/**
 * Create a new measurement for the current authenticated user
 *
 * @route POST /users/me/measurements
 * @access Private
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {void} - Responds with success message and created measurement (201)
 * @throws {UnprocessableEntityError} - Request body validation failed (422)
 */
const create = catchAsync(async (req, res, next) => {
    const { error, value } = measurementValidator.create.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    const measurement = await measurementService.create(req.userId, value);
    next(
        new SuccessResponse(201, 'Measurement successfully created', {
            measurement: measurementDto(measurement),
        })
    );
});

/**
 * Retrieve all measurements for the current authenticated user
 *
 * @route GET /users/me/measurements
 * @access Private
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {void} - Responds with success message and the found measurements (200)
 */
const getAllByUserId = catchAsync(async (req, res, next) => {
    const measurements = await measurementService.getAllByUserInRange(req.userId);
    next(
        new SuccessResponse(200, 'Measurements successfully retrieved.', {
            total: measurements.length,
            measurements: measurements.map(measurementDto),
        })
    );
});

/**
 * Update a measurement for the current authenticated user
 *
 * @route PATCH /users/me/measurements/:measurementId
 * @access Private
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {void} - Responds with success message and the updated measurement (200)
 * @throws {NotFoundError} - Measurement not found (404)
 * @throws {UnprocessableEntityError} - Request body validation failed (422)
 */
const updateByIdAndUserId = catchAsync(async (req, res, next) => {
    const { error } = measurementValidator.update.validate({ ...req.params, ...req.body });
    if (error) throw new UnprocessableEntityError(error.message);

    const updated = await measurementService.updateByIdAndUserId(
        req.params.measurementId,
        req.userId,
        req.body
    );
    next(
        new SuccessResponse(200, 'Measurement successfully updated.', {
            measurement: measurementDto(updated),
        })
    );
});

/**
 * Delete a measurement for the current authenticated user
 *
 * @route DELETE /users/me/measurements/:measurementId
 * @access Private
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {void} - Responds with no content (204)
 * @throws {NotFoundError} - Measurement not found (404)
 */
const deleteByIdAndUserId = catchAsync(async (req, res, next) => {
    const { error } = measurementValidator.remove.validate(req.params);
    if (error) throw new UnprocessableEntityError(error.message);

    await measurementService.deleteByIdAndUserId(req.params.measurementId, req.userId);
    next(new SuccessResponse(204));
});

module.exports = {
    create,
    getAllByUserId,
    updateByIdAndUserId,
    deleteByIdAndUserId,
};
