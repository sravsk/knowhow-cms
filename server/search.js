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
  requestTimeout: 1000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

// search function for all articles with a given search term and companyId
const queryTerm = (term, companyId, offset, callback) => {
  const body = {
    // from allows us to paginate the results
    from: offset,
    query: {
      match: {
        content: {
          query: term,
          // 'and' operator is used to prioritize results that contain all of the tokens in the query
          operator: 'and',
          // fuzziness adjusts tolerance for spelling mistakes, higher fuzziness will allow for more corrections in result hits
          fuzziness: 'auto'
        }
      }
    },
    size: 10000
  };
  client.search({index, type, body})
    .then(results => {
      callback(results.hits);
    });
};

module.exports = queryTerm;





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
