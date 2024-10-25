const NotFoundException = require('src/infra/exceptions/NotFoundException');

/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/config/config')} ctx.config
 */
module.exports = ({ config }) => {
    return (_req, _res, next) => {
        next(new NotFoundException("Not Found", config.appCode));
    };
};
