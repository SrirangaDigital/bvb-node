const Datastore = require('nedb');

db = new Datastore({ filename: './data/bvbMongoDB.json', autoload: true });

module.exports = db;
