const Sequelize = require('sequelize');
const db = require('../index.js');

const Passwordreset = db.define('passwordreset', {
  resetHash: { type: Sequelize.TEXT, allowNull: false }
});

module.exports = Passwordreset;

