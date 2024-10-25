const Application = require('src/application/Application');
const request = require('supertest');
var fs = require('fs');

describe('POST /movies', function () {
    let server, app;
    beforeAll(async () => {
        app = new Application();
        server = await app.start();
    });
    afterAll(async () => {
        var filePath = __dirname + '/../database.sqlite';
        fs.unlinkSync(filePath);
        server.close();
    })

    it('responds with json', async () => {
        const response = await request(server)
            .post('/api/movies')
            .trustLocalhost()
            .attach('file', __dirname + '/data/test.csv')
            .expect('Content-Type', /json/)
            .expect(201)

        expect(response.body.length).toEqual(7);
    });
});