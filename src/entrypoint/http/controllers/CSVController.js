/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('http-status-codes').StatusCodes} ctx.statusCode
 * @param {import('src/interfaces/http/middlewares/AsyncMiddleware')} ctx.asyncMiddleware
 * @param {import('src/app/operations/claims/CreateClaimOperation')} ctx.createClaimOperation
 */
module.exports = ({ statusCode, asyncMiddleware }) => ({
  batch: asyncMiddleware(async ({ container, res, file }) => {
    const moviesCreated = await container.cradle.createMoviesService.execute(file);
    return res.status(statusCode.CREATED).json(moviesCreated);
  })
});
