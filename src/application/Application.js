const container = require('src/Container')

module.exports = class Application {
    constructor() {
        this._container = container;
    }

    async start({ initData = true }) {
        const { server, connectionDb } = this._container.cradle;

        await connectionDb.init(initData);
        return await server.init();
    }
}
