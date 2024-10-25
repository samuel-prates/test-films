const Exception = require('./Exception');
const { StatusCodes } = require('http-status-codes');

module.exports = class OperationException extends Exception {
  constructor(error, appCode, ...params) {
    super(error, StatusCodes.INTERNAL_SERVER_ERROR, appCode, ...params);
    this.error_type = 'operation';
  }
};
