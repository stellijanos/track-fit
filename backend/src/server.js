const app = require('./app');
const env = require('./config/env');
const { connectToDatabase } = require('./config/db');
const appLogger = require('./utils/loggers/appLogger');

connectToDatabase().then(() => {
    const PORT = env.app.port;
    const HOST = env.app.host;
    const ENV = env.app.env;

    app.listen(PORT, HOST, () => {
        appLogger.info(
            `Server is running at http://${HOST}:${PORT} in ${ENV} environment on port ${PORT} ...`
        );
    });
});
