const Movie = require("../entities/Movie");

module.exports = class MovieFactory {
    constructor({ producerFactory }) {
        this._producerFactory = producerFactory;
    }

    _getProducerList(producers = "") {
        return producers.split(/(\,|and)/)
            .filter(item => ![",", "and"].includes(item))
            .map(item => this._producerFactory.create(item.trim()));
    }

    create(year, title, studios, producers, isWinner) {
        return new Movie(title, studios, this._getProducerList(producers), year, isWinner === "yes");
    }
}