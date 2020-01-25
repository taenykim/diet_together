const express = require('express')
const db = require('../models')
const router = express.Router()

/**
 * 게시글 불러오기(HOME) *
 * server : /api/posts/ (GET)
 * front : LOAD_MAIN_POSTS_REQUEST
 */
router.get('/', async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.User,
          attributes: ['id', 'nickname']
        }
      ],
      order: [['createdAt', 'DESC']] // DESC는 내림차순, ASC는 오름차순
    })
    res.json(posts)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

module.exports = router
