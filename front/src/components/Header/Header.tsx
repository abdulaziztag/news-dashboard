import { Link } from 'react-router-dom'
import { routePaths } from 'router/routes'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { navigation } from 'mocks'
import { Fragment } from 'react'
import { Button } from 'components/Generic/Button'
import { ClipLoader } from 'react-spinners'
import { colors } from 'constants/colors'
import image from 'assets/rella_logo.png'

export const Header = ({
  isLoggedIn,
  isLoading,
}: {
  isLoggedIn: boolean
  isLoading: boolean
}) => {
  return (
    <Popover as="header" className="relative">
      <div className="bg-white pt-6">
        <nav
          className="relative mx-auto flex max-w-7xl items-center justify-between px-6"
          aria-label="Global"
        >
          <div className="flex flex-1 items-center">
            <div className="flex w-full items-center justify-between md:w-auto">
              <Link to={routePaths.home}>
                <span className="sr-only">Rella</span>
                <img className="h-8 w-auto sm:h-10" src={image} alt="" />
              </Link>
              <div className="-mr-2 flex items-center md:hidden">
                <Popover.Button className="focus-ring-inset inline-flex bg-primary text-white items-center justify-center rounded-md p-2 hover:bg-primary/60 focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="hidden space-x-8 md:ml-10 md:flex">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-black hover:text-gray-300"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            {isLoading ? (
              <ClipLoader color={colors.white} />
            ) : !isLoggedIn ? (
              <>
                <Link
                  to={routePaths.signIn}
                  className="text-base font-medium text-black hover:text-gray-400"
                >
                  Sign In
                </Link>
                <Link
                  to={routePaths.signUp}
                  className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700"
                >
                  SignUp
                </Link>
              </>
            ) : (
              <Link
                to={routePaths.dashboard}
                className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700"
              >
                Dashboard
              </Link>
            )}
          </div>
        </nav>
      </div>

      <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute z-10 inset-x-0 top-0 origin-top transform p-2 transition md:hidden"
        >
          <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
            <div className="flex items-center justify-between px-5 pt-4">
              <div>
                <img className="h-8 w-auto sm:h-10" src={image} alt="" />
              </div>
              <div className="-mr-2">
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-600">
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="pt-5 pb-6">
              <div className="space-y-1 px-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="mt-6 px-5">
                <Link to={routePaths.signUp}>
                  <Button className="w-full text-center">Sign Up</Button>
                </Link>
              </div>
              <div className="mt-6 px-5">
                <p className="text-center text-base font-medium text-gray-500">
                  Existing customer?{' '}
                  <Link
                    to={routePaths.signIn}
                    className="text-gray-900 hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
