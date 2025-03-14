class UnprocessableEntityError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnprocessableEntityError';
        this.message = message;
        this.statusCode = 422;
    }
}

module.exports = UnprocessableEntityError;
