exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next() //next는 에러를 넣어놓으면 에러처리를 하러 가고 그냥 next를 하면 다음 미들웨어로 간다.
  } else {
    res.status(401).send('로그인이 필요합니다.')
  }
}

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next()
  } else {
    res.status(401).send('로그인을 하지 않은 사용자만 접근 가능합니다.')
  }
}
