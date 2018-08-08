var elasticsearch = require('elasticsearch');

// elasticsearch variables - index and type values are from logstash.conf
const index = 'articles';
const type = 'documents';

const port = 9200;
const host = process.env.ES_host || 'localhost';

// create an instance of Elasticsearch client
var client = new elasticsearch.Client({
  host: {host, port},
  apiVersion: '6.3',
  // connectionClass: CustomESHTTPConnector,
  // keepAlive: true,
  // log: 'trace'
  log: 'error'
});

client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 3000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

// const { count } = await client.count();
// console.log('====== count ======', count)

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
          term: {
            companyid: companyId
          }
        }]
      }
    },
    size: 10000
  };
  client.search({index, type, body})
    .then(results => {
      callback(results.hits);
    });
};

// delete an article from elasticsearch index
const deleteArticle = (articleId) => {
  client.deleteByQuery({
    index: index,
    type: type,
    body: {
      query: {
        match: { id: articleId }
      }
    }
  }, function (error, response) {
      // console.log(err, response);
  });
};

// update an article in elasticsearch index
const updateArticle = (article) => {
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
  }, function(err, res) {
    // console.log('in update article', err, res);
  });
};

const addArticle = (article) => {
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
 }, function(err, resp, status) {
    // console.log('in add article', err, resp);
 });
};

module.exports = {
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
