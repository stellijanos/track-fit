class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnAuthorizedError';
        this.message = message;
        this.statusCode = 401;
    }
}

module.exports = UnauthorizedError;
