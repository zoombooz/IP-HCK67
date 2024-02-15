const {hash} = require('../helpers/bcrypt');
const {User, Article, Category, sequelize} = require('../models');
const {queryInterface} = sequelize
const request = require('supertest');
const app = require('../app');

const users = [
    {
        username : "admin",
        email : "admin@email.com",
        password : hash("adminpassword"),
        role : "admin",
        createdAt : new Date(),
        updatedAt : new Date()
    },
    {
        username : "user1",
        email : "user1@email.com",
        password : hash("user1password"),
        role : "staff",
        createdAt : new Date(),
        updatedAt : new Date()
    },
    {
        username : "user2",
        email : "user2@email.com",
        password : hash("user2password"),
        role : "staff",
        createdAt : new Date(),
        updatedAt : new Date()
    }
]

let categories = [
    {
        name: "Politic"
    },
    {
        name: "Sport"
    },
    {
        name: "Technology"
    },
    {
        name: "Finance"
    }
]

let articles = require('../data/articles.json');

beforeAll(async () => {

    await queryInterface.bulkInsert('Users', users, {})

    categories.forEach(el => {
        el.createdAt = new Date()
        el.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Categories', categories, {})

    articles.forEach(el => {
        el.createdAt = new Date()
        el.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Articles', articles, {})
    
}) 

describe("GET /articles/pub", () => {
    test("Should return 200 and an array of object", async () => {
        const {status, body} = await request(app)
            .get('/articles/pub')
            
            expect(status).toBe(200)
            expect(body).toHaveProperty('total', expect.any(Number))
            expect(body).toHaveProperty('size', expect.any(Number))
            expect(body).toHaveProperty('totalPage', expect.any(Number))
            expect(body).toHaveProperty('currentPage', expect.any(Number))
            expect(body.data).toHaveLength(10)
    })

    test("Should return 200 and an array of object", async () => {
        const {status, body} = await request(app)
            .get('/articles/pub?filter=1')

            expect(status).toBe(200)
            expect(body).toHaveProperty('total', expect.any(Number))
            expect(body).toHaveProperty('size', expect.any(Number))
            expect(body).toHaveProperty('totalPage', expect.any(Number))
            expect(body).toHaveProperty('currentPage', expect.any(Number))
            expect(body.data).toHaveLength(4)
    })

    test("Should return 200 and an array of object", async () => {
        const {status, body} = await request(app)
            .get('/articles/pub?page=1')

            expect(status).toBe(200)
            expect(body).toHaveProperty('total', expect.any(Number))
            expect(body).toHaveProperty('size', expect.any(Number))
            expect(body).toHaveProperty('totalPage', expect.any(Number))
            expect(body).toHaveProperty('currentPage', expect.any(Number))
            expect(body.data).toHaveLength(10)
    })
})

describe("GET /articles/:id/pub", () => {
    test("Should return 200 and an object", async () => {
        const {status, body} = await request(app)
            .get('/articles/1/pub')
            
            expect(status).toBe(200)
            expect(body).toHaveProperty('id', expect.any(Number))
    })

    test("Should return 404 and a message", async () => {
        const {status, body} = await request(app)
            .get('/articles/21/pub')

            expect(status).toBe(404)
            expect(body).toHaveProperty("message", expect.any(String))
    })
})

afterAll(async () => {
    await queryInterface.bulkDelete('Articles', null, {
        truncate : true,
        cascade : true,
        restartIdentity : true
    })
    await queryInterface.bulkDelete('Users', null, {
        truncate : true,
        cascade : true,
        restartIdentity : true
    })
    await queryInterface.bulkDelete('Categories', null, {
        truncate : true,
        cascade : true,
        restartIdentity : true
    })
})