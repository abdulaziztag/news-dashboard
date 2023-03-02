import express from 'express'
import { addAdmin, checkAuth, confirmEmail, SignIn, SignUp } from '@/controllers/authControllers.js'
import passport from 'passport'

const router = express.Router()
const auth = passport.authenticate('jwt', { session: false })

router.post('/signIn', SignIn)
router.post('/signUp', SignUp)
router.post('/confirm', confirmEmail)
router.post('/addAdmin', auth, addAdmin)
router.get('/check', auth, checkAuth)
export const authRoutes = router
