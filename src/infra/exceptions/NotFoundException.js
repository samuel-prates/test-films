const Exception = require('./Exception');
const { StatusCodes } = require('http-status-codes');

module.exports = class NotFoundException extends Exception {
  constructor(error, appCode, ...params) {
    super(error, StatusCodes.NOT_FOUND, appCode, ...params);
    this.error_type = 'notFound';
  }
};
