const express = require('express')

const { Post, Comment, Image, User } = require('../models')
const { isLoggedIn } = require('./middlewares')

const router = express.Router()
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    })

    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
        },
        {
          model: User,
        },
      ],
    })

    return res.status(201).json(fullPost)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    //철저하게 게시글이 존재하는지 검사해야함
    const post = await Post.findOne({
      where: { id: req.params.postId },
    })

    if (!post) {
      return res.status(403).send('존재하지 않는 게시글 입니다.')
    }

    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id,
    })

    return res.status(201).json(comment)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.delete('/', (req, res) => {
  res.json({ id: 1 })
})

module.exports = router
