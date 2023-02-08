import { Request, Response } from 'express'
import { User } from '@/models'
import { MESSAGE } from '@/utils'

export const getSubscriptionsByUID = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const subscriptions = await User.find({ _id: req?.user.userId }, 'subscriptions')
    console.log(req?.user)
    res.send(subscriptions)
  } catch (e) {
    res.send({ message: MESSAGE.DEFAULT_ERROR })
  }
}

export const subscribe = async (req: Request, res: Response) => {
  try {
    await User.updateOne({ _id: req.body.userId }, { $push: { subscriptions: req.body.organizationId } })
    res.send({ message: MESSAGE.SUBSCRIBED })
  } catch (e) {
    res.send({ message: MESSAGE.DEFAULT_ERROR })
  }
}
