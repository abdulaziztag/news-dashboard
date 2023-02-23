import express from 'express'
import { getSubscriptionsByUID, subscribe, unSubscribe } from '@/controllers/userControllers'
import passport from 'passport'

const router = express.Router()
const auth = passport.authenticate('jwt', { session: false })

router.get('/subscriptions', auth, getSubscriptionsByUID)
router.post('/subscribe', auth, subscribe)
router.post('/unsubscribe', auth, unSubscribe)
export const userRoutes = router
