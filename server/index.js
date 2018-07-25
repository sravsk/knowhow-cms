const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressValidator = require('express-validator');

const db = require('../db/helpers.js');
const sessionStore = require('../db/Models/Session.js');
const sendmail = require('./sendmail.js');

const app = express();
const PORT = process.env.PORT || 3000;
const saltRounds = 10;

// this salt is used only for inviting a new user
const salt = '$2a$10$8WIft9tqyYTZKQASFhGBYe';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator()); // this line must be immediately after any of the bodyParser middlewares

app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.use(session({
  secret: 'lalalala',
  cookieName: 'ASTA', // cookie name dictates the key name added to the request object
  store: sessionStore,
  resave: false,
  saveUninitialized: false // only save sessions for users that are logged in
  // ,cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

// authenticate user with an email and password stored in the database (using Passport local strategy) and return name
// passport.use(new LocalStrategy(
//   function(email, password, done) {
//     // console.log('in passportlocalstrategy')
//     db.authenticateUser({ email: email, password: password } , function(matched, name) {
//       console.log('after user authentication')
//       if (matched) {
//         // credentials are valid
//         // verify callback invokes done to suppy Passport with the user that authenticated
//         return done(null, name);
//       } else {
//         return done(null, false);
//       }
//     })
//   }
// ));

// Passport will maintain persistent login sessions. In order for persistent sessions to work, the authenticated user must be serialized to the session, and deserialized when subsequent requests are made.
passport.serializeUser((name, done) => {
  done(null, name);
});

passport.deserializeUser((name, done) => {
  done(null, name);
});

// middleware to check if user is logged in
var authMiddleware = function () {
  return (req, res, next) => {
    // console.log(`req.session.passport.user: ${req.session.passport}`);
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }
};

// if user is authenticated, redirect to homepage if they try accessing signup/login pages
app.get('/signup', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/home');
  } else {
    res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
  }
});

app.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/home');
  } else {
    res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
  }
});

app.post('/signupuser', (req, res) => {
  // data validation using express-validator
  req.checkBody('email', 'The email you entered is invalid. Please try again.').isEmail();
  req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
  var errors = req.validationErrors();
  if (errors) {
    let data = {
      signup: false,
      errors: errors
    };
    res.send(data);
  } else {
    let password = req.body.password;
    // hash the password by auto-gen a salt and hash
    bcrypt.hash(password, saltRounds, (err, hash) => {
      // store hash in database
      if (hash) {
        db.addUser({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          company: req.body.company,
          domain: req.body.domain
        }, (isUserCreated, userInfo, error) => {
          if (error) {
            let data = {
              signup: false,
              message: 'duplicate email'
            };
            res.send(data);
          } else if (isUserCreated) {
            // login comes from passport and creates a session and a cookie for the user
            // make passport store userInfo in req.user
            req.login(userInfo, (err) => {
              if (err) {
                console.log(err);
                res.sendStatus(404);
              } else {
                let data = {
                  signup: true,
                  userInfo: userInfo
                };
                res.send(data);
              }
            });
          } else {
            let data = {
              signup: false,
              message: 'user exists'
            };
            res.send(data);
          }
        });
      }
    });
  }
});

app.post('/inviteuser', (req, res) => {
  var companyId = req.user.companyId;
  var role = req.body.role;
  var email = req.body.email;
  // generate a random string composed of 8 chars from A-Z, a-z, 0-9
  var code = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 8; i++) {
    code += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  // hash the generated random code using a salt
  bcrypt.hash(code, salt, (err, hash) => {
    if (hash) {
      // save companyId, email, hash and role in invitations table
      db.addInvite({companyId, email, hash, role}, (saved) => {
        if (saved) {
          // send invitation email containing role and generated code
          var to = req.body.email;
          var subject = 'Invitation to join Know-how';
          // TODO - after we have deployed app, send a clickable link in email to join
          // TODO - add some basic info about know-how in the invitation email
          var html = `<p>Enter the following code to sign up to Know-how</p>
          <strong>code : ${code}</strong>`;
          sendmail(to, subject, html);
          res.send('Invitation sent');
        }
      });
    }
  });
});

// TODO - loginuser using passport local strategy
app.post('/loginuser', (req, res) => {
  db.findUser({
    email: req.body.email
  }, (user) => {
    if (user !== null) {
      let hash = user.password;
      let comparePassword = req.body.password;
      let name = user.name;
      bcrypt.compare(comparePassword, hash, (err, result) => {
        if (result) { // valid user
          let userInfo = {
            name: user.name,
            companyId: user.companyId
          };
          // make passport store userInfo (name and companyId) in req.user
          req.login(userInfo, (err) => {
            if (err) {
              console.log(err);
              res.sendStatus(404);
            } else {
              let response = {
                name: user.name,
                companyId: user.companyId,
                found: true
              }
              res.send(response);
            }
          });
        } else { // invalid user
          let response = {
            found: false
          };
          res.send(response);
        }
      });
    } else {
      res.send('no user');
    }
  });
});

// add a new category
app.post('/addCategory', (req, res) => {
  let name = req.body.categoryName;
  let description = req.body.categoryDescription;
  let companyId = req.user.companyId;
  db.addCategory({name, description, companyId}, (created) => {
    res.send(created);
  });
});

app.post('/updatecategory', (req, res) => {
  db.updateCategory(req.body, updated => {
    res.end(JSON.stringify(updated));
  })
});

app.post('/deletecategory', (req, res) => {
  db.deleteCategory(req.body, categories => {
    res.end(JSON.stringify(categories));
  })
})

// get all categories for a given company id
app.get('/:companyId/categoriesdata', (req, res) => {
  //enable CORS for this route
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  let companyId = req.params.companyId;
  db.fetchCategoriesByCompany(companyId, (categories) => {
    res.send(categories);
  })
});

// get all articles for a given company id and category id
app.get('/:companyId/categories/:categoryId/articlesdata', (req, res) => {
  //enable CORS for this route
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  let companyId = req.params.companyId;
  let categoryId = req.params.categoryId;
  db.fetchArticles({companyId, categoryId}, (articles) => {
    res.send(articles);
  });
});

// get all articles for a given company id
app.get('/:companyId/articlesdata', (req, res) => {
  //enable CORS for this route
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  let companyId = req.params.companyId;
  db.fetchCompanyArticles({companyId}, (articles) => {
    res.send(articles);
  });
});

app.post('/article', (req, res) => {
  let data = req.body;
  let companyId = req.session.passport.user.companyId;
  //update if exists
  if(req.body.id) {
    db.updateArticle(JSON.stringify(req.body), () => res.end(`${req.body.title} has been updated`));
  } else {
    db.addArticle(data.categoryId, data, companyId, (response) => {
      res.end(response)
    })
  }

});

app.get('/company', (req, res) => {
  let companyId = req.user.companyId;
  db.fetchCompanyData(companyId, (data) => {
    res.send(data[0].name);
  })
})

app.post('/deleteArticle', (req, res) => {
  db.deleteArticle(req.body.articleId, () => res.redirect('/home'));
})

//////////////////////////
//    API routes     //
//////////////////////////
app.get('/api/:companyId', (req, res) => {
  //enable CORS for this route
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  let companyId = req.params.companyId;
  db.fetchCompanyData(companyId, (data) => {
    res.send(data);
  });
});

app.get('/api/article/:articleId', (req, res) => {
  //enable CORS for this route
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  let articleId = req.params.articleId;
  db.fetchOneArticle(articleId, (data) => {
    res.send(data);
  });
});


// app.post('/loginuser', passport.authenticate('local'), (req, res) => {
//   console.log('user authenticated')
//   res.send(req.user);
// });


// to get name and companyId of logged in user
app.get('/user', (req, res) => {
  res.send(req.user);
});

app.get('/logout', (req, res) => {
  // req.logout is a function available from passport
  req.logout();
  // destroy session for the user that has been logged out
  req.session.destroy();
  // logout user
  res.send('logged out')
});

//////////////////////////
//    DB dev routes     //
//////////////////////////

// unprotect /devadminpage
app.get('/devadminpage', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

app.get('/db/testfill', (req, res) => {
  db.dummyData();
  res.end('Test data added to DB');
})

app.get('/db/clear', (req, res) => {
  db.clearTables();
  res.end('All tables cleared');
})

app.get('/db/rebuild', (req, res) => {
  db.recreateDB();
  res.end('DB is rebuilt')
})


// protect all routes except the ones above
app.get('*', authMiddleware(), (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

// TODO - protect all server routes except login, signup, logout, /user after we figure out how to authenticate user in external app and use that info in know-how app

app.listen(process.env.PORT !== undefined ? process.env.PORT : PORT, () => {
  console.log(`listening on port ${PORT}`);
});
