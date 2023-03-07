import {
  ArrowLeftOnRectangleIcon,
  CalendarDaysIcon,
  ChevronRightIcon,
  InboxStackIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { Disclosure, Transition } from '@headlessui/react'
import cx from 'classnames'
import { ClipLoader } from 'react-spinners'
import { colors } from 'constants/colors'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { routePaths } from 'router/routes'
import { useSubscriptions } from 'hooks'
import { removeToken } from 'helpers/token'

const navigation = [
  {
    title: 'Profile',
    to: routePaths.dashboard,
    icon: UserCircleIcon,
  },
  {
    title: 'Follow-ups',
    to: routePaths.reminders,
    icon: CalendarDaysIcon,
  },
]

export const NavbarContainer = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { subscriptions, subscriptionsLoader, isRefetching } =
    useSubscriptions()
  const { organizationId } = useParams()

  const signOut = () => {
    removeToken()
    navigate(routePaths.home)
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-y-1">
        {navigation.map((nav) => (
          <Link
            to={nav.to}
            key={nav.title}
            className={cx(
              'flex gap-x-4 items-center rounded-lg w-full py-3 px-3 text-black/60',
              location.pathname === nav.to
                ? 'bg-cyan-500/20'
                : 'hover:bg-gray-200'
            )}
          >
            <nav.icon className="h-6" />
            <span className="block text-base font-bold">{nav.title}</span>
          </Link>
        ))}
        <Disclosure defaultOpen={true}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex flex-row items-center justify-between rounded-lg w-full py-3 px-3 hover:bg-gray-200 text-black/60">
                <div className="flex flex-row gap-x-4">
                  <InboxStackIcon className="h-6" />
                  <span className="block text-base font-bold">
                    Subscriptions {open}
                  </span>
                </div>
                <ChevronRightIcon
                  className={cx(
                    'h-6 transition',
                    open ? 'rotate-90 transform' : ''
                  )}
                />
              </Disclosure.Button>
              <Transition
                show={open}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                {subscriptionsLoader || isRefetching ? (
                  <div className="flex w-full justify-center mt-3">
                    <ClipLoader color={colors.primary} size={50} />
                  </div>
                ) : subscriptions.length === 0 ? (
                  <p className="text-base text-center font-semibold">
                    You did not subscribed to any organization yet😢
                  </p>
                ) : (
                  <Disclosure.Panel static>
                    {subscriptions.map((organization) => (
                      <Link
                        key={organization._id}
                        to={`/dashboard/organization/${organization._id}`}
                        className={cx(
                          organization._id === organizationId
                            ? 'bg-cyan-500/20 text-gray-900'
                            : 'hover:bg-gray-50 hover:text-gray-900',
                          'group flex items-center px-2 py-2 my-2 text-base font-medium rounded-md text-gray-600 pl-4'
                        )}
                      >
                        {organization.name}
                      </Link>
                    ))}
                  </Disclosure.Panel>
                )}
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
      <div
        onClick={signOut}
        className="flex gap-x-4 self-end items-center rounded-lg w-full py-3 px-3 hover:bg-gray-200 text-black/60"
      >
        <ArrowLeftOnRectangleIcon className="h-6" />
        <span className="block text-base font-bold">Logout</span>
      </div>
    </div>
  )
}
