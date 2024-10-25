const Application = require('src/application/Application');
const request = require('supertest');
var fs = require('fs');
const path = require('node:path');

describe('Entrypoint tests', function () {
    let server, app;
    beforeAll(async () => {
        app = new Application();
        server = await app.start();
    });
    afterAll(async () => {
        server.close();
        var filePath = path.join(__dirname, '..', 'database.sqlite');
        fs.unlinkSync(filePath);
    })

    it('POST /movies', async () => {
        const response = await request(server)
            .post('/api/movies')
            .trustLocalhost()
            .attach('file', __dirname + '/data/test.csv')
            .expect('Content-Type', /json/)
            .expect(201)

        expect(response.body.length).toEqual(20);
    });

    it('GET /producers', async () => {
        const response = await request(server)
            .get('/api/producers')
            .trustLocalhost()
            .send()
            .expect('Content-Type', /json/)
            .expect(200)

        expect(response.body.length).toEqual(33);
    });

    it('GET /producers/winners', async () => {
        const response = await request(server)
            .get('/api/producers/winners')
            .trustLocalhost()
            .send()
            .expect('Content-Type', /json/)
            .expect(200)

        expect(response.body).toEqual({
            "max": [
                {
                    "followingWin": 2015,
                    "interval": 13,
                    "previousWin": 2002,
                    "producer": "Matthew Vaughn",
                },
            ],
            "min": [
                {
                    "followingWin": 1991,
                    "interval": 1,
                    "previousWin": 1990,
                    "producer": "Joel Silver",
                },
            ],
        });
    });
});