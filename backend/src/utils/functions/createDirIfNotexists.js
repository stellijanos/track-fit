const fs = require('fs');

module.exports = (dirname) => {
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
};
