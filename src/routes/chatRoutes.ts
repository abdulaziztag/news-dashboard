import { askFromGPT } from '@/controllers/chatControllers.js'
import express from 'express'
import passport from 'passport'

const router = express.Router()
const auth = passport.authenticate('jwt', { session: false })

router.post('/generate', auth, askFromGPT)

export const chatRoutes = router
