const Movies = require('../models/movies');

class Controller {
  static find(req, res, next) {
    Movies.find()
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  };

  static findById(req, res, next) {
    Movies.findById(req.params.id)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(404).json(err)
      })
  }

  static add(req, res, next) {
    Movies.create(req.body)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(err => {
        res.status(400).json(err)
      })
  };

  static update(req, res, next) {
    Movies.findByIdAndUpdate(req.params.id, req.body)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }

  static delete(req, res, next) {
    Movies.findByIdAndDelete(req.params.id)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }
}

module.exports = Controller;