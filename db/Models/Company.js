const Sequelize = require('sequelize');
const db = require('../index.js');

const Company = db.define('companies', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: Sequelize.STRING, allowNull: false },
  domain: { type: Sequelize.STRING, allowNull: false, unique: true }
});

module.exports = Company;