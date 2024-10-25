module.exports = class Movie {
    constructor(title, studios, producers, year, isWinner) {
        this.title = title;
        this.studios = studios;
        this.producers = producers;
        this.year = year;
        this.is_winner = isWinner;
    }
}