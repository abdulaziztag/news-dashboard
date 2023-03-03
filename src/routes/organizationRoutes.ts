import express from 'express'
import { getAll, addOrganization, getOrganizationSources, searchFromOrganizations } from '../controllers/organizationControllers.js'
import passport from 'passport'

const router = express.Router()
const auth = passport.authenticate('jwt', { session: false })

router.get('/all', auth, getAll)
router.post('/add', auth, addOrganization)
router.post('/get', auth, getOrganizationSources)
router.post('/search', auth, searchFromOrganizations)
export const organizationRoutes = router
