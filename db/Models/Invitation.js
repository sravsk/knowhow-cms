const Sequelize = require('sequelize');
const db = require('../index.js');

const Invitation = db.define('invitation', {
  companyId: { type: Sequelize.INTEGER},
  email: {type: Sequelize.STRING},
  hash: { type: Sequelize.TEXT},
  role: { type: Sequelize.ENUM('admin', 'general')}
});

Invitation.sync();

module.exports = Invitation;
