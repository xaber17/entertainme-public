const Movies = require('../models/movies');

class Controller {
  static find (req, res, next) {
    Movies.findAll()
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err);
      })
  };

  static findById ( req, res, next) {
    const { id } = req.params;
    Movies.findOne(id)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err)
      })
  }

  static add (req, res, next) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    Movies.create({
      title,
      overview,
      poster_path,
      popularity,
      tags
    })
      .then(result => {
        res.status(201).json(result);
      })
      .catch(err => {
        console.log(err);
      })
  };

  static update ( req, res, next) {
    const { id } = req.params;
    const { title, overview, poster_path, popularity, tags } = req.body;
    Movies.update(id, {
      title,
      overview,
      poster_path,
      popularity,
      tags
    })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
      })
  }

  static delete (req, res, next) {
    const { id } = req.params;
    let deleted;
    Movies.findOne({
      where: {
        id
      }
    })
      .then(result => {
        deleted = result;
        return Movies.destroy({
          where: {
            id
          }
        })
      })
      .then(result => {
        if (deleted) {
          res.status(200).json({
            msg: `Successfully delete ${id}`
          })
        } else {
          return next({
            code: 404,
            msg: 'Data not found'
          })
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
}

module.exports = Controller;