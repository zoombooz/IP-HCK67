'use strict';
const axios = require('axios');
const { hash } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let { data } = await axios({
        method : "GET",
        url : "https://dummyjson.com/products"
    })

    let { products } = data

    let images = []

    products.forEach((el, index) => {
        ++index
        el.createdAt = new Date()
        el.updatedAt = new Date()
        el.images.forEach(image => {
            images.push({
                imageUrl : image,
                productId : index,
                createdAt : new Date(),
                updatedAt : new Date()
            })
        })
        delete el.id 
        delete el.images
    })

    await queryInterface.bulkInsert('Products', products, {})

    await queryInterface.bulkInsert('Users', [{
        fullName : "Admin",
        password : hash("admin"),
        email : "admin@email.com",
        phoneNumber : "082111223344",
        address : "Jakarta",
        role : "admin",
        createdAt : new Date(),
        updatedAt : new Date()
    }], {})

    await queryInterface.bulkInsert('Images', images, {})

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Images', null, {
        truncate : true,
        cascade : true,
        restartIdentity : true
    })

    await queryInterface.bulkDelete('Carts', null, {
        truncate : true,
        cascade : true,
        restartIdentity : true
    })

    await queryInterface.bulkDelete('Products', null, {
        truncate : true,
        cascade : true,
        restartIdentity : true
    })

    await queryInterface.bulkDelete('Users', null, {
        truncate : true,
        cascade : true,
        restartIdentity : true
    })

  }
};
