import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { UserForEmail } from '@/interfaces'

dotenv.config()

const user = process.env.USER
const pass = process.env.PASSWORD

const transport = nodemailer.createTransport({
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
        <a href=https://rella.herokuapp.com/auth/confirmation/${confirmationCode}> Click here</a>
        </div>`,
    })
    return true
  } catch (e) {
    return false
  }
}
