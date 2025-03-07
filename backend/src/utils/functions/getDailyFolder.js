const fs = require('fs');
const path = require('path');
const LOGS_BASE_DIR = require('../../config/constants').LOGS_BASE_DIR;

module.exports = () => {
    const today = new Date().toISOString().split('T')[0];
    const logDir = path.join(LOGS_BASE_DIR, today);

    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
    return logDir;
};
