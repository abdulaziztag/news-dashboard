import { Request, Response } from 'express'
import { User } from '@/models'
import { MESSAGE } from '@/utils'

export const getSubscriptionsByUID = async (req: Request, res: Response) => {
  try {
    const subscriptions = await User.aggregate([
      {
        $match: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          _id: req.user._id,
        },
      },
      {
        $project: {
          _id: 0,
          subscriptions: 1,
        },
      },
      {
        $lookup: {
          from: 'organizations',
          localField: 'subscriptions',
          foreignField: '_id',
          as: 'subscriptionsInfo',
        },
      },
      {
        $project: {
          'subscriptionsInfo.name': 1,
          'subscriptionsInfo._id': 1,
        },
      },
    ])
    res.send(subscriptions[0])
  } catch (e) {
    res.status(500).send({ message: MESSAGE.DEFAULT_ERROR })
  }
}

export const subscribe = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userId = req.user._id
    const user = await User.findOne({ _id: userId }, 'subscriptions')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (user.subscriptions.includes(req.body.organizationId)) {
      res.send({ message: MESSAGE.ALREADY_SUB })
    } else {
      await User.updateOne({ _id: userId }, { $push: { subscriptions: req.body.organizationId } })
      res.send({ message: MESSAGE.SUBSCRIBED })
    }
  } catch (e) {
    res.status(500).send({ message: MESSAGE.DEFAULT_ERROR })
  }
}

export const unSubscribe = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userId = req.user._id
    await User.updateOne({ _id: userId }, { $pull: { subscriptions: req.body.organizationId } })
    res.send({ message: MESSAGE.UNSUBSCRIBED })
  } catch (e) {
    console.log(e)
    res.status(500).send({ message: MESSAGE.DEFAULT_ERROR })
  }
}
