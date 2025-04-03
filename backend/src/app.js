const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const notFoundMiddleware = require('./middleware/notFound');
const errorHandleMiddleware = require('./middleware/errorHandle');
const createDirIfNotExists = require('./utils/functions/createDirIfNotexists');
const constants = require('./config/constants');
const apiRoutes = require('./routes');
const requestLoggerMiddleware = require('./middleware/request');
const successHandleMiddleware = require('./middleware/successHandle');

createDirIfNotExists(constants.LOGS_BASE_DIR);

const app = express();

app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(cookieParser());
app.use(requestLoggerMiddleware);

app.use('/api', apiRoutes, successHandleMiddleware, errorHandleMiddleware, notFoundMiddleware);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/frontend', 'index.html'));
});

module.exports = app;
