require('dotenv').config()
const { getDatabase } = require('../config/mongo.js');
console.log("INI EROR", getDatabase())
const Movies = getDatabase().collection(process.env.COLLECTION_NAME);
const { ObjectId } = require('mongodb');

class MoviesModel {
  static find() {
    return Movies.find().toArray()
  }

  static findById(id) {
    return Movies.findOne({ _id: ObjectId(id) })
  }

  static create({newMovie}) {
    return Movies.insertOne(newMovie)
  }

  static findByIdAndUpdate(id, updateData) {
    return Movies.findOne(
      { _id: ObjectId(id) },
      {
        $set: updateData
      }
    )
  }

  static delete(id) {
    return Movies.deleteOne({ _id: ObjectId(id) })
  }
}

module.exports = MoviesModel