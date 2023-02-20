import { MainContentProps } from './types'
import { Timeline } from 'react-twitter-widgets'
import { Button } from 'components/Generic/Button'
import { colors } from 'constants/colors'
import { ClipLoader } from 'react-spinners'
import { RefObject, useLayoutEffect, useRef, useState } from 'react'
import { BingNewsContainer } from '../BingNewsContainer'

export const MainContent = ({
  isLoading,
  isSubscribed,
  organization,
  toggleSubscription,
}: MainContentProps) => {
  const blockRef: RefObject<HTMLDivElement> = useRef(null)

  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    // @ts-ignore
    setWidth(blockRef.current.offsetWidth)
  }, [])

  const [loading, setLoading] = useState(true)

  const handleLoad = () => {
    setLoading(false)
  }

  return (
    <div className="w-full">
      <div className="flex gap-x-4 mb-12 justify-between">
        <h1 className="text-2xl font-bold text-gray-900 capital">
          {organization?.name}
        </h1>
        <Button
          variant={isSubscribed ? 'info' : 'success'}
          onClick={toggleSubscription}
        >
          {isLoading ? (
            <ClipLoader color={colors.white} />
          ) : isSubscribed ? (
            'Subscribed'
          ) : (
            'Subscribe'
          )}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2 2xl:grid-cols-6">
        <div
          className="w-full h-[600px] rounded-xl flex justify-center relative overflow-auto col-span-2"
          ref={blockRef}
        >
          {loading && (
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
            onLoad={handleLoad}
          />
        </div>

        <div className="w-full col-span-4 border-2 overflow-y-auto h-[600px] pb-2 rounded-xl relative">
          <BingNewsContainer
            containerTitle="Techcrunch"
            organization={organization}
            domain="techcrunch.com"
          />
        </div>
        {/*<div className="w-full border-2 col-span-3 overflow-y-auto h-[600px] pb-2 rounded-xl relative">
          <BingNewsContainer
            containerTitle="The Verge"
            organization={organization}
            domain="theverge.com"
          />
        </div>
        <div className="w-full border-2 col-span-3 overflow-y-auto h-[600px] pb-2 rounded-xl relative">
          <BingNewsContainer
            containerTitle="Bloomberg"
            organization={organization}
            domain="bloomberg.com"
          />
        </div>*/}
      </div>
    </div>
  )
}
