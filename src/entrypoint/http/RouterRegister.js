const { Router } = require('express');

/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/entrypoint/http/middlewares/ValidatorMiddleware')} ctx.validatorMiddleware
 */
module.exports = ({ validatorMiddleware }) => ({
    register: (routes) => {
        const router = Router();

        for (const { method, path, middlewares = [], validation, handler } of routes) {
            const validator = validatorMiddleware.validate(validation);

            router[method](path, ...middlewares, validator, handler);
        }

        return router;
    }
});
