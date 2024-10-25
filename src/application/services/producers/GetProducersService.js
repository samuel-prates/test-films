const { parse } = require('csv-parse/sync');

module.exports = class CreateMoviesService {
    constructor({ producersRepository }) {
        this._producersRepository = producersRepository;
    }

    async list() {
        try {
            return await this._producersRepository.getAll();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async winners() {
        try {
            const winners = await this._producersRepository.getWinners();
            const min = winners[0].interval;
            const max = winners[winners.length - 1].interval;
            return {
                min: winners.filter(winner => winner.interval === min).map(winner => ({
                    producer: winner.name,
                    interval: winner.interval,
                    previousWin: winner.previousWin,
                    followingWin: winner.followingWin
                })),
                max: winners.filter(winner => winner.interval === max).map(winner => ({
                    producer: winner.name,
                    interval: winner.interval,
                    previousWin: winner.previousWin,
                    followingWin: winner.followingWin
                })),
            };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}