const express = require('express')
const db = require('../models')
const router = express.Router()

/**
 * 게시글 작성 *
 * server : /api/post/ (POST)
 * front : ADD_POST_REQUEST
 */
router.post('/', async (req, res, next) => {
  try {
    const newPost = await db.Post.create({
      content: req.body.content,
      UserId: req.user.id
    })
    const fullPost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [
        {
          model: db.User
        }
      ]
    })
    res.json(fullPost)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

router.post('/images', async (req, res, next) => {
  try {
  } catch (e) {
    console.error(e)
    next(e)
  }
})

module.exports = router
