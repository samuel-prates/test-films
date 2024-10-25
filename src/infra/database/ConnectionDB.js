const IntegrationException = require("../exceptions/IntegrationException");

module.exports = class ConnectionDB {
    constructor(context) {
        const { config, sequelize } = context;
        const { appCode, database: { dialect, storage } } = config
        this._appCode = appCode;
        this._sequelize = new sequelize({
            dialect: dialect,
            storage: storage
        });
        this._models = []
        config.database.models.forEach(item => this._models.push(context[item]));
        this._context = context;
    }

    async init() {
        try {
            const buildModels = {}
            this._models.forEach(model => {
                const modelDb = this._sequelize.define(model.getName(), model.getProperties());
                this._context[model.getRepository()].init(modelDb)
                buildModels[model.getName()] = { modelDb, model };
            }
            );
            Object.keys(buildModels).forEach(key => {
                const { modelDb, model } = buildModels[key];
                if (model.join) {
                    model.join.map(item => {
                        modelDb[item.type](buildModels[item.table].modelDb, item.parameter);
                    })
                }
            })
            await this._sequelize.sync();
        } catch (error) {
            console.log(error);
            throw new IntegrationException(error, this._appCode);
        }
    }
};