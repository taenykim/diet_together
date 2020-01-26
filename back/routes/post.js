const express = require('express')
const db = require('../models')
const router = express.Router()
const { isLoggedIn } = require('./middleware')

/**
 * 게시글 작성 *
 * server : /api/post/ (POST)
 * front : ADD_POST_REQUEST
 */
router.post('/', isLoggedIn, async (req, res, next) => {
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

router.get('/:id/comments', async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } })
    if (!post) {
      return res.status(404).send('포스트가 존재하지 않습니다.')
    }
    const comments = await db.Comment.findAll({
      where: {
        PostId: req.params.id
      },
      order: [['createdAt', 'ASC']],
      include: [
        {
          model: db.User,
          attributes: ['id', 'nickname']
        }
      ]
    })
    res.json(comments)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

router.post('/:id/comment', isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } })
    if (!post) {
      return res.status(404).send('포스트가 존재하지 않습니다.')
    }
    const newComment = await db.Comment.create({
      PostId: post.id,
      UserId: req.user.id,
      content: req.body.content
    })
    await post.addComment(newComment.id)
    const comment = await db.Comment.findOne({
      where: {
        id: newComment.id
      },
      include: [
        {
          model: db.User,
          attributes: ['id', 'nickname']
        }
      ]
    })
    return res.json(comment)
  } catch (e) {
    console.error(e)
    return next(e)
  }
})

module.exports = router
