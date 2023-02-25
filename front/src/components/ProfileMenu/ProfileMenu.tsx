import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import cx from 'classnames'
import { Link, useNavigate } from 'react-router-dom'
import { removeToken } from 'helpers/token'
import { routePaths } from 'router/routes'
import { UserCircleIcon } from '@heroicons/react/24/outline'

export const ProfileMenu = () => {
  const navigate = useNavigate()
  const userNavigation = [
    { name: 'Your Profile', href: routePaths.dashboard },
    { name: 'Reminders', href: routePaths.reminders },
  ]

  const signOut = () => {
    removeToken()
    navigate(routePaths.signIn)
  }

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="sr-only">Open user menu</span>
          <UserCircleIcon className="h-8 text-gray-700" />
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
                <Link
                  to={item.href}
                  className={cx(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700'
                  )}
                >
                  {item.name}
                </Link>
              )}
            </Menu.Item>
          ))}
          <Menu.Item key="Sign out">
            <a
              onClick={signOut}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </a>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
