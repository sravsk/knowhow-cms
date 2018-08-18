const client = require('../services/elasticsearch').client;
const fetchArticles = require('../db/helpers').fetchArticles;

// elasticsearch variables - index and type
const index = 'articles';
const type = 'documents';

// enter company and category ids for bulk transfer of data
const companyId = require('./fakeData').companyId;
const categoryId = require('./fakeData').categoryId;

// function to bulk insert data into elasticsearch cluster from articles table
const insertDataMySQLtoES = () => {
  fetchArticles({companyId: companyId, categoryId: categoryId}, results => {
    var articles = results.map(item => item.dataValues);
    let bulkBody = [];
    articles.forEach(item => {
      bulkBody.push({
        index: { _index: index, _type: type, _id: item.id }
      });
      bulkBody.push({ id: item.id, title: item.title, description: item.description, content: item.content, companyid: item.companyId, categoryid: item.categoryId });
    });
    client.bulk({body: bulkBody})
      .then(response => {
        console.log('response', response)
      })
  });
};

insertDataMySQLtoES()

