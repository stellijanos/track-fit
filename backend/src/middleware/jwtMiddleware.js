const jwtUtil = require('../utils/auth/jwt');
const catchAsync = require('../utils/functions/catchAsync');
const ErrorResponse = require('../utils/classes/ErrorResponse');
const userService = require('../services/userService');
const jwtTypes = require('../enums/jwtTypes');

const jwtMiddleware = catchAsync(async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ErrorResponse(401, 'Invalid token provided.');
    }

    const token = authHeader.split(' ')[1];
    const payload = jwtUtil.verify(token, jwtTypes.ACCESS);

    const user = await userService.getById(payload._id);
    if (!user) {
        throw new ErrorResponse(401, 'User not found.');
    }

    req.user = user;
    next();
});

module.exports = jwtMiddleware;
