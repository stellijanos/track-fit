class SuccessResponse {
    constructor(statusCode, message = undefined, data = undefined) {
        this.name = 'SuccessResponse';
        this.statusCode = statusCode;
        this.body = {
            message: message,
            data: data,
        };
    }
}

module.exports = SuccessResponse;
