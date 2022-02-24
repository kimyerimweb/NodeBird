const express = require('express')
const multer = require('multer')
const path = require('path')

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
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
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
      PostId: parseInt(req.params.postId),
      UserId: req.user.id,
    })

    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          attributes: ['id', 'nickname'],
        },
      ],
    })

    return res.status(201).json(fullComment)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req, params, postId } })
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.')
    }

    await post.addLikers(req.user.id)
    res.json({ PostId: post.id, UserId: req.user.id })
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req, params, postId } })
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.')
    }

    await post.removeLikers(req.user.id)
    res.json({ PostId: post.id, UserId: req.user.id })
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.delete('/:postId', isLoggedIn, async (req, res) => {
  try {
    await Post.destroy({
      where: { id: req.params.postId, UserId: req.user.id },
    })
    res.json({ PostId: parseInt(req.params.postId) })
  } catch (err) {
    console.error(err)
    next(err)
  }
})

const upload = multer({
  storage: multer.diskStorage({
    //컴퓨터 디스크 백엔드 서버 돌아가는 컴퓨터
    destination(req, file, done) {
      done(null, 'uploads')
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname) //확장자 추출
      const basename = path.basename(file.originalname, ext) //이름만
      done(null, basename + new Date().getTime() + ext) //사진을 덮어써서 사라지는 것을 예방
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, //20MB 제한
})

router.post(
  '/images',
  isLoggedIn,
  upload.array('image'), //여러개의 이미지를 한방에 올라간다
  async (req, res, next) => {
    try {
      console.log(req.files)
      res.json(req.files.map((v) => v.filename))
    } catch (err) {
      console.error(err)
      next(err)
    }
  }
) //이미지와 컨텐츠를 한방에 보내면 편하겠지만,
//이미지를 업로드하면 그때 시점에 올리면서 미리보기, 리사이징을 하고 있고
//사람들은 content를 작성하고 있다. 게시글 업로드 시간이 단축된다.
//요청이 두번이라 왔다갔다라서 복잡하고 중도에 나간 경우에는 이미지가 남는다.
//원래도 게시글을 지워도 이미지는 남는다.

module.exports = router
