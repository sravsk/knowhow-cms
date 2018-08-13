const esconfig = require('../config.js').ES;

// elasticsearch variables - index and type
const index = 'articles';
const type = 'documents';

const port = 9200;

// create an elasticsearch client for your Amazon ES
// let client = new require('elasticsearch').Client({
//   hosts: [esconfig.url],
//   connectionClass: require('http-aws-es'),
//   // log: 'trace'
// });

// let AWS = require('aws-sdk');
// AWS.config.update({
//   credentials: new AWS.Credentials(esconfig.accessKeyId, esconfig.secretAccessKey),
//   region: esconfig.region
// });

// create an instance of Elasticsearch client on localhost
var client = new require('elasticsearch').Client({
  host: `localhost:${port}`,
  apiVersion: '6.2',
  log: 'trace'
  // log: 'error'
});

client.ping({
  requestTimeout: 3000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

// if index doesn't exist, create it
const makeIndex = () => {
  client.indices.exists({
    index: index
  }).then(result => {
      if (!result) {
       client.indices.create({
        index: index
      }).then((err, response) => {
        console.log(err, response);
      })
    }
  });
};

makeIndex();

// search function for all articles with a given search term and companyId
const queryTerm = (term, companyId, offset, callback) => {
  const body = {
    // from allows us to paginate the results
    from: offset,
    query: {
      bool: {
        must: {
          'multi_match': {
            query: term,
            // 'and' operator is used to prioritize results that contain all of the tokens in the query
            operator: 'and',
            type: "most_fields",
            fields: ['title', 'description', 'content'],
            // fuzziness adjusts tolerance for spelling mistakes, higher fuzziness will allow for more corrections in result hits
            fuzziness: 'auto'
          }
        },
        filter: [{
          term: { companyid: companyId }
        }]
      }
    },
    size: 100
  };
  client.search({index, type, body})
    .then(response => {
      const results = response.hits.hits.map(item => item._source);
      callback(results);
    });
};

// delete an article from elasticsearch index
const deleteArticle = (articleId, callback) => {
  client.deleteByQuery({
    index: index,
    type: type,
    body: {
      query: {
        match: { id: articleId }
      }
    }
  }, function (error, response) {
      // console.log(error, response);
      callback(!error);
  });
};

// update an article in elasticsearch index
const updateArticle = (article, callback) => {
  var article = JSON.parse(article);
  var id = article.id;
  var title = article.title;
  var description = article.description;
  var content = article.content;
  var categoryid = article.categoryId;
  var theScript = {
    "source": `ctx._source.title = '${title}'; ctx._source.description = '${description}'; ctx._source.content = '${content}'; ctx._source.categoryid = ${categoryid};`
  }
  client.updateByQuery({
    index: index,
    type: type,
    body: {
      "query": { "term": { id: id } },
      "script": theScript
    }
  }, function(error, response) {
    // console.log('in update article', error, response);
    callback(!error);
  });
};

const addArticle = (article, callback) => {
  var article = JSON.parse(article);
  client.index({
    index: index,
    type: type,
    id: article.id,
    body: {
      id: article.id,
      title: article.title,
      description: article.description,
      content: article.content,
      categoryid: article.categoryId,
      companyid: article.companyId
    }
 }, function(error, response) {
    // console.log('in add article', error, response);
    callback(!error);
 });
};

module.exports = {
  client: client,
  queryTerm: queryTerm,
  deleteArticle: deleteArticle,
  updateArticle: updateArticle,
  addArticle: addArticle
};





// Client.apis[config.apiVersion].ping.spec.requestTimeout = customDefaultMs;

// console.log('client: ', client)

// var util = require('util');
// var HttpConnector = require('elasticsearch/src/lib/connectors/http');
// var customHttpAgent = require('agentkeepalive');
// var Logstash = require('logstash-client');

// function CustomESHTTPConnector(host, config) {
//     HttpConnector.call(this, host, config);
// }

// util.inherits(CustomESHTTPConnector, HttpConnector);

// CustomESHTTPConnector.prototype.createAgent = function (config) {
//     return new customHttpAgent(this.makeAgentConfig(config));
// };

// var logstash = new Logstash({
//   type: 'udp', // udp, tcp, memory
//   host: 'logstash.example.org',
//   port: 13333
// });
// logstash.send(message [, callback]);
