require('dotenv').config()
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = process.env.DATABASE_NAME;
let db;

function connect (callback) {
  client.connect(function(err) {
    if (err) {
      console.log(`Failed To Connect DB `, err);
    } else {
      console.log('Success Connect DB');
      db = db.client(dbName);
    }
    callback(err);
  })
}

function getDatabase () {
  return db;
}

module.exports = {
  connect, getDatabase
}