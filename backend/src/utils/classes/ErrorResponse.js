class ErrorResponse extends Error {

    constructor(statusCode, message = '', data = undefined) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
    }
}

module.exports = ErrorResponse;
