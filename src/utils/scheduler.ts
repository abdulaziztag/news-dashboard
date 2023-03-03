import { Organization, Reminder } from '../models/index.js'
import { getNewsFromBing } from '../helpers/index.js'
import { sendScheduledReminders } from '../controllers/mailControllers.js'

export const handleSchedule = async () => {
  try {
    const reminders = await Reminder.find()
    const now = new Date().getTime()
    console.log(new Date())

    await Promise.all(
      reminders.map(async (reminder) => {
        if (now > reminder.expiresDate) {
          const organization = await Organization.findOne({ _id: reminder.organizationId }, 'name -_id')
          if (organization) {
            const news = await getNewsFromBing(organization.name, 'techcrunch.com')
            await sendScheduledReminders({ email: reminder.email, value: news.data.value, organizationName: organization.name })
          }
          if (!reminder.repeatValue) await Reminder.deleteOne({ _id: reminder._id })
          else await Reminder.updateOne({ _id: reminder._id }, { expiresDate: reminder.expiresDate + reminder.repeatValue })
        }
      }),
    )
  } catch (e) {
    console.log(e)
  }
}

export const cronExpression = `2 * * * *`
