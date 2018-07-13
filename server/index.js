const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../db/helpers.js');
const sessionStore = require('./../db/models/session.js');

const app = express();
const PORT = 3000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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
passport.serializeUser(function(name, done) {
  done(null, name);
});

passport.deserializeUser(function(name, done) {
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

app.post('/signupuser', (req, res) => {
  // TODO - validate email, password
  let password = req.body.password;
  // hash the password by auto-gen a salt and hash
  bcrypt.hash(password, saltRounds, function(err, hash) {
    // store hash in database
    if (hash) {
      db.addUser({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        company: req.body.company,
        domain: req.body.domain
      }, function(isUserCreated, userInfo, error) {
        if (error) {
          res.send('duplicate email');
        } else if (isUserCreated) {
          // login comes from passport and creates a session and a cookie for the user
          // make passport store userInfo in req.user
          req.login(userInfo, function(err) {
            if (err) {
              console.log(err);
              res.sendStatus(404);
            } else {
              res.send(userInfo);
            }
          });
        } else {
          res.send('user exists');
        }
      });
    }
  });
});

// TODO - loginuser using passport local strategy
app.post('/loginuser', (req, res) => {
  db.findUser({
    email: req.body.email
  }, function(user) {
    if (user !== null) {
      let hash = user.password;
      let comparePassword = req.body.password;
      let name = user.name;
      bcrypt.compare(comparePassword, hash, function(err, result) {
        // console.log('result of hash compare', hash, comparePassword, result, err)
        // login comes from passport and creates a session and a cookie for the user
        // make passport store userInfo in req.user
        let userInfo = {
          name: user.name,
          companyId: user.companyId
        };
        req.login(userInfo, function(err) {
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
      });
    } else {
      res.send('no user');
    }
  });
});

// get all categories for a given company id
app.get('/:companyId/categoriesdata', (req, res) => {
  let companyId = req.params.companyId;
  db.fetchCategoriesByCompany(companyId, function(categories) {
    res.send(categories);
  })
});

// get all articles for a given company id and category id
app.get('/:companyId/categories/:categoryId/articlesdata', (req, res) => {
  let companyId = req.params.companyId;
  let categoryId = req.params.categoryId;
  db.fetchArticles({companyId, categoryId}, function(articles) {
    res.send(articles);
  });
});

// app.post('/loginuser', passport.authenticate('local'), (req, res) => {
//   console.log('user authenticated')
//   res.send(req.user);
// });

// if user is authenticated, redirect to dashboard if they try accessing signup/login pages
app.get('/signup', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/dashboard');
  } else {
    res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
  }
});

app.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
    res.redirect('/dashboard');
  } else {
    res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
  }
});

// to get name and companyId of logged in user
app.get('/user', (req, res) => {
  res.send(req.user);
});

app.get('/logout', function(req, res) {
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

app.get('/db/testfill', (req, res) => {
  db.dummyData();
  res.end('Test data added to DB');
})

app.get('/db/clear', (req, res) => {
  db.clearTables();
  res.end('All tables cleared');
})

app.get('/db/drop', (req, res) => {
  db.dropTables();
  res.end('All tables dropped. Rebuild DB or refresh server to continue');
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
