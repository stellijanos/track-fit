class NotFoundError extends Error {
    constructor(entity) {
        super(`${entity} not found.`);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}

module.exports = NotFoundError;
