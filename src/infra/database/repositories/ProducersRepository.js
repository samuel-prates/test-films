const AbstractRepository = require("./AbstractRepository");
const { QueryTypes } = require('sequelize');

module.exports = class ProducersRepository extends AbstractRepository {
    constructor({ connectionDb }) {
        super();
        this._connection = connectionDb;
    }

    async create(producer) {
        const t = await this._db.sequelize.transaction();
        try {
            const [modelResponse, _created] = await this._db.findOrCreate({
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

    async getAll() {
        return this._db.findAll();
    }

    async getWinners() {
        return this._db.sequelize.query(`select followingWin - previousWin as interval, * from (
    select count(1) as wins, min(m.year) as previousWin, max(m.year) as followingWin, p.name from producers as p
        left join ProducerMovies as pm on p.id = pm.producerId
        left join movies as m on m.id = pm.movieId
        where m.is_winner is true
    group by p.name
    ) as winners WHERE wins > 1 AND interval > 0 order by interval, name `, { type: QueryTypes.SELECT });
    }
}