// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("EntertainMe");
//   dbo.collection("Movies").findOne({}, function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });
require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const mongo = require('./config')
// const cors = require('cors')

mongo.connect(function(err){
    if(!err){
        app.use(express.json())
        app.use(express.urlencoded({extended: false}))
        app.use('/', require("./routes"))

        app.listen(PORT, function(){
            console.log('Server running on', PORT)
        })
    }
})