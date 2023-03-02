import { Request, Response } from 'express'
import { MESSAGE } from '@/utils/index.js'
import { Organization } from '@/models/index.js'

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
    /*if (req?.user.role === 'Admin') {*/
    const organization = await Organization.findOne({ name: req.body.organizationName })
    if (organization) res.send({ message: MESSAGE.USER_ALREADY_EXIST })
    else {
      const addedOrganizations = await Organization.insertMany(req.body)
      res.send({ message: MESSAGE.ORGANIZATION_ADDED, organizationsIds: addedOrganizations.map((doc) => doc._id) })
    }

    /*} else {
      res.send({ message: MESSAGE.PERMISSION_DENIED })
    }*/
  } catch (e) {
    console.log(e)
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
    const results = await Organization.find({ name: { $regex: req.body.organizationName, $options: 'i' } }, 'name')
    res.send(results)
  } catch (e) {
    res.status(500).send({ message: MESSAGE.DEFAULT_ERROR })
  }
}
