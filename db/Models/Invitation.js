const Sequelize = require('sequelize');
const db = require('../index.js');

const Invitation = db.define('invitation', {
  companyId: { type: Sequelize.INTEGER},
  code: { type: Sequelize.INTEGER}
});

Invitation.sync();

module.exports = Invitation;