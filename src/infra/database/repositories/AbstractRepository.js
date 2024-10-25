module.exports = class AbstractRepository {
    /**
     * @type {import('sequelize/types').Model}
     */
    _db = null;
    /**
     * @param {import('sequelize/types').Model} dbConnection 
     */
    init(dbConnection) {
        this._db = dbConnection;
    }
}