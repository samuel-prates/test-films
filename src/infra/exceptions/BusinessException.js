const Exception = require('./Exception');
const { StatusCodes } = require('http-status-codes');

module.exports = class BusinessException extends Exception {
  constructor(error, appCode, ...params) {
    super(error, StatusCodes.UNPROCESSABLE_ENTITY, appCode, ...params);
    this.error_type = 'business';
  }
};
