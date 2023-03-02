import { IReminderForEmail, UserForEmail } from '@/interfaces/index.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const user = process.env.USER
const pass = process.env.PASSWORD

export const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user,
    pass,
  },
})

export const sendConfirmationEmail = async ({ firstName, lastName, email, confirmationCode }: UserForEmail): Promise<boolean> => {
  try {
    await transport.sendMail({
      from: user,
      to: email,
      subject: 'Please confirm your account',
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${firstName} ${lastName}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=https://rella.herokuapp.com/auth/confirmation/${confirmationCode}>Click here</a>
        </div>`,
    })
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

export const sendScheduledReminders = async ({ email, value, organizationName, notes = '' }: IReminderForEmail) => {
  await transport.sendMail({
    from: user,
    to: email,
    subject: `Scheduled reminder about ${organizationName} ${notes}`,
    html: `<div>${value.map((key) => {
      return `<div>${key.name}</div>`
    })}</div>`,
  })
}
