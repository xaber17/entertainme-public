const router = require('express').Router();
const moviesRoutes = require('./moviesRoutes');

router.use('/movie', moviesRoutes)

module.exports = router