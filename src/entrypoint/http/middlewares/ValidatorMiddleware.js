const ContractException = require('src/infra/exceptions/ContractException');

module.exports = ({ config }) => ({
  validate: (schemas) => (req, _res, next) => {
    try {
      const options = { abortEarly: false, convert: true, allowUnknown: true, stripUnknown: false };

      for (const key in schemas) {
        const { error, value } = schemas[key].validate(req[key], options);

        if (error) {
          const result = new Error('Bad Request');

          result.details = error.details;

          throw new ContractException(result, config.appCode);
        }

        req[key] = value;
      }

      next();
    } catch (error) {
      next(error);
    }
  }
});
