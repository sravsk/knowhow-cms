const client = require('../services/elasticsearch').client;
const fetchAllArticles = require('../db/helpers').fetchAllArticles;

// elasticsearch variables - index and type
const index = 'articles';
const type = 'documents';

const insertDataMySQLtoES = async () => {
  let results = await fetchAllArticles();
  console.log('results', results.length)
  // index data in batches of 5k
  let i = 0;
  let len = results.length;
  while (i <= len) {
    let articles = results.slice(i, i + 5000);
    // console.log('articles length', articles.length, i)
    let bulkBody = [];
    articles.forEach(item => {
      bulkBody.push({
        index: { _index: index, _type: type, _id: item.id }
      });
      bulkBody.push({ id: item.id, title: item.title, description: item.description, content: item.content, companyid: item.companyId, categoryid: item.categoryId });
    });
    try {
      await client.bulk({body: bulkBody});
      // console.log('5000 records done', i)
    } catch(err) {
      console.log(err);
    }
    i += 5000;
  }
};

insertDataMySQLtoES()

