const request = require('supertest');
const app = require('../../src/app.js');
const connection = require('../../src/database/connection');

describe('ONG', ()=>{
    beforeEach(async ()=>{
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async ()=>{
        await connection.destroy();
    });

    it('should ne able to create a new ONG', async ()=>{
        const response = await request(app)
        .post('/ongs')
        .send({
            name : "APAE",
            email: "contato@gmail.com",
            whatsapp: "45999999999",
            city: "curitiba",
            uf: "PR"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLengyh(8);
    });
});