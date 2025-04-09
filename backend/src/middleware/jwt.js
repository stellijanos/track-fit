const jwtUtil = require('../utils/auth/jwt');
const catchAsync = require('../utils/functions/catchAsync');
const userService = require('../services/user');
const jwtTypes = require('../enums/jwtTypes');
const NotFoundError = require('../errors/NotFound');
const UnauthorizedError = require('../errors/Unauthorized');

const jwtMiddleware = catchAsync(async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedError('Invalid token provided.');
    }

    const token = authHeader.split(' ')[1];
    const payload = jwtUtil.verify(token, jwtTypes.ACCESS);

    const user = await userService.getById(payload.sub);
    if (!user) {
        throw new NotFoundError('User');
    }

    req.user = user;
    req.userId = user._id.toString();
    next();
});

module.exports = jwtMiddleware;
