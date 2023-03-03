import express from 'express'
import { deleteReminder, getRemindersByUID, getSubscriptionsByUID, setReminder, subscribe, unSubscribe } from '../controllers/userControllers.js'
import passport from 'passport'

const router = express.Router()
const auth = passport.authenticate('jwt', { session: false })

router.get('/subscriptions', auth, getSubscriptionsByUID)
router.post('/subscribe', auth, subscribe)
router.post('/unsubscribe', auth, unSubscribe)
router.post('/reminder', auth, setReminder)
router.get('/reminder', auth, getRemindersByUID)
router.delete('/reminder', auth, deleteReminder)
export const userRoutes = router
