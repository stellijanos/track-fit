const catchAsync = require('../utils/functions/catchAsync');
const userService = require('../services/userService');
const SuccessResponse = require('../utils/classes/SuccessResponse');
const ErrorResponse = require('../utils/classes/ErrorResponse');

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

const changeProfilePicture = catchAsync(async (req, res) => {
    if (!req.file) throw new ErrorResponse('No image file provided');
    console.log(req.file);
    const user = await userService.changeProfilePicture(
        req.user._id,
        req.user.profilePicture,
        req.file.filename
    );
    res.status(200).json(
        new SuccessResponse('Profile picture successfully changed.', { user })
    );
});

const deleteProfilePicture = catchAsync(async (req, res) => {
    const user = await userService.deleteProfilePicture(
        req.user._id,
        req.user.profilePicture
    );
    res.status(200).json(
        new SuccessResponse('Profil picture successfully removed.', { user })
    );
});

module.exports = {
    getMe,
    updateMe,
    deleteMe,
    changeProfilePicture,
    deleteProfilePicture
};
