if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require('express')
const app = express()
const router = require('./routes')
const cors = require('cors');

app.use(cors())

app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use(router)

module.exports = app

/*

npx sequelize-cli model:generate --name User --attributes fullName:string,email:string,password:string,phoneNumber:string,address:string

npx sequelize-cli model:generate --name Product --attributes title:string,description:text,price:integer,discountPercentage:decimal,rating:decimal,stock:integer,brand:string,category:string,thumbnail:string

npx sequelize-cli model:generate --name Cart --attributes userId:integer,productId:integer,amount:integer

npx sequelize-cli model:generate --name Image --attributes imageUrl:string,productId:integer

npx sequelize-cli seed:generate --name insert-data-to-tables

*/