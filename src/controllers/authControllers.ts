import { Request, Response } from 'express'
import { HTTP_STATUS, MESSAGE } from '@/utils'
import { IUser } from '@/interfaces'
import { User } from '@/models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendConfirmationEmail } from '@/utils/nodemailer'

export const SignIn = async (req: Request, res: Response) => {
  try {
    const { email, password }: IUser = req.body
    const candidate = await User.findOne({ email })
    if (candidate) {
      if (candidate.status === 'Pending') {
        return res.status(401).send({
          message: MESSAGE.PENDING,
        })
      }

      const passwordResult = bcrypt.compareSync(password, candidate.password)

      if (passwordResult) {
        const token = jwt.sign(
          {
            email: candidate.email,
            userId: candidate._id,
            role: candidate.role,
          },
          process.env.JWT_SECRET as string,
          { expiresIn: process.env.JWT_EXPIRES_IN },
        )

        res.status(200).send({
          token: `Bearer ${token}`,
          firstName: candidate.firstName,
          lastName: candidate.lastName,
          email: candidate.email,
          userId: candidate._id,
          role: candidate.role,
        })
      } else {
        res.status(401).send({
          message: MESSAGE.INCORRECT_PASSWORD,
        })
      }
    } else {
      res.status(401).send({
        message: MESSAGE.USER_NOT_FOUND,
      })
    }
  } catch (e) {
    res.send({ message: MESSAGE.DEFAULT_ERROR }).status(HTTP_STATUS.HTTP_STATUS_INTERNAL_SERVER_ERROR)
  }
}

export const SignUp = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password }: IUser = req.body
    const candidate = await User.findOne({ email })
    if (candidate) {
      if (candidate.status === 'Pending') {
        const isConfirmationSent = await sendConfirmationEmail({
          firstName: candidate.firstName,
          lastName: candidate.lastName,
          email,
          confirmationCode: candidate.confirmationCode,
        })

        if (isConfirmationSent) res.send({ message: MESSAGE.PENDING })
        else res.send({ message: MESSAGE.DEFAULT_ERROR })
      } else {
        res.status(409).send({
          message: MESSAGE.USER_ALREADY_EXIST,
        })
      }
    } else {
      const token = jwt.sign(
        {
          email,
        },
        process.env.JWT_SECRET as string,
      )
      const user = {
        firstName,
        lastName,
        email,
        password,
        confirmationCode: token,
      }
      const userData = new User({
        ...user,
      })

      await userData.save()

      const isConfirmationSent = await sendConfirmationEmail({
        ...user,
      })

      if (isConfirmationSent) res.send({ message: MESSAGE.PENDING })
      else {
        res.send({ message: MESSAGE.DEFAULT_ERROR })
      }
    }
  } catch (e) {
    res.send({ message: MESSAGE.DEFAULT_ERROR }).status(HTTP_STATUS.HTTP_STATUS_INTERNAL_SERVER_ERROR)
  }
}

export const confirmEmail = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      confirmationCode: req.body.confirmationCode,
    })
    if (!user) {
      return res.status(404).send({ message: MESSAGE.USER_NOT_FOUND })
    }
    user.status = 'Active'
    user.save()
    res.status(200).send({ message: MESSAGE.EMAIL_CONFIRMED })
  } catch (e) {
    res.status(500).send({ message: MESSAGE.DEFAULT_ERROR })
  }
}
