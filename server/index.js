const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
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

// authenticate user with an email and password stored in the database (using Passport local strategy)
passport.use(new LocalStrategy(
  function(email, password, done) {
    db.authenticateUser(email, password, function(matched) {
      if (matched) {
        return done(null, email)
      } else {
        return done(null, false)
      }
    })
  }
));

// Passport will maintain persistent login sessions. In order for persistent sessions to work, the authenticated user must be serialized to the session, and deserialized when subsequent requests are made.
passport.serializeUser(function(email, done) {
  done(null, email);
});

passport.deserializeUser(function(email, done) {
  done(null, email);
});

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
      }, function(userCreated, error) {
        if (error) {
          res.send('duplicate email');
        } else if (userCreated) {
          // login comes from passport and creates a session and a cookie for the user
          // make passport store req.body.name in req.user
          req.login(req.body.name, function(err) {
            if (err) {
              console.log(err);
              res.sendStatus(404);
            } else {
              res.send('user created');
            }
          });
        } else {
          res.send('user already exists for this company');
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
      bcrypt.compare(req.body.password, hash, function(err, result) {
        let data = {
          found: result,
          name: user.name
        }
        res.send(data);
      });
    } else {
      res.send('no user');
    }
  });
});

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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

app.listen(process.env.PORT !== undefined ? process.env.PORT : PORT, () => {
  console.log(`listening on port ${PORT}`);
});