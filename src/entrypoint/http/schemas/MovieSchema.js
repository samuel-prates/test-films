const joi = require('joi');

/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/entrypoint/http/schemas/global/ErrorSchema')} ctx.errorSchema
 */
module.exports = ({ errorSchema }) => ({
    file: joi
        .object({
            originalname: joi.string().required(),
            size: joi.number().required(),
            mimetype: joi.string().required(),
            buffer: joi.any().required()
        })
        .required(),
    responses: {
        400: errorSchema
    }
});
