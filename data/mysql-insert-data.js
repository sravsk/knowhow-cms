const Article = require('../db/Models/Article');
const Company = require('../db/Models/Company');
const Category = require('../db/Models/Category');
const associations = require('../db/associations');
associations();

const generateData = require('./fakeData').generateData
const companyId = require('./fakeData').companyId;
const categoryId = require('./fakeData').categoryId;

// console.log('DATE', new Date().toLocaleString())
const data = generateData(100000)
// console.log('DATE', new Date().toLocaleString(), data.length)

// function to bulk insert data into mysql articles table
const insertDataMySQL = (data) => {
  Article.bulkCreate(data)
    .then(result => {
      // console.log(result);
      console.log(`${data.length} records created`);
    })
};

insertDataMySQL(data)
