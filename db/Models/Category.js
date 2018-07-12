const Sequelize = require('sequelize');
const db = require('../index.js');

const Category = db.define('categories', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.STRING, allowNull: false }
});

module.exports = Category;
