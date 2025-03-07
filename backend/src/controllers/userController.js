const catchAsync = require('../utils/functions/catchAsync');
const userService = require('../services/userService');
const SuccessResponse = require('../utils/classes/SuccessResponse');

const getMe = (req, res) => {
    const user = userService.getMe(req.user);
    return res
        .status(200)
        .json(new SuccessResponse('User successfully received.', { user }));
};

const updateMe = catchAsync(async (req, res) => {
    const user = await userService.updateMe(req.user._id, req.body);
    return res
        .status(200)
        .json(new SuccessResponse('User successfully updated.', { user }));
});

const deleteMe = catchAsync(async (req, res) => {
    await userService.deleteMe(req.user._id);
    res.status(204).send();
});

module.exports = {
    getMe,
    updateMe,
    deleteMe,
};
