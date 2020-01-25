const express = require('express')

const db = require('./models')
const userAPIRouter = require('./routes/user')
const postAPIRouter = require('./routes/user')
const postsAPIRouter = require('./routes/user')

const app = express()
db.sequelize.sync()

app.use('/api/user', userAPIRouter)
app.use('/api/post', postAPIRouter)
app.use('/api/posts', postsAPIRouter)

app.listen(3065, () => {
  console.log('server is running on http://localhost:3065')
})
