const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('hello server')
})

app.listen(3065, () => {
  console.log('server is running on http://localhost:3065')
})
