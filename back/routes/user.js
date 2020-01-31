const express = require('express')
const db = require('../models')
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')
const { isLoggedIn } = require('./middleware')

/**
 * 로그인유지(me) *
 * server : /api/user/ (GET)
 * front : LOG_OUT_REQUEST
 */
router.get('/', isLoggedIn, (req, res) => {
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
    // console.log(newUser)
    return res.status(200).json(newUser)
  } catch (e) {
    console.error(e)
    //에러처리
    return next(e)
  }
})

router.post('/weight', isLoggedIn, async (req, res, next) => {
  try {
    const weight_info = await db.Weight.create({
      weight: req.body.weight,
      UserId: req.user.id
    })
    return res.json(weight_info)
    console.log('wwwwwwww', req.user)
  } catch (e) {
    console.error(e)
    return next(e)
  }
})

/**
 * 유저정보(게시글) 가져오기(click) *
 * server : api/user/:id (GET)
 * front : LOAD_USER_POST_REQUEST
 */
router.get('/:id', async (req, res, next) => {
  // 남의 정보 가져오는 것 ex) /api/user/123
  try {
    const user = await db.User.findOne({
      where: { id: parseInt(req.params.id, 10) },
      include: [
        {
          model: db.Post,
          as: 'Posts',
          attributes: ['id']
        },
        {
          model: db.User,
          as: 'Followings',
          attributes: ['id']
        },
        {
          model: db.User,
          as: 'Followers',
          attributes: ['id']
        }
      ],
      attributes: ['id', 'nickname']
    })
    const jsonUser = user.toJSON()
    jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts.length : 0
    jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings.length : 0
    jsonUser.Followers = jsonUser.Followers ? jsonUser.Followers.length : 0
    res.json(jsonUser)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

// 로그아웃 // LOG_OUT_REQUEST // api/user/logout
router.post('/logout/', (req, res) => {
  req.logout()
  req.session.destroy()
  res.send('로그아웃 성공')
})

// 로그인 // LOG_IN_REQUEST // api/user/login
router.post('/login/', (req, res, next) => {
  // console.log('reqinfo', req)
  passport.authenticate('local', (err, user, info) => {
    // console.log(err, user, info)
    if (err) {
      console.error(err)
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
            },
            {
              model: db.User,
              as: 'Followings',
              attributes: ['id']
            },
            {
              model: db.User,
              as: 'Followers',
              attributes: ['id']
            },
            {
              model: db.Weight,
              as: 'Weights',
              attrigutes: ['weight']
            }
          ],
          attributes: ['id', 'nickname', 'userId']
        })
        // console.log('fulluserinfo', fullUser.toJSON())
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

router.get('/:id/followings', isLoggedIn, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: { id: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0 }
    })
    const followers = await user.getFollowings({
      attributes: ['id', 'nickname'],
      limit: parseInt(req.query.limit, 10),
      offset: parseInt(req.query.offset, 10)
    })
    res.json(followers)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

router.get('/:id/followers', isLoggedIn, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: { id: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0 }
    })
    const followers = await user.getFollowers({
      attributes: ['id', 'nickname'],
      limit: parseInt(req.query.limit, 10),
      offset: parseInt(req.query.offset, 10)
    })
    res.json(followers)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

router.delete('/:id/follower', isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: { id: req.user.id }
    })
    await me.removeFollower(req.params.id)
    res.send(req.params.id)
  } catch (e) {
    console.error(e)
    next(e)
  }
})
// 팔로우 // FOLLOW_USER_REQUEST // api/user/:id/follow
router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: { id: req.user.id }
    })
    await me.addFollowing(req.params.id)
    res.send(req.params.id)
  } catch (e) {
    console.error(e)
    next(e)
  }
})
// 언팔로우 // UNFOLLOW_USER_REQUEST // api/user/:id/follow
router.delete('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: { id: req.user.id }
    })
    await me.removeFollowing(req.params.id)
    res.send(req.params.id)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

router.get('/:id/posts', async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      where: {
        UserId: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0
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
// 닉네임 수정 // EDIT_NICKNAME_REQUEST // api/user/nickname
router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    await db.User.update(
      {
        nickname: req.body.nickname
      },
      {
        where: { id: req.user.id }
      }
    )
    res.send(req.body.nickname)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

router.delete('/weight/:id', isLoggedIn, async (req, res, next) => {
  try {
    const deletedWeight = await db.Weight.findOne({ where: { id: req.params.id } })
    if (!deletedWeight) {
      return res.status(404).send('포스트가 존재하지 않습니다.')
    }
    await db.Weight.destroy({ where: { id: req.params.id } })
    res.send(req.params.id)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

module.exports = router
