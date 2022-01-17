const express = require('express')
const db = require('./models')
const cors = require('cors')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const dotenv = require('dotenv')

const passportConfig = require('./passport')
dotenv.config()

const app = express()

db.sequelize
  .sync()
  .then(() => {
    console.log('DB 연결 성공')
  })
  .catch(console.error)

const userRouter = require('./routes/user')
const postRouter = require('./routes/post')
const app = express()

passportConfig()

app.use(
  cors({
    origin: 'http://localhost:3060',
    credentials: true, //이제 브라우저에 쿠키 전달
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use('/user', userRouter)
app.use('/post', postRouter)

app.listen(3065, () => {
  console.log('서버 실행 중')
})
