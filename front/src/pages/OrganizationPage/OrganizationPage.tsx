import { useParams } from 'react-router-dom'

export const OrganizationPage = () => {
  const { organizationId } = useParams()

  return <>{organizationId}</>
}
