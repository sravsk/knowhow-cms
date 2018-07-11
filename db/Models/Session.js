const session = require('express-session');
const connection = require('../../db');

connection.sync();

// initalize sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sessionStore = new SequelizeStore({
  db: connection,
  checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
  expiration: 1 * 60 * 60 * 1000  // The maximum age (in milliseconds) of a valid session.
})

module.exports = sessionStore;