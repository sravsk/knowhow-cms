const Article = require('../db/Models/Article');
const Company = require('../db/Models/Company');
const Category = require('../db/Models/Category');
const associations = require('../db/associations');
associations();

const generateData = require('./fakeData').generateData
const companyId = require('./fakeData').companyId;
const categoryId = require('./fakeData').categoryId;

// console.log('CURRENT DATE', new Date().toLocaleString())

const data = generateData(100000)

// function to insert data into mysql articles table
const insertDataMySQL = async (data) => {
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    let company = await Company.findOne({ where: { id: companyId } });
    let category = await Category.findOne({ where: {id: categoryId } })
    let articleItem = await Article.create({
      title: item.title,
      description: item.description,
      content: item.content,
    });
    await articleItem.setCategory(category);
    await articleItem.setCompany(company);
  }
  // console.log('DATE LATER', new Date().toLocaleString())
};

insertDataMySQL(data)
