const Producer = require("../entities/Producer");

module.exports = class ProducerFactory {
    create(name) {
        return new Producer(name);
    }
}