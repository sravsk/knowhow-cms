// create a database connection and export it
const Sequelize = require('sequelize');

const db = require('../config.js');

const connection = new Sequelize(db.DBNAME, db.DBUSERNAME, db.DBPASSWORD, {
  host: db.DBHOST,
  dialect: 'mysql'
});

// check for database connection
connection
  .authenticate()
  .then(() => {
    console.log(`Connected to database ${db.DBNAME}`);
  })
  .catch(err => {
    console.log('Unable to connect to database:', err);
  });

// sync
connection.sync({
  // logging: console.log
});

module.exports = connection;
