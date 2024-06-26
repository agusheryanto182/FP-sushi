// import http-status-codes
const { StatusCodes } = require('http-status-codes');
// import custom-api
const CustomAPIError = require('./custom-api-error');

class InternalServerError extends CustomAPIError {
    constructor(message) {
        super(message);
        // memberikan statusCode bad request
        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }
}
module.exports = InternalServerError;