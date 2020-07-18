const TV = require('../models/tv');

class TvController {
  static find(req, res, next) {
    TV.find()
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  };

  static findById(req, res, next) {
    TV.findById(req.params.id)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(404).json(err)
      })
  }

  static add(req, res, next) {
    TV.create(req.body)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(err => {
        res.status(400).json(err)
      })
  };

  static update(req, res, next) {
    TV.findByIdAndUpdate(req.params.id, req.body)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }

  static delete(req, res, next) {
    TV.findByIdAndDelete(req.params.id)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }
}

module.exports = TvController;