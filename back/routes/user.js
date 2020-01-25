const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('hello server')
})

router.post('/', (req, res) => {
  res.send('hello server')
})

router.get('/:id/', (req, res) => {
  res.send('hello server')
})

router.post('/logout/', (req, res) => {
  res.send('hello server')
})

router.post('/login/', (req, res) => {
  res.send('hello server')
})

router.post('/', (req, res) => {
  res.send('hello server')
})

module.exports = router
