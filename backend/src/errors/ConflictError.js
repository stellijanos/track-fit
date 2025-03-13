class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConflictError';
        this.message = message;
        this.statusCode = 401;
    }
}

module.exports = ConflictError;
