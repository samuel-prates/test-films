const formatError = (error) => (typeof error === 'string' ? { message: error } : error);

const formatErrorMessage = (err, params) => (typeof err.message === 'function' ? err.message(...params) : err.message);

const formatAppCode = (appCode) => (appCode ? `${appCode}-` : '');

const formatErrorCode = (formattedAppCode, errorCode, defaultErrorCode) => {
    // errorCode already has a formatted error
    if (errorCode && /-/.test(errorCode)) return errorCode;

    return `${formattedAppCode}${errorCode || defaultErrorCode}`;
};

module.exports = { formatError, formatErrorMessage, formatAppCode, formatErrorCode };
