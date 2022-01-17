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
const app = express()

passportConfig()

app.use(
  cors({
    origin: true, //모두 다 허용, 실제 서비스 시 주소를 바꿔야 함
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

app.listen(3065, () => {
  console.log('서버 실행 중')
})
