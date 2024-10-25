
const { INTEGER, STRING } = require('sequelize');
const AbstractModel = require('src/infra/database/models/AbstractModel');

class ProducerModel extends AbstractModel {
    _dbName = 'producer';
    _properties = {
        id: {
            type: INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: STRING,
            allowNull: false,
            unique: true
        }
    }
    _repository = 'producersRepository'
    join = [{ type: "belongsToMany", table: 'movie', parameter: { through: 'ProducerMovies', as: 'movies' } }];
}

module.exports = ProducerModel;
