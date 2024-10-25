const { parse } = require('csv-parse/sync');

module.exports = class CreateMoviesService {
    constructor({ movieFactory, moviesRepository }) {
        this._movieFactory = movieFactory;
        this._moviesRepository = moviesRepository;
    }

    async execute(file) {
        try {
            const records = parse(file.buffer, { delimiter: ';' });
            records.shift();
            const moviesList = records.map((item) => {
                return this._movieFactory.create(item[0], item[1], item[2], item[3], item[4]);
            });
            const returnList = [];
            for (let i = 0; i < moviesList.length; i++) {
                returnList.push(await this._moviesRepository.create(moviesList[i]));
            }
            return returnList;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}