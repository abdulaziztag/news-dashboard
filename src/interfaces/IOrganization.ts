export interface IOrganization {
  name: string
  linkedin?: string
  twitter?: string
  otherSources?: [
    {
      title: string
      src: string
    },
  ]
}
