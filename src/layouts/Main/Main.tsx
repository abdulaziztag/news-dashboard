import { Link, Outlet } from 'react-router-dom'
import { Popover, Transition } from '@headlessui/react'
import { routePaths } from 'router/routes'
import { navigation, footerNavigation } from 'mocks'
import { Fragment } from 'react'
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { Button } from 'components/Generic/Button'

export const Main = () => {
  return (
    <>
      <div className="bg-white">
        <div className="relative overflow-hidden">
          <Popover as="header" className="relative">
            <div className="bg-gray-900 pt-6">
              <nav
                className="relative mx-auto flex max-w-7xl items-center justify-between px-6"
                aria-label="Global"
              >
                <div className="flex flex-1 items-center">
                  <div className="flex w-full items-center justify-between md:w-auto">
                    <Link to={routePaths.home}>
                      <span className="sr-only">Your Company</span>
                      <img
                        className="h-8 w-auto sm:h-10"
                        src="https://tailwindui.com/img/logos/mark.svg?from-color=teal&from-shade=200&to-color=cyan&to-shade=400&toShade=400"
                        alt=""
                      />
                    </Link>
                    <div className="-mr-2 flex items-center md:hidden">
                      <Popover.Button className="focus-ring-inset inline-flex items-center justify-center rounded-md bg-gray-900 p-2 text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white">
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
                        className="text-base font-medium text-white hover:text-gray-300"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="hidden md:flex md:items-center md:space-x-6">
                  <Link
                    to={routePaths.signIn}
                    className="text-base font-medium text-white hover:text-gray-300"
                  >
                    Sign In
                  </Link>
                  <Link
                    to={routePaths.signUp}
                    className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700"
                  >
                    SignUp
                  </Link>
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
                className="absolute inset-x-0 top-0 origin-top transform p-2 transition md:hidden"
              >
                <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                  <div className="flex items-center justify-between px-5 pt-4">
                    <div>
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?from-color=teal&from-shade=200&to-color=cyan&to-shade=400&toShade=400"
                        alt=""
                      />
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
                      <Button variant="info" className="w-full text-center">
                        Start free trial
                      </Button>
                    </div>
                    <div className="mt-6 px-5">
                      <p className="text-center text-base font-medium text-gray-500">
                        Existing customer?{' '}
                        <a href="#" className="text-gray-900 hover:underline">
                          Login
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
          <Outlet />
          <footer className="bg-gray-50" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
              Footer
            </h2>
            <div className="mx-auto max-w-md px-6 pt-12 sm:max-w-7xl lg:px-8 lg:pt-16">
              <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                <div className="space-y-8 xl:col-span-1">
                  <img
                    className="h-10"
                    src="https://tailwindui.com/img/logos/mark.svg?color=gray&shade=300"
                    alt="Company name"
                  />
                  <p className="text-base text-gray-500">
                    Making the world a better place through constructing elegant
                    hierarchies.
                  </p>
                  {/*<div className="flex space-x-6">
                {footerNavigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </a>
                ))}
              </div>*/}
                </div>
                <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                  <div className="md:grid md:grid-cols-2 md:gap-8">
                    <div>
                      <h3 className="text-base font-medium text-gray-900">
                        Solutions
                      </h3>
                      <ul role="list" className="mt-4 space-y-4">
                        {footerNavigation.solutions.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className="text-base text-gray-500 hover:text-gray-900"
                            >
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-12 md:mt-0">
                      <h3 className="text-base font-medium text-gray-900">
                        Support
                      </h3>
                      <ul role="list" className="mt-4 space-y-4">
                        {footerNavigation.support.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className="text-base text-gray-500 hover:text-gray-900"
                            >
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="md:grid md:grid-cols-2 md:gap-8">
                    <div>
                      <h3 className="text-base font-medium text-gray-900">
                        Company
                      </h3>
                      <ul role="list" className="mt-4 space-y-4">
                        {footerNavigation.company.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className="text-base text-gray-500 hover:text-gray-900"
                            >
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-12 md:mt-0">
                      <h3 className="text-base font-medium text-gray-900">
                        Legal
                      </h3>
                      <ul role="list" className="mt-4 space-y-4">
                        {footerNavigation.legal.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className="text-base text-gray-500 hover:text-gray-900"
                            >
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 border-t border-gray-200 py-8">
                <p className="text-base text-gray-400 xl:text-center">
                  &copy; 2020 Your Company, Inc. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}
