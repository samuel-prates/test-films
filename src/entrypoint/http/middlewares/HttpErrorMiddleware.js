/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/domain/enums/global/ExceptionEnum')} ctx.exceptionEnum
 * @param {import('src/config/config')} ctx.config
 */
module.exports = ({ exceptionEnum, config }) => {
    // eslint-disable-next-line no-unused-vars
    return (err, _req, res, _next) => {
        if (err.isJoi) {
            const { status_code, message, details, stack_trace } = err;
            const joiError = { status_code, message, details, stack_trace };
            joiError.stack_trace = config.stackErrorisVisible === true ? joiError.stack_trace : undefined;
            return res.status(status_code).json(joiError);
        }

        const { status_code, message, details, stack: stack_trace } = err;
        const error = { status_code, message, details, stack_trace };
        error.stack_trace = config.stackErrorisVisible === true ? error.stack_trace : undefined;
        return res.status(status_code).json(error);
    };
};
