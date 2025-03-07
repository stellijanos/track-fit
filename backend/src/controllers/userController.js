const catchAsync = require('../utils/functions/catchAsync');
const userService = require('../services/userService');
const SuccessResponse = require('../utils/classes/SuccessResponse');

const getMe = catchAsync((req, res) => {
    const user = userService.getMe(req.user);
    return res
        .status(200)
        .json(new SuccessResponse('User successfully received', { user }));
});

module.exports = {
    getMe,
};
