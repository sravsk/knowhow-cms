const db = require('./index.js');
const assoc = require('./associations.js');
const Company = require('./Models/Company');
const User = require('./Models/User');
const Category = require('./Models/Category');
const Article = require('./Models/Article');
const Invitation = require('./Models/Invitation');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
const key = require('../config.js').SENDGRID_API_KEY;

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
        cb(false, email, true)
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
                let userInfo = {
                  name: user.name,
                  companyId: user.companyId
                }
                cb(true, userInfo, null);
              })
            })
          } else {
            // an admin user exists for the given company
            cb(false, null, null);
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
      if (result === null){
        cb(result)
      } else {
        cb(result.dataValues)
      }
    })
  },

  // invite additional users, send an email invite with a random code using sendgrid
  // save companyId and code in invitations table
  inviteUser: ({companyId, email}, cb) => {
    // generate a random 6 digit number
    var num = Math.floor(Math.random() * 900000) + 100000;

    // save companyId and random number in invitations table
    let invite = Invitation.build({
      code: num,
      companyId: companyId
    });
    invite.save();

    // send an invitation email with code
    sgMail.setApiKey(key);
    const msg = {
      to: email,
      from: 'knowhowrpt@gmail.com',
      subject: 'Invitation to join Knowhow',
      text: `Enter code ${num} at signup`
    };
    sgMail.send(msg);
    cb(true);
  },

// TODO - fix function below
  // // add user with a code
  // addUserWithCode: ({name, email, password, code}, cb) => {
  //   User.findOne({
  //     where: {email: email}
  //   })
  //   .then(result => {
  //     if (result !== null) {
  //       // a user already exists with this email
  //       cb(false)
  //     } else
  //         // find companyId with code
  //         Invitation.find({
  //           where: {code: code}
  //         })
  //         .then(invite => {
  //           let companyId = invite.companyId;
  //           // create user
  //           User.create({
  //             name: name,
  //             email: email,
  //             password: password,
  //             role: 'admin',
  //             companyId: companyId
  //           })
  //           .then(user => {
  //             cb(true);
  //           })
  //         })

  //       })
  //     }
  //   }
  // },

  // authenticateUser: ({email, password}, cb) => {
  //   // console.log('in authenticateUser function')
  //   User.findOne({
  //     where: {email: email}
  //   })
  //   .then(result => {
  //     if (result === null) {
  //       // no user exists with given email
  //       cb(false);
  //     } else {
  //       let hash = result.password;
  //       let name = result.name;
  //       bcrypt.compare(password, hash, function(err, response) {
  //         if (response === true) {
  //           // password matches
  //           cb(true, name);
  //         } else {
  //           // password doesn't match
  //           cb(false);
  //         }
  //       });
  //     }
  //   })
  //   .catch(err => {
  //     cb(false);
  //   })
  // },


  /////////////////////
  //    COMPANIES    //
  /////////////////////

  // creating a company
  addCompany: (obj) => {},

  fetchCompanyData: (companyId, cb) => {
    Company.findAll({
      where: {
        id: companyId
      },
      attributes: ['id', 'name', 'domain']
    })
    .then(results => {
      cb(results);
    })
  },


  /////////////////////
  //    CATEGORIES   //
  /////////////////////

  // create a category
  addCategory: ({name, description, companyId}, cb) => {
    Category.findOrCreate({
      where: {name: name, companyId: companyId}, defaults: {description: description}
    })
    .spread((user, created) => {
      cb(created);
    })
  },

  // update a Category's name or description
  updateCategory: (obj, cb) => {
    Category.findOne({where: {id: obj.id}}).then(cat => {
      cat.update({
        name: obj.name,
        description: obj.description
      }).then(cat => cb(cat));
    })
  },

  // removing a category
  deleteCategory: (obj, cb) => {
    Article.findAll({where: {id: obj.id}})
    .then(articles => {
      articles.forEach(article => article.update({companyId: null}))
    })
    .then(() => {Category.findOne({where: {id: obj.id}})
      .then(category => {category.destroy()})
      .then(() => Category.findAll({where: {companyId: obj.coId}})
        .then(categories => {cb(categories);}))
    })
  },

  // fetch all categories for the given company id
  fetchCategoriesByCompany: (companyId, cb) => {
    Category.findAll({
      where: {
        companyId: companyId
      },
      attributes: ['id', 'name', 'description', 'companyId']
    })
    .then(results => {
      cb(results);
    })
  },

  /////////////////////
  //     ARTICLES    //
  /////////////////////

  // create an article with content
  addArticle: (catId, obj, coId, cb) => {
    Category.findOne({where: {id: catId}}).then(foundCat => {
      let newArt = Article.build({
        title: obj.title,
        description: obj.description,
        content: obj.content,
        companyId: coId
      })

      newArt.setCategory(foundCat, {save: false});
      newArt.save().then(() => cb('success'))

    })
  },

  // update an article
  updateArticle: (article, cb) => {
    Article.findById(JSON.parse(article).id)
    .then(record => {
      if (record === null){
        cb(record)
      } else {
        record.update({
          title: JSON.parse(article).title,
          description: JSON.parse(article).description,
          content: JSON.parse(article).content,
          categoryId: JSON.parse(article).categoryId
        })
        .then(response => cb(response))
        cb(result.dataValues)
      }
    })
  },

  // delete an article
  deleteArticle: (id, cb) => {
    Article.destroy({
      where: {
        id: id
      }
    })
    .then(response => cb(response))
  },

  // fetch all articles for a given companyId and categoryId
  fetchArticles: ({companyId, categoryId}, cb) => {
    Article.findAll({
      where: {
        companyId: companyId,
        categoryId: categoryId
      },
      attributes: ['id', 'title', 'description', 'content', 'categoryId', 'companyId']
    })
    .then(results => {
      cb(results);
    })
  },

  // fetch all articles for a given companyId
  fetchCompanyArticles: ({companyId}, cb) => {
    Article.findAll({
      where: {
        companyId: companyId
      },
      attributes: ['id', 'title', 'description', 'content', 'categoryId', 'companyId']
    })
    .then(results => {
      cb(results);
    })
  },

  fetchOneArticle: (id, cb) => {
    Article.findAll({
      where: {
        id: id,
      },
      attributes: ['id', 'title', 'description', 'content', 'categoryId', 'companyId']
    })
    .then(results => {
      cb(results);
    })
  },

  //////////////////////////////
  //    TEST DATA FUNCTIONS   //
  //////////////////////////////

  clearTables: () => {
    Article.findAll().then(articles => articles.forEach(event => article.destroy()));
    Category.findAll().then(categories => categories.forEach(category => category.destroy()));
    User.findAll().then(users => users.forEach(user => user.destroy()));
    Company.findAll().then(companies => companies.forEach(company => company.destroy()));
  },

  dropTables: () => {
    db.drop();
  },

  recreateDB: () => {
    Company.sync().then(() => User.sync().then(() => Category.sync().then(() => Article.sync())));
  },

  dummyData: () => {
    //create company first
    let testCompany = Company.build({
      name: 'Test Company', domain: 'testcompany.com'
    })

    testCompany.save().then(company => {
      // create user after companyId
      let testUser = User.build({
        email: 'tester@gmail.com',
        role: 'admin',
        // password is 'testing123'
        password: '$2b$10$k0rGBI/RMrXvn/S03z11MuiGBCRBkeUAXJq6VK4uRJNfT642slPdO',
        name: 'Test Account'
      })

      // associate user with company
      testUser.setCompany(company, {save: false});

      // save user
      testUser.save();

      for (var i = 0; i < 5; i++) {

        // create category after company
        let testCategory = Category.build({
          name: `Test Category${i+1}`,
          description: `Test Description${i+1}`
        });

        // associate category with company
        testCategory.setCompany(company, {save: false});

        // save category
        testCategory.save().then(category => {

          for (var j = 0; j < 10; j++) {
            let testArticle = Article.build({
              title: `Test Article${category.id}-${j}`,
              description: `Test Article Description${category.id}-${j}`,
              content: `Test Content yada yada yada${category.id}-${j}.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`
            });

            // associate article with category
            testArticle.setCategory(category, {save: false});
            // associate article with company
            testArticle.setCompany(company, {save: false});

            // save article and all is done
            testArticle.save();
          }

        })
      }

    })
  }
}

module.exports = dbHelpers;
