const elasticSearch = require('elasticsearch');
const config = require('config');

const elasticClient = new elasticSearch.Client({
   host: config.elasticSearch.url + "" + config.elasticSearch.poart
})

module.exports = elasticClient;