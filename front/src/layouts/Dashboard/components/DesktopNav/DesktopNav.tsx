import image from 'assets/rella_logo.png'
import { NavbarContainer } from '../NavbarContainer'

export const DesktopNav = () => {
  return (
    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
      <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5">
        <div className="flex flex-shrink-0 items-center px-4 border-b-2">
          <img className="h-8 w-auto mb-3" src={image} alt="Your Company" />
        </div>
        <div className="flex flex-grow flex-col pt-2">
          <nav className="flex-1 space-y-1 px-2 pb-4">
            <NavbarContainer />
          </nav>
        </div>
      </div>
    </div>
  )
}
