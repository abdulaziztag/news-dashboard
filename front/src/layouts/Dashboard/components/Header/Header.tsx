import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { HeaderProps } from './types'
import { ModalDialog } from 'components/Generic/ModalDialog'
import { AddOrganization } from 'components/DialogContents/AddOrganization'
import { SearchBar } from 'components/SearchBar/SearchBar'
import { ProfileMenu } from 'components/ProfileMenu'

export const Header = ({ setSidebarOpen }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
      <ModalDialog
        isOpen={isOpen}
        title={'Add organization'}
        body={<AddOrganization onClose={() => setIsOpen(false)} />}
        actions={true}
        onClose={() => setIsOpen(false)}
      />

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
          <SearchBar openModal={() => setIsOpen(true)} />
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          <ProfileMenu />
        </div>
      </div>
    </div>
  )
}
