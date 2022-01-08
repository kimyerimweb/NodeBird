const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')

const { User, Post } = require('../models')
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')

const router = express.Router()

router.post('/logout', isLoggedIn, (req, res, next) => {
  req.logout()
  req.session.destroy()
  res.status(200).send('ok')
})

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (serverError, user, clientError) => {
    if (serverError) {
      console.error(serverError)
      return next(serverError)
    }

    if (clientError) {
      return res.status(401).send(clientError.reason)
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr)
        return next(loginErr)
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password'], //비밀번호만 빼고 가져오겠다
        },
        include: [
          {
            model: Post,
          },
          {
            model: User,
            as: 'Followings',
          },
          {
            model: User,
            as: 'Followers',
          },
        ],
      })
      return res.status(200).json(fullUserWithoutPassword)
    })
  })(req, res, next) //미들웨어 확장 익스프레스의 기법임
}) // /user/login

router.post('/', isNotLoggedIn, async (req, res, next) => {
  //   /user
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email, //이메일 중복 체크
      },
    })
    if (exUser) {
      return res.status(403).send('이미 사용 중인 아이디입니다.')
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    })
    res.status(201).send('ok')
  } catch (e) {
    console.error(e)
    next(e) //next를 통해서 에러를 한방에 처리함 status 500
  }
})

module.exports = router
