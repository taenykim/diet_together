const express = require('express')
const morgan = require('morgan')
const db = require('./models')
const cors = require('cors')
const userAPIRouter = require('./routes/user')
const postAPIRouter = require('./routes/user')
const postsAPIRouter = require('./routes/user')

const app = express()
db.sequelize.sync()
app.use(morgan('dev'))
app.use(cors())

app.use(express.json()) //json 본문 처리
app.use(express.urlencoded({ extended: true })) //form 처리

app.use('/api/user', userAPIRouter)
app.use('/api/post', postAPIRouter)
app.use('/api/posts', postsAPIRouter)

app.listen(3065, () => {
  console.log('server is running on http://localhost:3065')
})
