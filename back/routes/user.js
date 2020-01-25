const express = require('express')
const db = require('../models')
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')

/**
 * 로그인유지 *
 * server : /api/user/ (GET)
 * front : LOG_OUT_REQUEST
 */
router.get('/', (req, res) => {
  if (!req.user) {
    return res.status(401).send('로그인이 필요합니다')
  }
  const user = Object.assign({}, req.user.toJSON())
  delete user.password
  return res.json(user)
})

/**
 * 회원가입 *
 * server : /api/user/
 * front : SIGN_UP_REQUEST
 */
router.post('/', async (req, res, next) => {
  try {
    const exUser = await db.User.findOne({
      where: {
        userId: req.body.userId
      }
    })
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.')
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12)
    const newUser = await db.User.create({
      userId: req.body.userId,
      nickname: req.body.nickname,
      password: hashedPassword
    })
    console.log(newUser)
    return res.status(200).json(newUser)
  } catch (e) {
    console.error(e)
    //에러처리
    return next(e)
  }
})

/**
 *  *
 * server :  (GET)
 * front :
 */
router.get('/:id/', (req, res) => {
  res.send('hello server')
})

/**
 * 로그아웃 *
 * server : /api/user/logout
 * front : LOG_OUT_REQUEST
 */
router.post('/logout/', (req, res) => {
  req.logout()
  req.session.destroy()
  res.send('로그아웃 성공')
})

/**
 * 로그인 *
 * server : /api/user/logout
 * front : LOG_IN_REQUEST
 */
router.post('/login/', (req, res, next) => {
  console.log('여기')
  passport.authenticate('local', (err, user, info) => {
    console.log(err, user, info)
    if (err) {
      console.log(err)
      return next(err)
    }
    if (info) {
      return res.status(401).send(info.reason)
    }
    return req.login(user, async loginErr => {
      try {
        if (loginErr) {
          return next(loginErr)
        } // 거의 경우 없음
        const fullUser = await db.User.findOne({
          where: { id: user.id },
          include: [
            {
              model: db.Post,
              as: 'Posts',
              attributes: ['id']
            }
          ],
          attributes: ['id', 'nickname', 'userId']
        })
        console.log(fullUser)
        return res.json(fullUser)
      } catch (e) {
        next(e)
      }
    })
  })(req, res, next)
})

/**
 * *
 * server :  (POST)
 * front :
 */
router.post('/', (req, res) => {
  res.send('hello server')
})

module.exports = router
