require('dotenv').config()
const { getDatabase } = require('../config')
const dbCollection = process.env.COLLECTION_NAME
const Movies = getDatabase().collection(dbCollection)
const { ObjectId } = require('mongodb')

class MoviesModel {
  static find() {
    return Movies.find().toArray()
  }

  static findById(id) {
    return Movies.findOne({ _id: ObjectId(id) })
  }

  static create(newMovie) {
    return Movies.insertOne(newMovie)
  }

  static findByIdAndUpdate(id, updateData) {
    return Movies.findOneAndUpdate(
      { _id: ObjectId(id) },
      {
        $set: {
          title: updateData.title,
          overview: updateData.overview,
          poster_path: updateData.poster_path,
          popularity: updateData.popularity,
          tags: updateData.tags
        }
      }
    )
  }

  static findByIdAndDelete(id) {
    return Movies.deleteOne({ _id: ObjectId(id) })
  }
}

module.exports = MoviesModel