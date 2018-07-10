const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/helpers.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const homePath = __dirname + '/../client/dist';
app.use(express.static(homePath));

app.listen(process.env.PORT !== undefined ? process.env.PORT : PORT, () => {
  console.log(`listening on port ${PORT}`);
});