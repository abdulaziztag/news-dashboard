import { Request, Response } from 'express'
import { MESSAGE } from '@/utils'
import { Organization } from '@/models/Organization'

export const getAll = async (req: Request, res: Response) => {
  try {
    const allOrganizations = await Organization.find({})
    res.send(allOrganizations)
  } catch (e) {
    res.send({ message: MESSAGE.DEFAULT_ERROR })
  }
}

export const addOrganization = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (req?.user.role === 'Admin') {
      await Organization.insertMany(req.body)

      res.send({ message: MESSAGE.ORGANIZATION_ADDED })
    } else {
      res.send({ message: MESSAGE.PERMISSION_DENIED })
    }
  } catch (e) {
    res.send({ message: MESSAGE.DEFAULT_ERROR })
  }
}

export const getOrganizationSources = async (req: Request, res: Response) => {
  try {
    const organization = await Organization.find({ _id: req.body.organizationId })
    res.send(organization)
  } catch (e) {
    res.send({ message: MESSAGE.DEFAULT_ERROR })
  }
}
