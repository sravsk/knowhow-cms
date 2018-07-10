const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../db/helpers.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

app.listen(process.env.PORT !== undefined ? process.env.PORT : PORT, () => {
  console.log(`listening on port ${PORT}`);
});