const express = require('express')
const db = require('../models')
const router = express.Router()

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

// 남의 게시글 불러오기 // LOAD_USER_POSTS_REQUEST // api/posts/user/:id
router.get('/user/:id', async (req, res, next) => {
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

// 좋아요 게시글 불러오기 // LOAD_LIKED_POSTS_REQUEST // api/posts/like?lastID=''&limit=''
router.get('/like/', async (req, res, next) => {
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
          attributes: ['id'],
          where: {
            UserId: req.user.id
          }
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
