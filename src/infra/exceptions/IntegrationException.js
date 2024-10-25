const Exception = require('./Exception');
const { StatusCodes } = require('http-status-codes');

module.exports = class IntegrationException extends Exception {
  constructor(error, appCode, ...params) {
    super(error, StatusCodes.SERVICE_UNAVAILABLE, appCode, ...params);
    this.error_type = 'integration';
  }
};
