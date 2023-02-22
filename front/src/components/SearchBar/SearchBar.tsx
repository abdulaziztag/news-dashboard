import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import { ClipLoader } from 'react-spinners'
import { colors } from 'constants/colors'
import cx from 'classnames'
import { Button } from '../Generic/Button'
import { useNavigate } from 'react-router-dom'
import { ChangeEvent, useState } from 'react'
import { SubscriptionMini } from 'interfaces'
import { useMutation } from '@tanstack/react-query'
import { searchOrganization } from 'api/organization'
import { searchInputPromise } from 'helpers/searchInputPromise'
import { routePaths } from 'router/routes'
import { SearchBarTypes } from './types'

export const SearchBar = ({ openModal }: SearchBarTypes) => {
  const navigate = useNavigate()
  const [foundOrganizations, setFoundOrganizations] = useState<
    SubscriptionMini[]
  >([])

  const searchMutation = useMutation({
    mutationFn: searchOrganization,
    onSuccess: (data) => {
      setFoundOrganizations(data.data)
    },
  })

  const searchInputHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    await searchInputPromise(event.target)
    inputValue.trim() !== '' && searchMutation.mutate(event.target.value)
  }

  const goToOrganization = (id: string) => {
    navigate(`${routePaths.organization}/${id}`)
  }

  return (
    <Combobox>
      <div className="w-full h-full flex items-center">
        <MagnifyingGlassIcon
          className="pointer-events-none absolute h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        <Combobox.Input
          className="h-full w-full border-0 px-9 placeholder-gray-400 focus:ring-0 sm:text-sm"
          placeholder="Search..."
          onChange={(event) => searchInputHandler(event)}
        />
      </div>
      <Combobox.Options className="max-h-72 scroll-py-2 overflow-y-auto mx-2 text-sm text-gray-800 bg-gray-100 rounded-b-2xl shadow-lg">
        {searchMutation.isLoading ? (
          <div className="text-xl text-center py-3">
            <ClipLoader size={60} color={colors.primary} />
          </div>
        ) : foundOrganizations.length !== 0 ? (
          foundOrganizations.map((organization) => (
            <Combobox.Option
              key={organization._id}
              value={organization.name}
              onClick={() => goToOrganization(organization._id)}
              className={({ active }) =>
                cx(
                  'cursor-default select-none px-4 py-4',
                  active && 'bg-indigo-600 text-white'
                )
              }
            >
              {organization.name}
            </Combobox.Option>
          ))
        ) : (
          <div className="text-xl flex-col items-center gap-y-2 py-3 flex">
            No organizations found
            <Button variant="light" size="sm" onClick={() => openModal(true)}>
              Add organization
            </Button>
          </div>
        )}
      </Combobox.Options>
    </Combobox>
  )
}
