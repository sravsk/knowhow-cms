const db = require('./index.js');
const assoc = require('./associations.js');
const Company = require('./Models/Company');
const User = require('./Models/User');
const Category = require('./Models/Category');
const Article = require('./Models/Article');

const bcrypt = require('bcrypt-nodejs');



// This creates the tables in the database and their relationships.
assoc();

var dbHelpers = {

  /////////////////////
  //      USERS      //
  /////////////////////

  // creating a new user
  // check if a user exists for the given company, if yes, return false in callback
  // if no user exists for the given company, create a user with role 'admin', return true in callback
  addUser: ({name, email, password, company, domain}, cb) => {
    User.findOne({
      where: {email: email}
    })
    .then(result => {
      if (result !== null) {
        // a user already exists with this email
        cb(email, true)
      } else {
        // email is unique
        Company.findOne({
          where: {domain: domain}
        }).
        then(result => {
          if (result === null) {
            // create company
            Company.create({
              name: company,
              domain: domain
            })
            .then(result => {
              let companyId = result.id;
              // create user
              User.create({
                name: name,
                email: email,
                password: password,
                role: 'admin',
                companyId: companyId
              })
              .then(user => {
                cb(true, null);
              })
            })
          } else {
            // an admin user exists for the given company
            cb(false, null);
          }
        })
      }
    })
  },

  // updating a user's password, during forgot pw or after invitation
  updateUser: (obj) => {},

  // find a user and pass it to the callback function
  findUser: ({email}, cb) => {
    User.findOne({
      where: {email: email}
    })
    .then(result => {
      cb(result)
    })
  },


  /////////////////////
  //    COMPANIES    //
  /////////////////////

  // creating a company
  addCompany: (obj) => {},


  /////////////////////
  //    CATEGORIES   //
  /////////////////////

  // create a Category for Articles
  addCategory: (obj) => {},

  // update a Category's name or description
  updateCategory: (obj) => {},

  // removing a category
  deleteCategory: (obj) => {},


  /////////////////////
  //     ARTICLES    //
  /////////////////////

  // create an article with content
  addArticle: (obj) => {},

  // update an article
  updateArticle: (obj) => {},

  // delete an article
  updateArticle: (obj) => {},


  //////////////////////////////
  //    TEST DATA FUNCTIONS   //
  //////////////////////////////

  clearTables: () => {},

  dropTables: () => {
    db.drop();
  },

  recreateDB: () => {
    Company.sync().then(() => User.sync().then(() => Category.sync().then(() => Article.sync())));
  }
}

module.exports = dbHelpers;
