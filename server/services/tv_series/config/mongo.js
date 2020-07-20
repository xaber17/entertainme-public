require('dotenv').config()
const { MongoClient } = require('mongodb')
const dbUrl = "mongodb://localhost:27017"
const client = new MongoClient(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
const dbName = process.env.DATABASE_NAME

function connect(callback) {
  client.connect(function (err) {
    if (err) {
      console.log('Failed To Connect DB', err)
    }
    else {
      console.log('Success Connect DB', dbName)
      db = client.db(dbName)
    }
    callback(err)
  })
}
function getDatabase() {
  return db
}
module.exports = {
  connect, getDatabase
}
