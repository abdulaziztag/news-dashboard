import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import 'module-alias/register'
import mongoose from 'mongoose'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

const mongoUrl = `${process.env.MONGO_URL}`

mongoose.set('strictQuery', true)
mongoose.connect(mongoUrl, (error) => {
  if (error) {
    console.log(error)
  } else {
    console.log('Mongo connected!')
  }
})

app.use(helmet)
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
