const Sequelize = require('sequelize');

if (process.env.DATABASE_URL !== undefined) {
  var db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    protocol: 'mysql',
    logging:  true
  })

} else {
  var db = new Sequelize('knowhow', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  })
}

db
  .authenticate()
  .then(() => {
    console.log('Connected to knowhow');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;