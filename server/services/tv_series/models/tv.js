require('dotenv').config()
const { getDatabase } = require('../config')
const dbCollection = process.env.COLLECTION_NAME
const Tv = getDatabase().collection(dbCollection)
const { ObjectId } = require('mongodb')

class TvModel {
  static find() {
    return Tv.find().toArray()
  }

  static findById(id) {
    return Tv.findOne({ _id: ObjectId(id) })
  }

  static create(newMovie) {
    return Tv.insertOne(newMovie)
  }

  static findByIdAndUpdate(id, updateData) {
    return Tv.findOneAndUpdate(
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
    return Tv.deleteOne({ _id: ObjectId(id) })
  }
}

module.exports = TvModel