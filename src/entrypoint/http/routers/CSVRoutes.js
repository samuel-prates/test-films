/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/entrypoint/http/controllers/CSVController')} ctx.csvController
 * @param {import('http-status-codes/build/cjs/status-codes')} ctx.statusCode
 * @param {import('src/entrypoint/http/schemas/CSVSchema')} ctx.cSVSchema
 * @param {import('src/entrypoint/http/middlewares/FileMiddleware')} ctx.fileMiddleware
 */
module.exports = ({ csvController, statusCode, csvSchema, fileMiddleware }) => [
  {
    method: 'post',
    path: '/movies',
    validation: {
      file: csvSchema.file
    },
    middlewares: [fileMiddleware],
    handler: csvController.batch,
    responses: {
      [statusCode.NO_CONTENT]: {
        description: 'Successful operation'
      },
      [statusCode.BAD_REQUEST]: {
        description: 'Failed validation',
        schema: csvSchema.responses[400]
      }
    },
    description: 'Create movies in a batch',
    summary: '',
    tags: ['Movies']
  }
];
