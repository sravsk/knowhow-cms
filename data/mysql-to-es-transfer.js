const client = require('../services/elasticsearch').client;
const connection = require('../db');

// elasticsearch variables - index and type
const index = 'articles';
const type = 'documents';

const insertDataMySQLtoES = async () => {
  let maxReturnedId = 0;
  connection.query('SELECT MAX(id) FROM articles')
  .then(async(result) => {
    let maxId = result[0][0]['MAX(id)'];
    while (maxReturnedId < maxId) {
      // transfer data from mysql articles table to elasticsearch index in batches
      let queryString = `SELECT id, title, content, description, categoryId, companyId FROM articles WHERE id > ${maxReturnedId} ORDER BY id ASC LIMIT 5000;`
      try {
        await connection.query(queryString)
        .then(async(response) => {
          let articles = response[0];
          let bulkBody = [];
          articles.forEach(item => {
            bulkBody.push({
              index: { _index: index, _type: type, _id: item.id }
            });
            bulkBody.push({ id: item.id, title: item.title, description: item.description, content: item.content, companyid: item.companyId, categoryid: item.categoryId });
          });
          try {
            await client.bulk({body: bulkBody});
            maxReturnedId += 5000;
            // console.log('5000 records done', maxReturnedId)
          } catch(err) {
            console.log('error saving records to elasticsearch', err);
          }
        })
      } catch(err) {
        console.log('error querying articles table', err);
      }
    }
  }).catch(err => {
    console.log('error reading max id', err);
  })
};

insertDataMySQLtoES()
