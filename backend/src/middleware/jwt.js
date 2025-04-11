const jwtUtil = require('../utils/auth/jwt');
const catchAsync = require('../utils/functions/catchAsync');
const userService = require('../services/user');
const jwtTypes = require('../enums/jwtTypes');
const NotFoundError = require('../errors/NotFound');
const UnauthorizedError = require('../errors/Unauthorized');

/**
 * Middleware function to check JWT sent in Authorization header
 *
 * @async
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function (to proceed to next middleware)
 */
module.exports = catchAsync(async (req, res, next) => {
    // 1. Retrieve Authorization header
    const authHeader = req.header('Authorization');

    // 2. Throw error if there is not auth header or is not of type bearer
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedError('Invalid token provided.');
    }

    // 3. Retrieve token from auth header
    const token = authHeader.split(' ')[1];

    // 4. Retrieve payload by checking if it's access token
    const payload = jwtUtil.verify(token, jwtTypes.ACCESS);

    // 5. Retrieve user based on id (sub key value)
    const user = await userService.getById(payload.sub);

    // 6. Put user object and its id on request object
    req.user = user;
    req.userId = user._id.toString();

    // 7. continue with next middleware
    next();
});
