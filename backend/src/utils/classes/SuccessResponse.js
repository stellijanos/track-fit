class SuccessResponse {
    constructor(statusCode, message = undefined, data = undefined, cookies = {}) {
        this.name = 'SuccessResponse';
        this.statusCode = statusCode;
        this.body = {
            message: message,
            data: data,
        };
        this.cookies = cookies;
    }
}

module.exports = SuccessResponse;
