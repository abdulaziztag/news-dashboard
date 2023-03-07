import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import passport from 'passport'
import { authRoutes, organizationRoutes, userRoutes, chatRoutes } from './src/routes/index.js'
import schedule from 'node-schedule'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { cronExpression, handleSchedule } from './src/utils/scheduler.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()

const app: Express = express()
const port = process.env.PORT

const mongoUrl = `${process.env.MONGO_URL}`

mongoose.set('strictQuery', true)
mongoose.connect(mongoUrl, (error) => {
  if (error) throw error
  console.log('Connected To Mongo')
})

// Scheduler
schedule.scheduleJob(cronExpression, handleSchedule)

// Middlewares
app.use(passport.initialize())
import './src/midllewares/passport.js'
// app.use(helmet())
app.use(morgan('tiny'))
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'https://rella.ai', 'https://rella.herokuapp.com'],
  }),
)
app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/organization', organizationRoutes)
app.use('/api/user', userRoutes)
app.use('/api', chatRoutes)

app.get('/*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
