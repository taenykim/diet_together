const express = require('express')
const db = require('../models')
const router = express.Router()
const { isLoggedIn } = require('./middleware')

// 모든 게시글 불러오기 // LOAD_MAIN_POSTS_REQUEST // api/posts?lastID=''&limit=''
router.get('/', async (req, res, next) => {
  try {
    let where = {}
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10) // less than
        }
      }
    }
    const posts = await db.Post.findAll({
      where,
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
        },
        {
          model: db.Comment,
          attributes: ['id']
        }
      ],
      order: [['createdAt', 'DESC']], // DESC는 내림차순, ASC는 오름차순
      limit: parseInt(req.query.limit, 10)
    })
    res.json(posts)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

// 남의 게시글 불러오기 // LOAD_USER_POSTS_REQUEST // api/posts/user/:id?lastID=''&limit=''
router.get('/user/:id/', async (req, res, next) => {
  try {
    console.log('잘왔니', req.query.lastId, req.query.limit, req.params.id)
    let where = {}
    if (parseInt(req.query.lastId, 10)) {
      where = {
        UserId: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0,
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10) // less than
        }
      }
    } else {
      where = { UserId: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0 }
    }
    const posts = await db.Post.findAll({
      where,
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
      ],
      order: [['createdAt', 'DESC']], // DESC는 내림차순, ASC는 오름차순
      limit: parseInt(req.query.limit, 10)
    })
    res.json(posts)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

// 좋아요 게시글 불러오기 // LOAD_LIKED_POSTS_REQUEST // api/posts/like?lastID=''&limit=''
router.get('/like/', isLoggedIn, async (req, res, next) => {
  try {
    let where = {}
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10) // less than
        }
      }
    }
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.User,
          through: 'Like',
          as: 'Likers',
          where: { id: req.user.id }
        },
        {
          model: db.User,
          attributes: ['id', 'nickname']
        },
        {
          model: db.Image
        },
        {
          model: db.Comment,
          attributes: ['id']
        }
      ],
      order: [['createdAt', 'DESC']], // DESC는 내림차순, ASC는 오름차순
      limit: parseInt(req.query.limit, 10)
    })
    res.json(posts)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

module.exports = router
//
