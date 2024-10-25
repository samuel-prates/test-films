const Exception = require('./Exception');
const { StatusCodes } = require('http-status-codes');

module.exports = class ContractException extends Exception {
    constructor(error, appCode, ...params) {
        super(error, StatusCodes.BAD_REQUEST, appCode, ...params);

        this.error_type = 'contract';
        if (error.details) this.details = error.details;
    }
};
