import { Request, Response } from 'express'
import { MESSAGE } from '@/utils'
import { Organization } from '@/models/Organization'

export const getAll = async (req: Request, res: Response) => {
  try {
    const allOrganizations = await Organization.find({})
    res.send(allOrganizations)
  } catch (e) {
    res.status(500).send({ message: MESSAGE.DEFAULT_ERROR })
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
    res.status(500).send({ message: MESSAGE.DEFAULT_ERROR })
  }
}

export const getOrganizationSources = async (req: Request, res: Response) => {
  try {
    const organization = await Organization.findOne({ _id: req.body.organizationId })
    if (organization) res.send(organization)
    else res.send({ message: MESSAGE.ORGANIZATION_NOT_FOUND })
  } catch (e) {
    res.status(500).send({ message: MESSAGE.DEFAULT_ERROR })
  }
}


export const searchFromOrganizations = async (req: Request, res: Response) => {
  try {
    const results = await Organization.find({ name: { $regex: req.body.organizationName, $options: 'i' } });
    res.send(results)
  } catch (e) {
    res.status(500).send({ message: MESSAGE.DEFAULT_ERROR })
  }
}
