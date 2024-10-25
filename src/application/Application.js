const container = require('src/Container')

module.exports = class Application {
    constructor() {
        this._container = container;
    }

    async start() {
        const { server, connectionDb } = this._container.cradle;

        await connectionDb.init();
        return await server.init();
    }
}
