import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { User } from '@/models/index.js'
import passport from 'passport'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await User.findById(payload.userId).select('email firstName lastName role _id')
      return done(null, user || false)
    } catch (err) {
      return done(err, false)
    }
  }),
)
