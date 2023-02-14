import cx from 'classnames'
import { Link } from 'react-router-dom'
import { DesktopProps } from './types'
import { ClipLoader } from 'react-spinners'
export const DesktopNav = ({
  subscriptions,
  activeOrganization,
  loader,
}: DesktopProps) => {
  return (
    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5">
        <div className="flex flex-shrink-0 items-center px-4">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
        </div>
        <div className="mt-5 flex flex-grow flex-col">
          <div className="border-b-2 border-b-gray-300 my-1 px-1 mx-2 text-gray-500">
            Your subscriptions
          </div>
          <nav className="flex-1 space-y-1 px-2 pb-4">
            {loader ? (
              <div className="flex w-full justify-center mt-3">
                <ClipLoader color="#4f46e5" size={50} />
              </div>
            ) : subscriptions.length === 0 ? (
              <p className="text-base text-center font-semibold">
                You did not subscribed to any organization yet😢
              </p>
            ) : (
              subscriptions.map((organization) => (
                <Link
                  key={organization.id}
                  to={`/dashboard/organization/${organization.id}`}
                  className={cx(
                    organization.id === activeOrganization
                      ? 'bg-gray-200 text-gray-900'
                      : 'hover:bg-gray-50 hover:text-gray-900',
                    'group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600'
                  )}
                >
                  {organization.title}
                </Link>
              ))
            )}
          </nav>
        </div>
      </div>
    </div>
  )
}
