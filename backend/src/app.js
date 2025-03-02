const express = require('express');
const path = require('path');

const notFoundMiddleware = require('./middleware/notFoundMiddleware');
const errorHandleMiddleware = require('./middleware/errorHandleMiddleware');
const createDirIfNotExists = require('./utils/functions/createDirIfNotexists');
const constants = require('./config/constants');
const apiRoutes = require('./routes');
const requestLoggerMiddleware = require('./middleware/requestLoggerMiddleware');

createDirIfNotExists(constants.logsBaseDir);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(requestLoggerMiddleware);

app.use('/api', apiRoutes, errorHandleMiddleware, notFoundMiddleware);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/frontend', 'index.html'));
});

module.exports = app;
