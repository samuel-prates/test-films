const enumFactory = require('src/domain/factories/global/EnumFactory');

module.exports = () =>
  enumFactory({
    INTERNAL_ERROR: 'internalError',
    INTEGRATION: 'integration',
    OPERATION: 'operation',
    NOT_FOUND: 'notFound',
    BUSINESS: 'business',
    CONTRACT: 'contract'
  });
