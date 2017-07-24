const elasticlunr = require('elasticlunr');
const fs = require('fs');
const path = require('path');

var indexData = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/index/searchIndex045.json'), 'utf8'));
var searchIndex = elasticlunr.Index.load(indexData)

module.exports = searchIndex;
