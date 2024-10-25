
const { INTEGER, STRING, BOOLEAN } = require('sequelize');
const AbstractModel = require('src/infra/database/models/AbstractModel');

class MovieModel extends AbstractModel {
    _dbName = 'movie';
    _properties = {
        id: {
            type: INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: STRING,
            allowNull: false
        },
        studios: {
            type: STRING,
            allowNull: false
        },
        year: {
            type: INTEGER,
            allowNull: false
        },
        is_winner: {
            type: BOOLEAN,
            allowNull: false
        }
    }
    _repository = 'moviesRepository';
    join = [{ type: "belongsToMany", table: 'producer', parameter: { through: 'ProducerMovies', as: 'producers' } }];
}

module.exports = MovieModel;