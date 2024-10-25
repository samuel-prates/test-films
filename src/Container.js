const { createContainer, asClass, asValue, InjectionMode, Lifetime } = require('awilix');
const Server = require('src/entrypoint/Server');
const config = require('./config/config');
const { StatusCodes } = require('http-status-codes');
const Sequelize = require('sequelize');
const ConnectionDB = require('./infra/database/ConnectionDB');

/**
 * @returns require('awilix').AwilixContainer
 */
const getContainer = () => {
    const container = createContainer({
        injectionMode: InjectionMode.PROXY,
        strict: true,
    });

    container
        .register({
            server: asClass(Server).singleton(),
            container: asValue(container),
            config: asValue(config),
            sequelize: asValue(Sequelize),
            connectionDb: asClass(ConnectionDB).singleton(),
            statusCode: asValue(StatusCodes)
        })
        .loadModules([
            'src/application/services/**/*.js',
            'src/domain/**/*.js',
            'src/entrypoint/**/*.js',
            'src/infra/**/*.js',
            ['src/infra/database/**/*.js',
                {
                    lifetime: Lifetime.SINGLETON
                }]
        ],
            {
                formatName: 'camelCase',
                resolverOptions: {
                    injectionMode: InjectionMode.PROXY
                }
            })


    return container;
}

module.exports = getContainer();
