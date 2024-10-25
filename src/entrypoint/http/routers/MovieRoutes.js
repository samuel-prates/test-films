/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/entrypoint/http/controllers/MovieController')} ctx.movieController
 * @param {import('http-status-codes/build/cjs/status-codes')} ctx.statusCode
 * @param {import('src/entrypoint/http/schemas/MovieSchema')} ctx.movieSchema
 * @param {import('src/entrypoint/http/middlewares/FileMiddleware')} ctx.fileMiddleware
 */
module.exports = ({ movieController, statusCode, movieSchema, fileMiddleware }) => [
    {
        method: 'post',
        path: '/movies',
        validation: {
            file: movieSchema.file
        },
        middlewares: [fileMiddleware],
        handler: movieController.batch,
        responses: {
            [statusCode.CREATED]: {
                description: 'Successful operation'
            },
            [statusCode.BAD_REQUEST]: {
                description: 'Failed validation',
                schema: movieSchema.responses[400]
            }
        },
        description: 'Create movies in a batch',
        summary: '',
        tags: ['Movies']
    }
];
