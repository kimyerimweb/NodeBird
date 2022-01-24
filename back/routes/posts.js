const express = require('express')

const { Post, Image, Comment } = require('../models')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      where: { id: lastId },
      limit: 10, //10개만 가져오기 또 요청하면 그 다음
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ], //댓글도 정렬한다. 여기서 한다
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
            },
          ],
        },
      ],
    })
    res.status.json(posts)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

module.exports = router
