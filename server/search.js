var elasticsearch = require('elasticsearch');
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

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  // connectionClass: CustomESHTTPConnector,
  // keepAlive: true,
  log: 'trace'
});

// Client.apis[config.apiVersion].ping.spec.requestTimeout = customDefaultMs;

// console.log('client: ', client)

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

    const { count } = await client.count();
    console.log('====== count ======')
    console.log(count)


// var logstash = new Logstash({
//   type: 'udp', // udp, tcp, memory
//   host: 'logstash.example.org',
//   port: 13333
// });
// logstash.send(message [, callback]);
