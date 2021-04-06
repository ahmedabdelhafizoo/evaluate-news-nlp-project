require("@babel/polyfill");

jest.setTimeout(30000);

const request = require('supertest');

const app = require("./index").app;
describe("test analyze url api", () => {
    it('expect status to be 400 if url is missed', async function (done) {
        let response = await request(app).get('/api/analyzeUrl')
    
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("url field is required");
        done()
    });
    
    it('expect status to be 400 if url is not valid', async function (done) {
        let response = await request(app).get('/api/analyzeUrl?url=ahmed')
    
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("url field is not valid");
        done()
    });
    
    it('expect status to be 200 if url is exists', async function (done) {
    
        let response = await request(app)
            .get('/api/analyzeUrl?url=https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6');
        expect(response.status).toBe(200);
        done()
    });
})
