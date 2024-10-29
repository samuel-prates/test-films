const Movie = require("src/domain/entities/Movie");
const AbstractRepository = require("./AbstractRepository");

module.exports = class MoviesRepository extends AbstractRepository {
    /**
     * MovieRepository
     * @param {Object} ctx  - Dependency Injection
     * @param {import('src/infra/database/ConnectionDB')} ctx.connectionDb
     * @param {import('src/infra/database/repositories/ProducersRepository')} ctx.producersRepository
     * @param {import('src/domain/factories/MovieFactory')} ctx.movieFactory
     */
    constructor({ connectionDb, producersRepository }) {
        super();
        this._connection = connectionDb;
        this._producersRepository = producersRepository;
    }

    async create(movie) {
        const tCreate = await this._db.sequelize.transaction();
        try {
            const created = await this._db.create(movie, { transaction: tCreate });
            await tCreate.commit();

            for (const producer of movie.producers) {
                try {
                    const producerCreated = await this._producersRepository.create(producer);
                    await created.addProducers(producerCreated);
                } catch (error) {
                    console.log(error); //warning
                }
            }

            const t = await this._db.sequelize.transaction();
            try {
                await created.save({ fields: ['producers'], transaction: t });
                await t.commit()
                return new Movie(created.title, created.studios, created.producers, created.year, created.is_winner);
            } catch (error) {
                await t.rollback();
                throw error;
            }
        } catch (error) {
            await tCreate.rollback();
            throw error;
        }
    }
}