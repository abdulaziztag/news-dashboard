import { MainContentProps } from './types'
import { Timeline } from 'react-twitter-widgets'
import { Button } from 'components/Generic/Button'
import { colors } from 'constants/colors'
import { ClipLoader } from 'react-spinners'
import { RefObject, useLayoutEffect, useRef, useState } from 'react'
import { BingNewsContainer } from '../BingNewsContainer'
import { ModalDialog } from 'components/Generic/ModalDialog'
import { AddReminder } from 'components/DialogContents/AddReminder'
import techcrunchLogo from 'assets/techcrunch.png'
import bloombergLogo from 'assets/bloomberg.png'
import thevergeLogo from 'assets/theverge.png'
import { NewsArticle } from 'types/BingResponseType'
import { useMutation } from '@tanstack/react-query'
import { generateFromRequest } from 'api/chatGPT'
import { AxiosError } from 'axios/index'
import { toast } from 'react-toastify'
import { SideBar } from '../SideBar/SideBar'

export const MainContent = ({
  subscriptionLoader,
  isSubscribed,
  organization,
  toggleSubscription,
}: MainContentProps) => {
  const blockRef: RefObject<HTMLDivElement> = useRef(null)
  const [generatedData, setGeneratedData] = useState('')

  const { mutate, isLoading } = useMutation({
    mutationFn: generateFromRequest,
    onError: (error: AxiosError) => {
      toast(error.message, {
        type: 'error',
      })
    },
    onSuccess: (data) => {
      setGeneratedData(data.data.message)
      setSidebarFlag(true)
    },
  })

  const [width, setWidth] = useState(0)
  const [bingNews, setBingNews] = useState<NewsArticle[]>([])
  const [twitterLoader, setTwitterLoader] = useState(true)
  const [reminderDialog, setReminderDialog] = useState(false)
  const [sidebarFlag, setSidebarFlag] = useState<boolean>(false)

  useLayoutEffect(() => {
    blockRef.current && setWidth(blockRef.current.offsetWidth)
  }, [])

  const handleLoad = (data: NewsArticle[]) => {
    setBingNews((prevState) => [...prevState, ...data])
  }

  const requestToOpenAI = () => {
    mutate(
      bingNews.map((news) => news.name).join('\n') +
        'using this news news, sort them by highlighted list about ' +
        organization.name
    )
  }

  return (
    <div className="w-full">
      <ModalDialog
        isOpen={reminderDialog}
        title="Create follow-up"
        body={<AddReminder onClose={() => setReminderDialog(false)} />}
        onClose={() => setReminderDialog(false)}
        actions={true}
      />
      <SideBar
        sidebarOpen={sidebarFlag}
        toggleSidebar={setSidebarFlag}
        generatedData={generatedData}
      />
      <div className="flex py-3 gap-x-4 mb-12 justify-between">
        <h1 className="text-2xl font-bold text-gray-900 capital">
          {organization?.name}
        </h1>
        {
          <div className="flex flew-row gap-x-2 items-center">
            {bingNews.length !== 0 && (
              <Button
                variant="info"
                onClick={requestToOpenAI}
                disabled={isLoading}
                loader={isLoading}
              >
                Generate follow-up message
              </Button>
            )}
            <Button onClick={() => setReminderDialog(true)}>
              Create follow-up
            </Button>
            <Button
              variant={isSubscribed ? 'light' : 'success'}
              onClick={toggleSubscription}
            >
              {subscriptionLoader ? (
                <ClipLoader
                  color={isSubscribed ? '#000' : colors.white}
                  size={25}
                />
              ) : isSubscribed ? (
                'Subscribed'
              ) : (
                'Subscribe'
              )}
            </Button>
          </div>
        }
      </div>

      <div className="grid grid-cols-2 gap-2 2xl:grid-cols-6">
        <div
          className="w-full h-[600px] rounded-xl flex justify-center relative overflow-auto col-span-2"
          ref={blockRef}
        >
          {twitterLoader && (
            <div className="absolute w-full flex flex-col items-center justify-center">
              <ClipLoader color={colors.primary} size={75} />
              <p>Loading tweets...</p>
            </div>
          )}
          <Timeline
            dataSource={{
              sourceType: 'profile',
              screenName: organization?.twitter,
            }}
            options={{ width: width, height: '598' }}
            onLoad={() => {
              setTwitterLoader(false)
            }}
          />
        </div>

        <div className="w-full col-span-4 border-2 overflow-y-auto h-[600px] pb-2 rounded-xl relative">
          <BingNewsContainer
            containerTitle="Techcrunch"
            headerClasses="bg-green-100 pl-5"
            image={techcrunchLogo}
            organization={organization}
            onDataLoaded={handleLoad}
            domain="techcrunch.com"
          />
        </div>
        <div className="w-full border-2 col-span-3 overflow-y-auto h-[600px] pb-2 rounded-xl relative">
          <BingNewsContainer
            containerTitle="The Verge"
            headerClasses="bg-[#5200ff]"
            image={thevergeLogo}
            organization={organization}
            onDataLoaded={handleLoad}
            domain="theverge.com"
          />
        </div>
        <div className="w-full border-2 col-span-3 overflow-y-auto h-[600px] pb-2 rounded-xl relative">
          <BingNewsContainer
            containerTitle="Bloomberg"
            headerClasses="bg-[black]"
            image={bloombergLogo}
            organization={organization}
            onDataLoaded={handleLoad}
            domain="bloomberg.com"
          />
        </div>
      </div>
    </div>
  )
}
