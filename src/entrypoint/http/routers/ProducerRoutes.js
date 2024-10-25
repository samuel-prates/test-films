/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/entrypoint/http/controllers/ProducerController')} ctx.producerController
 * @param {import('http-status-codes/build/cjs/status-codes')} ctx.statusCode
 * @param {import('src/entrypoint/http/schemas/MovieSchema')} ctx.movieSchema
 */
module.exports = ({ producerController, statusCode, movieSchema }) => [
    {
        method: 'get',
        path: '/producers',
        handler: producerController.getList,
        validation: {},
        middlewares: [],
        responses: {
            [statusCode.OK]: {
                description: 'Successful operation'
            },
            [statusCode.BAD_REQUEST]: {
                description: 'Failed validation',
                schema: movieSchema.responses[400]
            }
        },
        description: 'Return producers',
        summary: '',
        tags: ['Producers']
    },
    {
        method: 'get',
        path: '/producers/winners',
        handler: producerController.getWinners,
        validation: {},
        middlewares: [],
        responses: {
            [statusCode.OK]: {
                description: 'Successful operation'
            },
            [statusCode.BAD_REQUEST]: {
                description: 'Failed validation',
                schema: movieSchema.responses[400]
            }
        },
        description: 'Return producers winners',
        summary: '',
        tags: ['Producers']
    }
];
