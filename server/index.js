const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('../db/helpers.js');

const app = express();
const PORT = 3000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

app.post('/signupuser', (req, res) => {
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
          res.send('user created');
        } else {
          res.send('user already exists for this company');
        }
      });
    }
  });

});

app.listen(process.env.PORT !== undefined ? process.env.PORT : PORT, () => {
  console.log(`listening on port ${PORT}`);
});