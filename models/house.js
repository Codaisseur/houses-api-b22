const Sequelize = require('sequelize')
const sequelize = require('../db')

const House = sequelize.define('house', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  size: Sequelize.INTEGER,
  price: Sequelize.INTEGER
}, {
  tableName: 'houses'
})

House.sync() // this creates the houses table in your database when your app starts

module.exports = House
