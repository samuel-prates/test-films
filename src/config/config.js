module.exports = {
    port: 3000,
    appCode: 10,
    stackErrorisVisible: true,
    database: {
        dialect: 'sqlite::memory:',
        storage: ':memory:',
        pool: { max: 1, idle: Infinity, maxUses: Infinity },
        models: ["movieModel", "producerModel"]
    }
}