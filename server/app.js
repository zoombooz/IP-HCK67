const axios = require('axios');

async function fetchData() {
    try {
        const data = await axios({
            method : "GET",
            url : "https://dummyjson.com/products"
        })
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

fetchData()





/*

npx sequelize-cli model:generate --name User --attributes fullName:string,email:string,password:string,phoneNumber:string,address:string

npx sequelize-cli model:generate --name Product --attributes title:string,description:text,price:integer,discountPercentage:decimal,rating:decimal,stock:integer,brand:string,category:string,thumbnail:string

npx sequelize-cli model:generate --name Cart --attributes userId:integer,productId:integer,amount:integer

npx sequelize-cli model:generate --name Image --attributes imageUrl:string,productId:integer

npx sequelize-cli seed:generate --name insert-data-to-tables

*/