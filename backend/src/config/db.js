const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const appLogger = require('../utils/loggers/appLogger');

async function connectToDatabase() {
    let uri;

    if (process.env.NODE_ENV === 'test') {
        const mongoServer = await MongoMemoryServer.create();
        uri = mongoServer.getUri();
        global.mongoServer = mongoServer;
        appLogger.info('Using in-memory MongoDB for testing');
    } else {
        const { DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;
        uri = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@127.0.0.1:27017/${DB_NAME}?authSource=admin`;
        appLogger.info('Connecting to production/development MongoDB');
    }

    try {
        await mongoose.connect(uri);
        appLogger.info('Connection to MongoDB successful.');
    } catch (err) {
        appLogger.error('Connection to MongoDB failed:' + err);
        process.exit(1);
    }
}

async function disconnectFromDatabase() {
    await mongoose.connection.close();

    if (process.env.NODE_ENV === 'test' && global.mongoServer) {
        await global.mongoServer.stop();
    }
}


module.exports = {
    connectToDatabase,
    disconnectFromDatabase
};
