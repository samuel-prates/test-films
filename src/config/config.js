module.exports = {
    port: 3000,
    appCode: 10,
    stackErrorisVisible: true,
    database: {
        dialect: 'sqlite',
        storage: './database.sqlite',
        models: ["movieModel", "producerModel"]
    }
}