const fs = require('fs');

const Article = require('../db/Models/Article');
const Company = require('../db/Models/Company');
const Category = require('../db/Models/Category');
const associations = require('../db/associations');
associations();

const connection = require('../db');

const insertDataMySQL = () => {
  let queryString = 'LOAD DATA LOCAL INFILE "./articles.txt" INTO TABLE articles CHARACTER SET UTF8 FIELDS TERMINATED BY "," LINES TERMINATED BY "\n" (title, description, content, companyId, categoryId);'
  connection.query(queryString)
  .then(result => {
    console.log('result', result);
  })
  .catch(err => {
    console.log('error', err);
  });
};

insertDataMySQL();




