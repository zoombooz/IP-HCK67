const {User, Article, sequelize, Category} = require('../models');
const {queryInterface} = sequelize;
const app = require('../app');
const request = require('supertest');
const { hash } = require('../helpers/bcrypt');
const jwt = require('jsonwebtoken');


let accessTokenAdmin = null
let accessTokenUser = null

let users = [
    {
        username : "admin",
        email : "admin@email.com",
        password : hash("adminpassword"),
        role : "admin"
    },
    {
        username : "user1",
        email : "user1@email.com",
        password : hash("user1password"),
        role : "staff"
    }
]
users.forEach(el => {
    el.createdAt = new Date(),
    el.updatedAt = new Date()
})

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
categories.forEach(el => {
    el.createdAt = new Date(),
    el.updatedAt = new Date()
})

beforeAll(async () => {
    try {

        await queryInterface.bulkInsert('Users', users, {})
        await queryInterface.bulkInsert('Categories', categories, {})

        const admin = await User.findOne({
            where : {
                email : "admin@email.com"
            }
        })

        const user1 = await User.findOne({
            where : {
                email : "user1@email.com"
            }
        })

        accessTokenAdmin = jwt.sign({
            id : admin.id,
            role : admin.role
        }, process.env.ACCESS_TOKEN_SECRET)
    
        accessTokenUser = jwt.sign({
            id : user1.id,
            role : user1.role
        }, process.env.ACCESS_TOKEN_SECRET)

        await request(app)
            .post('/articles')
            .set('Authorization', `Bearer ${accessTokenAdmin}`)
            .send({
                title : "Lorem Ipsum",
                content : "Lorem ipsum dolor sit amet",
                imgUrl : "https://images.pexels.com/photos/19955808/pexels-photo-19955808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                categoryId : 1
            })

        await request(app)
            .post('/articles')
            .set('Authorization', `Bearer ${accessTokenUser}`)
            .send({
                title : "Lorem Ipsum",
                content : "Lorem ipsum dolor sit amet",
                imgUrl : "https://images.pexels.com/photos/19955808/pexels-photo-19955808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                categoryId : 2
            })



    } catch (error) {
        console.log(error);
    }
})

describe("POST /articles", () => {
    test("Should return 201 and an object", async () => {
        const {status, body} = await request(app)
            .post('/articles')
            .set("Authorization", `Bearer ${accessTokenAdmin}`)
            .send({
                title : "Lorem Ipsum",
                content : "Lorem ipsum dolor sit amet",
                imgUrl : "https://images.pexels.com/photos/19955808/pexels-photo-19955808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                categoryId : 3
            })
            
            expect(status).toBe(201);
            expect(body).toHaveProperty("id", expect.any(Number))
            expect(body).toHaveProperty("title", expect.any(String))
            expect(body).toHaveProperty("content", expect.any(String))
            expect(body).toHaveProperty("imgUrl", expect.any(String))
            expect(body).toHaveProperty("categoryId", expect.any(Number))
            expect(body).toHaveProperty("authorId", expect.any(Number))
        
        
    })

    test("Should return 401 and return message", async () => {
        const {status, body} = await request(app)
            .post('/articles')
            .send({
                title : "Lorem Ipsum",
                content : "Lorem ipsum dolor sit amet",
                imgUrl : "https://images.pexels.com/photos/19955808/pexels-photo-19955808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                categoryId : 1
            })

            expect(status).toBe(401);
            expect(body).toHaveProperty("message", expect.any(String))


    })

    test("Should return 401 and return message", async () => {
        const {status, body} = await request(app)
            .post('/articles')
            .set("Authorization", `Bearer ${accessTokenAdmin.substring(2)}`)
            .send({
                title : "Lorem Ipsum",
                content : "Lorem ipsum dolor sit amet",
                imgUrl : "https://images.pexels.com/photos/19955808/pexels-photo-19955808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                categoryId : 1
            })

            expect(status).toBe(401);
            expect(body).toHaveProperty("message", expect.any(String))


    })

    test("Should return 400 and return message", async () => {
        const {status, body} = await request(app)
            .post('/articles')
            .set("Authorization", `Bearer ${accessTokenAdmin}`)
            .send({
                title : "",
                content : "Lorem ipsum dolor sit amet",
                imgUrl : "https://images.pexels.com/photos/19955808/pexels-photo-19955808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                categoryId : 1
            })

            expect(status).toBe(400);
            expect(body).toHaveProperty("message", expect.any(String))
    })

})

describe("GET /articles", () => {
    test("Should return 200 and return array of object", async () => {
        const {status, body} = await request(app)
            .get('/articles')
            .set('Authorization', `Bearer ${accessTokenAdmin}`)

            expect(status).toBe(200)
            expect(body[0]).toHaveProperty("id", expect.any(Number))
            expect(body[0]).toHaveProperty("title", expect.any(String))
    })

    test("Should return 401 and return a message", async () => {
        const {status, body} = await request(app)
            .get('/articles')

            expect(status).toBe(401)
            expect(body).toHaveProperty("message", expect.any(String))
    })

    test("Should return 401 and return a message", async () => {
        const {status, body} = await request(app)
            .get('/articles')
            .set('Authorization', `Bearer ${accessTokenAdmin.substring(2)}`)

            expect(status).toBe(401)
            expect(body).toHaveProperty("message", expect.any(String))
    })
})

describe("GET /articles/:id", () => {
    test("Should return 200 and an object", async () => {
        const {status, body} = await request(app)
            .get('/articles/1')
            .set('Authorization', `Bearer ${accessTokenAdmin}`)

            expect(status).toBe(200)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('title', expect.any(String))
    })

    test("Should return 401 and a message", async () => {
        const {status, body} = await request(app)
            .get('/articles/1')

            expect(status).toBe(401)
            expect(body).toHaveProperty('message', expect.any(String))
    })

    test("Should return 401 and a message", async () => {
        const {status, body} = await request(app)
            .get('/articles/1')
            .set('Authorization', `Bearer ${accessTokenAdmin.substring(2)}`)

            expect(status).toBe(401)
            expect(body).toHaveProperty('message', expect.any(String))
    })

    test("Should return 404 and a message", async () => {
        const {status, body} = await request(app)
            .get('/articles/5')
            .set('Authorization', `Bearer ${accessTokenAdmin}`)

            expect(status).toBe(404)
            expect(body).toHaveProperty('message', expect.any(String))
    })
})

describe("PUT /articles/:id", () => {
    test("Shoud return 200 and an object", async () => {
        console.log("ENTER <<<<<<<<<<<<<<<<<<<<>TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
        const {status, body} =  await request(app)
            .put('/articles/1')
            .set('Authorization', `Bearer ${accessTokenAdmin}`)
            .send({
                title : "Apple launches its latest iPhone yet",
                content : "Lorem ipsum dolor sit amet",
                imgUrl : "https://images.pexels.com/photos/19955808/pexels-photo-19955808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                categoryId : 3
            })

            expect(status).toBe(200);
            expect(body).toHaveProperty("id", expect.any(Number))
            expect(body).toHaveProperty("title", expect.any(String))
            expect(body).toHaveProperty("content", expect.any(String))
            expect(body).toHaveProperty("imgUrl", expect.any(String))
            expect(body).toHaveProperty("categoryId", expect.any(Number))
            expect(body).toHaveProperty("authorId", expect.any(Number))
            console.log(body);

    })

    test("Should return 401 and a message", async () => {
        const {status, body} = await request(app)
            .put('/articles/1')
            .send({
                title : "Apple launches its latest iPad yet",
                content : "Lorem ipsum dolor sit amet",
                imgUrl : "https://images.pexels.com/photos/19955808/pexels-photo-19955808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                categoryId : 3
            })

            expect(status).toBe(401)
            expect(body).toHaveProperty("message", expect.any(String))
    })

    test("Should return 401 and a message", async () => {
        const {status, body} = await request(app)
            .put('/articles/1')
            .set('Authorization', `Bearer ${accessTokenAdmin.substring(2)}`)
            .send({
                title : "Apple launches its latest iPad yet",
                content : "Lorem ipsum dolor sit amet",
                imgUrl : "https://images.pexels.com/photos/19955808/pexels-photo-19955808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                categoryId : 3
            })

            expect(status).toBe(401)
            expect(body).toHaveProperty("message", expect.any(String))
    })

    test("Should return 404 and a message", async () => {
        const{status, body} = await request(app)
            .put('/articles/5')
            .set('Authorization', `Bearer ${accessTokenAdmin}`)
            .send({
                title : "Apple launches its latest iPad yet",
                content : "Lorem ipsum dolor sit amet",
                imgUrl : "https://images.pexels.com/photos/19955808/pexels-photo-19955808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                categoryId : 3
            })

            expect(status).toBe(404)
            expect(body).toHaveProperty("message", expect.any(String))

    })

    test("Should return 403 and a message", async () => {
        const{status, body} = await request(app)
            .put('/articles/1')
            .set('Authorization', `Bearer ${accessTokenUser}`)
            .send({
                title : "Apple launches its latest iPad yet",
                content : "Lorem ipsum dolor sit amet",
                imgUrl : "https://images.pexels.com/photos/19955808/pexels-photo-19955808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                categoryId : 3
            })

            expect(status).toBe(403)
            expect(body).toHaveProperty("message", expect.any(String))

    })

    test("Should return 400 and a message", async () => {
        const{status, body} = await request(app)
            .put('/articles/1')
            .set('Authorization', `Bearer ${accessTokenAdmin}`)
            .send({
                title : "",
                content : "Lorem ipsum dolor sit amet",
                imgUrl : "https://images.pexels.com/photos/19955808/pexels-photo-19955808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                categoryId : 3
            })

            expect(status).toBe(400)
            expect(body).toHaveProperty("message", expect.any(String))

    })
})

describe("DELETE /articles/:id", () => {
    test("Should return 200 and a message", async () => {
        const {status, body} = await request(app)
            .delete('/articles/3')
            .set('Authorization', `Bearer ${accessTokenAdmin}`)

            expect(status).toBe(200)
            expect(body).toHaveProperty('message', expect.any(String))
    })

    test("Should return 401 and a message", async () => {
        const {status, body} = await request(app)
            .put('/articles/2')
            
            expect(status).toBe(401)
            expect(body).toHaveProperty("message", expect.any(String))
    })

    test("Should return 401 and a message", async () => {
        const {status, body} = await request(app)
            .put('/articles/2')
            .set('Authorization', `Bearer ${accessTokenUser.substring(2)}`)
            
            expect(status).toBe(401)
            expect(body).toHaveProperty("message", expect.any(String))
    })

    test("Should return 404 and a message", async () => {
        const {status, body} = await request(app)
            .delete('/articles/4')
            .set('Authorization', `Bearer ${accessTokenAdmin}`)

            expect(status).toBe(404)
            expect(body).toHaveProperty("message", expect.any(String))
    })

    test("Should return 403 and a message", async () => {
        const {status, body} = await request(app)
            .delete('/articles/1')
            .set('Authorization', `Bearer ${accessTokenUser}`)

            expect(status).toBe(403)
            expect(body).toHaveProperty("message", expect.any(String))
    })
})

describe("PATCH /articles/:id/img", () => {
    test("Should return 200 and a message", async () => {
        const {status, body} = await request(app)
            .patch('/articles/2/img')
            .set('Authorization', `Bearer ${accessTokenUser}`)
            .attach('imgUrl', 'uploads/bike.avif', 'bike.avif')

            expect(status).toBe(200)
            expect(body).toHaveProperty("message", expect.any(String))
    })

    test("Should return 401 and a message", async () => {
        const {status, body} = await request(app)
        .patch('/articles/1/img')
        .attach('imgUrl', 'uploads/redball.avif', 'redball.avif')
        
        expect(status).toBe(401)
        expect(body).toHaveProperty("message", expect.any(String))
        
    })

    test("Should return 401 and a message", async () => {
        const {status, body} = await request(app)
            .patch('/articles/2/img')
            .set('Authorization', `Bearer ${accessTokenUser.substring(2)}`)
            .attach('imgUrl', 'uploads/redball.avif', 'redball.avif')

            expect(status).toBe(401)
            expect(body).toHaveProperty("message", expect.any(String))
    })

    test("Should return 404 and a message", async () => {
        const {status, body} = await request(app)
            .patch('/articles/5/img')
            .set('Authorization', `Bearer ${accessTokenUser}`)
            .attach('imgUrl', 'uploads/redball.avif', 'redball.avif')

            expect(status).toBe(404)
            expect(body).toHaveProperty("message", expect.any(String))
    })

    test("Should return 403 and a message", async () => {
        const {status, body} = await request(app)
            .patch('/articles/1/img')
            .set('Authorization', `Bearer ${accessTokenUser}`)
            .attach('imgUrl', 'uploads/redball.avif', 'redball.avif')

            expect(status).toBe(403)
            expect(body).toHaveProperty("message", expect.any(String))
    })

    test("Should return 400 and a message", async () => {
        const {status, body} = await request(app)
            .patch('/articles/1/img')
            .set('Authorization', `Bearer ${accessTokenAdmin}`)
            .send({
                imgUrl : ''
            })

            expect(status).toBe(400)
            expect(body).toHaveProperty("message", expect.any(String))
    })
})

describe("GET /categories", () => {
    test("Should return 200 and an array of object", async () => {
        const {status, body} = await request(app)
            .get('/categories')
            .set('Authorization', `Bearer ${accessTokenUser}`)

            expect(status).toBe(200)
            expect(body[0]).toHaveProperty("id", expect.any(Number))
            expect(body[0]).toHaveProperty("name", expect.any(String))
    })

    test("Should return 401 and an array of object", async () => {
        const {status, body} = await request(app)
            .get('/categories')

            expect(status).toBe(401)
            expect(body).toHaveProperty("message", expect.any(String))
    })

    test("Should return 401 and an array of object", async () => {
        const {status, body} = await request(app)
            .get('/categories')
            .set('Authorization', `Bearer ${accessTokenUser.substring(2)}`)

            expect(status).toBe(401)
            expect(body).toHaveProperty("message", expect.any(String))
    })
})

afterAll(async () => {
    await queryInterface.bulkDelete('Articles', null, {
        truncate : true,
        cascade : true,
        restartIdentity : true
    })
    await queryInterface.bulkDelete('Categories', null, {
        truncate : true,
        cascade : true,
        restartIdentity : true
    })
    await queryInterface.bulkDelete('Users', null, {
        truncate : true,
        cascade : true,
        restartIdentity : true
    })
})