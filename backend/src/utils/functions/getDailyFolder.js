const fs = require('fs');
const path = require('path');
const logsBaseDir = require('../../config/constants').logsBaseDir;

module.exports = () => {
    const today = new Date().toISOString().split('T')[0];
    const logDir = path.join(logsBaseDir, today);

    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
    return logDir;
};
