import { Request, Response } from 'express'
import { HTTP_STATUS, MESSAGE } from '../utils/index.js'
import { ChatGPTAPI } from 'chatgpt'

export const askFromGPT = async (req: Request, res: Response) => {
  try {
    const api = new ChatGPTAPI({
      apiKey: process.env.OPENAI_API_KEY || '',
    })

    const resFromAI = await api.sendMessage(req.body.message)

    res.send({ message: resFromAI.text })
  } catch (e) {
    res.send({ message: MESSAGE.DEFAULT_ERROR }).status(HTTP_STATUS.HTTP_STATUS_INTERNAL_SERVER_ERROR)
  }
}
