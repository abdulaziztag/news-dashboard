import { Input } from '../../Generic/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addOrganizationForm, AddOrganizationProps } from './types'
import { addOrganizationSchema } from './utils/addOrganizationSchema'
import { Button } from '../../Generic/Button'
import { useMutation } from '@tanstack/react-query'
import { addOrganization } from 'api/organization'
import { useNavigate } from 'react-router-dom'
import { routePaths } from 'router/routes'
import { toast } from 'react-toastify'

export const AddOrganization = ({ onClose }: AddOrganizationProps) => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<addOrganizationForm>({
    resolver: zodResolver(addOrganizationSchema),
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: addOrganization,
    onSuccess: (data) => {
      navigate(`${routePaths.organization}/${data.data.organizationsIds[0]}`)
      toast(data.data.message, {
        type: 'success',
      })
      onClose()
    },
    onError: (error: Error) => {
      toast(error.message, {
        type: 'error',
      })
    },
  })

  const submitForm: SubmitHandler<addOrganizationForm> = (data) => {
    mutate(data)
  }

  return (
    <form className="gap-y-4 flex flex-col">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Organization name
        </label>
        <Input
          id="organizationName"
          placeholder="Organization name"
          className="mt-1"
          {...register('organizationName', { required: true })}
        />
        {errors.organizationName && (
          <p className="text-sm text-red-600">
            {errors.organizationName.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Twitter username (not a link)
        </label>
        <Input
          id="twitter"
          placeholder="Twitter"
          className="mt-1"
          {...register('twitter', { required: true })}
        />
        {errors.twitter && (
          <p className="text-sm text-red-600">{errors.twitter.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          LinkedIn username (not a link)
        </label>
        <Input
          id="linkedin"
          placeholder="LinkedIn"
          className="mt-1"
          {...register('linkedin', { required: true })}
        />
        {errors.linkedin && (
          <p className="text-sm text-red-600">{errors.linkedin.message}</p>
        )}
      </div>
      <div className="flex gap-x-2 justify-end">
        <Button variant="light" onClick={onClose}>
          Close
        </Button>
        <Button onClick={handleSubmit(submitForm)} loader={isLoading}>
          Add organization
        </Button>
      </div>
    </form>
  )
}
