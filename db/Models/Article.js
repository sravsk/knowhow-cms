const Sequelize = require('sequelize');
const db = require('../index.js');

const Article = db.define('articles', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.STRING, allowNull: false },
  content: {type: Sequelize.STRING, allowNull: false}
});

module.exports = Article;