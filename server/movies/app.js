require('dotenv').config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const mongo = require('./config/mongo.js')
const router = require('./routes/index')

mongo.connect(function (err) {
  if (!err) {
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use("/", router)

    app.listen(PORT, function () {
      console.log("Server running on PORT ", PORT )
    })
  }
})