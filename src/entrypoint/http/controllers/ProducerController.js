/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('http-status-codes').StatusCodes} ctx.statusCode
 * @param {import('src/entrypoint/http/middlewares/AsyncMiddleware')} ctx.asyncMiddleware
 * @param {import('src/application/services/producers/GetProducersService')} ctx.getProducersService
 */
module.exports = ({ statusCode, asyncMiddleware }) => ({
    getList: asyncMiddleware(async ({ query, container, res }) => {
        const producers = await container.cradle.getProducersService.list(query);
        return res.status(statusCode.OK).json(producers);
    }),
    getWinners: asyncMiddleware(async ({ query, container, res }) => {
        const producers = await container.cradle.getProducersService.winners(query);
        return res.status(statusCode.OK).json(producers);
    })
});
