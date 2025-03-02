class SuccessResponse {

    constructor(message = '', data = undefined) {
        this.message = message;
        this.data = data;
        this.success = true;
    }
}

module.exports = SuccessResponse;