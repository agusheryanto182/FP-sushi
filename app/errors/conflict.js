// import http-status-codes
const { StatusCodes } = require('http-status-codes');
// import custom-api
const CustomAPIError = require('./custom-api-error');

class ConflictError extends CustomAPIError {
    constructor(message) {
        super(message);
        // memberikan statusCode bad request
        this.statusCode = StatusCodes.CONFLICT;
    }
}
module.exports = ConflictError;