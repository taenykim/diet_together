const passport = require('passport')
const db = require('../models')
const local = require('./local')

module.exports = () => {
  // 서버쪽에 [{id:3, cookie:'asdf'}] 이런식으로 저장
  // 프론트와 쿠키를 주고받음
  passport.serializeUser((user, done) => {
    return done(null, user.id)
  })
  // DB와 id를 주고받아 정보를 해독
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.User.findOne({
        where: { id },
        include: [
          {
            model: db.Post,
            as: 'Posts',
            attributes: ['id']
          },
          {
            model: db.User,
            as: 'Followings',
            attributes: ['id']
          },
          {
            model: db.User,
            as: 'Followers',
            attributes: ['id']
          },
          {
            model: db.Weight,
            as: 'Weights'
          }
        ]
      })
      return done(null, user) // req.user
    } catch (e) {
      console.error(e)
      return done(e)
    }
  })
  local()
}
