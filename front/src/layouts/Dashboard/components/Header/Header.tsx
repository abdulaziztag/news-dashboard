import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Menu, Transition, Combobox } from '@headlessui/react'
import { ChangeEvent, Fragment, useState } from 'react'
import cx from 'classnames'
import { HeaderProps } from './types'
import { useMutation } from '@tanstack/react-query'
import { searchOrganization } from 'api/organization'
import { SubscriptionMini } from 'interfaces'
import { ClipLoader } from 'react-spinners'
import { colors } from 'constants/colors'
import { routePaths } from 'router/routes'
import { useNavigate } from 'react-router-dom'
import { searchInputPromise } from 'helpers/searchInputPromise'

export const Header = ({ setSidebarOpen }: HeaderProps) => {
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

  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
  ]

  return (
    <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
      <button
        type="button"
        className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex flex-1 justify-between px-4">
        <div className="flex-col flex-1 w-full h-full">
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
                <div className="text-xl text-center py-3">
                  No organizations found
                </div>
              )}
            </Combobox.Options>
          </Combobox>
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <a
                        href={item.href}
                        className={cx(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        {item.name}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  )
}
