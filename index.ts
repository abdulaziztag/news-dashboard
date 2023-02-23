import 'module-alias/register'
import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import passport from 'passport'
import { authRoutes, organizationRoutes, userRoutes } from '@/routes'
import * as path from 'path'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

const mongoUrl = `${process.env.MONGO_URL}`

mongoose.set('strictQuery', true)
mongoose.connect(mongoUrl, (error) => {
  if (error) throw error
  console.log('Connected To Mongo')
})
app.use(passport.initialize())
import '@/midllewares/passport'
// app.use(helmet())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))
app.use('/api/auth', authRoutes)
app.use('/api/organization', organizationRoutes)
app.use('/api/user', userRoutes)

app.get('/*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
