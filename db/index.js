const Sequelize = require('sequelize');
const Op = Sequelize.Op

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
};

const DBNAME = process.env.DBNAME
const DBUSERNAME = process.env.DBUSERNAME
const DBPASSWORD = process.env.DBPASSWORD
const DBHOST = process.env.DBHOST
const DBPORT = process.env.DBPORT

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
