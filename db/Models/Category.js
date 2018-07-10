const Sequelize = require('sequelize');
const db = require('../index.js');

const Category = db.define('categories', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  Name: { type: Sequelize.STRING, allowNull: false },
  Description: { type: Sequelize.STRING, allowNull: false }
});

module.exports = Category;