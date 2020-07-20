const router = require('express').Router();
const moviesRoutes = require('./moviesRoutes');
const tvseriesRoutes = require('./tvseriesRoutes')

router.use('/movie', moviesRoutes)
router.use('/tv', tvseriesRoutes)

module.exports = router