const {User, sequelize} = require('../models');
const {queryInterface} = sequelize
const app = require('../app');
const request = require('supertest');
const { hash } = require('../helpers/bcrypt');

beforeAll(async () => {
    await User.create({
        username : "admin",
        email : "admin@email.com",
        password : hash("admin")
    })
})

describe("POST /login", () => {
    test("Should return 200 and an access token", async () => {
        let {status, body} = await request(app)
            
            .post('/login')
            .send({
                email : "admin@email.com",
                password : "admin"
            })
    
            expect(status).toBe(200)
            expect(body).toHaveProperty('accessToken', expect.any(String))
    })

    test("Should return 400 and a message", async () => {
        let {status, body} = await request(app)
            .post('/login')
            .send({
                email : "",
                password : "admin"
            })

            expect(status).toBe(400)
            expect(body).toHaveProperty('message', expect.any(String))
            console.log(body.message);
    })

    test("Should return 400 and a message", async () => {
        let {status, body} = await request(app)
            
            .post('/login')
            .send({
                email : "admin@email.com",
                password : ""
            })
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', expect.any(String))
            console.log(body.message)
    })

    test("Should return 401 and a message (Email is not registered)", async () => {
        let {status, body} = await request(app)
            .post('/login')
            .send({
                email : "admin@mail.com",
                password : "admin"
            })

            expect(status).toBe(401)
            expect(body).toHaveProperty('message', expect.any(String))
            console.log(body.message)
    })

    test("Should return 401 and a message (Password to the email is incorrect)", async () => {
        let {status, body} = await request(app)
            .post('/login')
            .send({
                email : "admin@email.com",
                password : "admiin"
            })

            expect(status).toBe(401)
            expect(body).toHaveProperty('message', expect.any(String))
            console.log(body.message)
    })
})

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})