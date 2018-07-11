const Sequelize = require('sequelize');
const db = require('../index.js');

const User = db.define('users', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },

  email: { type: Sequelize.STRING, allowNull: false, unique: true },

  name: { type: Sequelize.STRING, allowNull: false },

  password: { type: Sequelize.STRING, allowNull: true },
  //password can be null if only an invited user,
  //but client side should not allow a null password during sign up
  //or after receiving invitation

  role: {type: Sequelize.ENUM('admin', 'general')}
});

module.exports = User;