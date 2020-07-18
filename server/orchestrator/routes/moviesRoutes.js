const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();
const router = require('express').Router()

router.get('/', async (req, res) => {
  const movies = await redis.get('movies')
  if (movies) {
    res.status(200).json(JSON.parse(movies))
  }
  else {
    axios.get('http://localhost:3001/movie')
      .then(response => {
        res.status(200).json(response.data)
        redis.set('movies', JSON.stringify(response.data))
      })
      .catch(err => {
        console.log(err)
      })
  }
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  axios.get(`http://localhost:3001/movie/${id}`)
    .then(response => {
      res.status(200).json(response.data)
    })
    .catch(err => {
      console.log(err)
    })
})

router.post('/', (req, res) => {
  const newMovies = req.body
  axios.post('http://localhost:3001/movie', newMovies)
    .then(response => {
      res.status(201).json(response.data)
    })
    .catch(err => {
      console.log(err)
    })
})

router.put('/:id', (req, res) => {
  const updateMovies = req.body
  const id = req.params.id
  axios.put(`http://localhost:3001/movie/${id}`, updateMovies)
    .then(response => {
      res.status(200).json(response.data)
    })
    .catch(err => {
      console.log(err)
    })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  axios.delete(`http://localhost:3001/movie/${id}`)
    .then(response => {
      res.status(200).json(response.data)
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = router