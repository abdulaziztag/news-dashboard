import express from 'express'
import { addAdmin, confirmEmail, SignIn, SignUp } from '@/controllers/authControllers'
import passport from 'passport'

const router = express.Router()
const auth = passport.authenticate('jwt', { session: false })

router.post('/signIn', SignIn)
router.post('/signUp', SignUp)
router.post('/confirm', confirmEmail)
router.post('/addAdmin', auth, addAdmin)
export const authRoutes = router
