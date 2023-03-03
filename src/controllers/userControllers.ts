import { Request, Response } from 'express'
import { User, Reminder } from '../models/index.js'
import { MESSAGE } from '../utils/index.js'
import { IReminder } from '../interfaces/index.js'

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
    if (user && user.subscriptions.includes(req.body.organizationId)) {
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
    res.status(500).send({ message: MESSAGE.DEFAULT_ERROR })
  }
}

export const setReminder = async (req: Request<object, object, IReminder>, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const reminder = new Reminder({ email: req.user.email, ...req.body })
    await reminder.save()
    res.send({ message: MESSAGE.REMINDER_SUCCESS })
  } catch (e) {
    res.status(500).send({ message: MESSAGE.DEFAULT_ERROR })
  }
}

export const getRemindersByUID = async (req: Request, res: Response) => {
  try {
    const reminders = await Reminder.aggregate([
      {
        $match: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          email: req.user.email,
        },
      },
      {
        $lookup: {
          from: 'organizations',
          localField: 'organizationId',
          foreignField: '_id',
          as: 'organizationInfo',
        },
      },
      {
        $project: {
          organizationInfo: {
            name: 1,
          },
          expiresDate: 1,
          organizationId: 1,
          notes: 1,
          repeatValue: 1,
        },
      },
    ])
    res.send(reminders)
  } catch (e) {
    res.status(500).send({ message: MESSAGE.DEFAULT_ERROR })
  }
}

export const deleteReminder = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const isDeleted = await Reminder.deleteOne({ _id: req.body.reminderId, email: req.user.email })
    res.send({ message: isDeleted.deletedCount ? MESSAGE.DELETED_SUCCESSFULLY : MESSAGE.ORGANIZATION_NOT_FOUND })
  } catch (e) {
    res.status(500).send({ message: MESSAGE.DEFAULT_ERROR })
  }
}
