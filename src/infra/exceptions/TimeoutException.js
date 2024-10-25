const Exception = require('./Exception');
const { StatusCodes } = require('http-status-codes');

module.exports = class TimeoutException extends Exception {
  constructor(error, appCode, ...params) {
    super(error, StatusCodes.GATEWAY_TIMEOUT, appCode, ...params);
    this.error_type = 'timeout';
  }
};
