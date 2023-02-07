import express from 'express'
import { confirmEmail, SignIn, SignUp } from '@/controllers/authControllers'

const router = express.Router()

router.post('/signIn', SignIn)
router.post('/signUp', SignUp)
router.post('/confirm', confirmEmail)
export const authRoutes = router
