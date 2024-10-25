class AbstractModel {
    getName() {
        return this._dbName;
    }

    getProperties() {
        return this._properties;
    }

    getRepository() {
        return this._repository;
    }
}

module.exports = AbstractModel;