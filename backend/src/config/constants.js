const path = require('path');

const constants = Object.freeze({
    LOGS_BASE_DIR: path.join(__dirname, '../../logs'),
    TEMP_UPLOAD_DIR: path.join(__dirname, '../../files/uploads'),
    PROFILE_PICTURE_DIR: path.join(
        __dirname,
        '../../files/uploads/images/users'
    ),
});

module.exports = constants;
