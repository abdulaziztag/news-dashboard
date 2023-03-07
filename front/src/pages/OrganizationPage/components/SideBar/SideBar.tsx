import { SideBarProps } from './types'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
/*import { useMutation } from '@tanstack/react-query'
import { generateFromRequest } from 'api/chatGPT'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'*/

export const SideBar = ({
  sidebarOpen,
  toggleSidebar,
  generatedData,
}: SideBarProps) => {
  /*const [requestValue, setRequestValue] = useState('')

  const { mutate, isLoading, data } = useMutation({
    mutationFn: generateFromRequest,
    onError: (error: AxiosError) => {
      toast(error.message, {
        type: 'error',
      })
    },
  })

  const handleClick = () => {
    mutate(requestValue)
  }*/

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={toggleSidebar}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="absolute right-0 h-full flex w-full py-3 px-5 max-w-lg flex-1 flex-col bg-white">
              <button
                type="button"
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
                onClick={() => toggleSidebar(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <XMarkIcon className="h-6 w-6 text-black" aria-hidden="true" />
              </button>
              <div className="h-full w-full overflow-y-auto pt-5 pb-4">
                {/*<h2 className="text-3xl font-semibold mb-4">Generate</h2>
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="px-4 py-2 bg-white rounded-t-lg">
                    <label htmlFor="comment" className="sr-only">
                      Your comment
                    </label>
                    <textarea
                      id="comment"
                      rows={4}
                      className="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0"
                      placeholder="Type your request..."
                      required
                      onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                        setRequestValue(event.target.value)
                      }
                    ></textarea>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 border-t ">
                    <Button onClick={handleClick} loader={isLoading}>
                      Request
                    </Button>
                  </div>
                </div>*/}
                {generatedData && (
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-semibold">Answer:</h2>
                    <ReactMarkdown
                      remarkPlugins={[gfm]}
                      className="border-2 p-3 mt-2 rounded-xl"
                    >
                      {generatedData}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
