const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();
const router = require('express').Router()

router.get('/', async (req, res) => {
  const tvSeries = await redis.get('tvSeries')
  if (tvSeries) {
    res.status(200).json(JSON.parse(tvSeries))
  }
  else {
    axios.get('http://localhost:3002/tv')
      .then(response => {
        res.status(200).json(response.data)
        redis.set('tvSeries', JSON.stringify(response.data))
      })
      .catch(err => {
        console.log(err)
      })
  }
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  axios.get(`http://localhost:3002/tv/${id}`)
    .then(response => {
      res.status(200).json(response.data)
    })
    .catch(err => {
      console.log(err)
    })
})

router.post('/', (req, res) => {
  const newtvSeries = req.body
  axios.post('http://localhost:3002/tv', newtvSeries)
    .then(response => {
      res.status(201).json(response.data)
      redis.del('tvSeries')
    })
    .catch(err => {
      console.log(err)
    })
})

router.put('/:id', (req, res) => {
  const updatetvSeries = req.body
  const id = req.params.id
  axios.put(`http://localhost:3002/tv/${id}`, updatetvSeries)
    .then(response => {
      res.status(200).json(response.data)
      redis.del('tvSeries')
    })
    .catch(err => {
      console.log(err)
    })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  axios.delete(`http://localhost:3002/tv/${id}`)
    .then(response => {
      res.status(200).json(response.data)
      redis.del('tvSeries')
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = router