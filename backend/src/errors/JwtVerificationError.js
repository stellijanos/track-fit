class JwtVerificationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'JwtVerificationError';
        this.message = message;
        this.statusCode = 401;
    }
}

module.exports = JwtVerificationError;
