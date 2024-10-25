const express = require('express');
const helmet = require('helmet');
const noCache = require('nocache');
const { scopePerRequest } = require('awilix-express');
const https = require('https');
const options = require('src/config/key')

module.exports = class Server {
    constructor({ container }) {
        this._container = container;
        this._router = this._container.cradle.router;
        this._config = this._container.cradle.config;
    }

    async init() {
        const app = express();// This line is from the Node.js HTTPS documentation.

        app.use(helmet());
        app.use(noCache());
        app.use(scopePerRequest(this._container));
        app.use(this._router);

        const server = https.createServer(options, app);

        server.listen(this._config.port, () => {
            console.log(process.pid, this._config.port);
        });

        return server;
    }
}
