const AbstractRepository = require("./AbstractRepository");

module.exports = class ProducersRepository extends AbstractRepository {
    constructor({ connectionDb }) {
        super();
        this._connection = connectionDb;
    }

    async create(producer) {
        const t = await this._db.sequelize.transaction();
        try {
            const [modelResponse, created] = await this._db.findOrCreate({
                where: { name: producer.name },
                defaults: { name: producer.name },
                transaction: t
            });
            await t.commit();
            return modelResponse;
        } catch (error) {
            await t.rollback();
            console.log(error);
            throw error;
        }
    }
}