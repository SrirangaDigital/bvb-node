const Datastore = require('nedb');
const fs = require('fs');
const path = require('path');

var data = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data/razaMongoDB.json'), 'utf8'));

db = new Datastore({inMemoryOnly : true});
db.insert(data);

module.exports = db;