const Sequelize = require('sequelize');

const DBNAME = process.env.RDS_DBNAME || require('../config.js').RDS_DBNAME
const DBUSERNAME = process.env.RDS_USERNAME || require('../config.js').RDS_USERNAME
const DBPASSWORD = process.env.RDS_PASSWORD || require('../config.js').RDS_PASSWORD
const DBHOST = process.env.RDS_HOSTNAME || require('../config.js').RDS_HOSTNAME
const DBPORT = process.env.RDS_PORT || require('../config.js').RDS_PORT

// var db = new Sequelize(DBNAME, DBUSERNAME, DBPASSWORD, {
//   host: DBHOST,
//   port: DBPORT,
//   dialect: 'mysql',
//   dialectOptions: {
//     ssl: 'Amazon RDS'
//   }
// });

const db = new Sequelize(`mysql://${DBUSERNAME}:${DBPASSWORD}@${DBHOST}:${DBPORT}/${DBNAME}`, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: 'Amazon RDS'
  },
  logging: false
})


// if (process.env.DATABASE_URL !== undefined) {
//   var db = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'mysql',
//     protocol: 'mysql',
//     logging:  true
//   })

// } else {
//   var db = new Sequelize('knowhow', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql'
//   })
// }

db
  .authenticate()
  .then(() => {
    console.log('Connected to knowhow');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;
