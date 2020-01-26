const express = require('express')
const db = require('../models')
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')

/**
 * 로그인유지(me) *
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
 * 유저정보(게시글) 가져오기(click) *
 * server : api/user/:id (GET)
 * front : LOAD_USER_POST_REQUEST
 */
router.get('/:id/', async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: { id: parseInt(req.params.id, 10) },
      include: [
        {
          model: db.Post,
          as: 'Posts',
          attributes: ['id']
        }
      ],
      attributes: ['id', 'nickname']
    })
    const jsonUser = user.toJSON()
    jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts.length : 0
    res.json(jsonUser)
  } catch (e) {
    console.error(e)
    next(e)
  }
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
 * server :  (GET)
 * front :
 */
router.get('/:id/posts', async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      where: {
        UserId: parseInt(req.params.id, 10)
      },
      include: [
        {
          model: db.User,
          attributes: ['id', 'nickname']
        },
        {
          model: db.Image
        },
        {
          model: db.User,
          through: 'Like',
          as: 'Likers',
          attributes: ['id']
        }
      ]
    })
    res.json(posts)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

module.exports = router
