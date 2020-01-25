const express = require('express')
const morgan = require('morgan')
const db = require('./models')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const passport = require('passport')
const passportConfig = require('./passport')
const dotenv = require('dotenv')
const userAPIRouter = require('./routes/user')
const postAPIRouter = require('./routes/user')
const postsAPIRouter = require('./routes/user')

const app = express()
db.sequelize.sync()
dotenv.config()
passportConfig()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json()) //json 본문 처리
app.use(express.urlencoded({ extended: true })) //form 처리
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false //https 쓸 때 true
    }
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use('/api/user', userAPIRouter)
app.use('/api/post', postAPIRouter)
app.use('/api/posts', postsAPIRouter)

app.listen(3065, () => {
  console.log('server is running on http://localhost:3065')
})
