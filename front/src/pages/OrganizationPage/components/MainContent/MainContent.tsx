import { MainContentProps } from './types'
import { Timeline } from 'react-twitter-widgets'
import { Button } from 'components/Generic/Button'
import { colors } from 'constants/colors'
import { ClipLoader } from 'react-spinners'
import { useState } from 'react'

export const MainContent = ({
  isLoading,
  isSubscribed,
  organization,
  toggleSubscription,
}: MainContentProps) => {
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
      <div className="grid grid-cols-1 gap-2 2xl:grid-cols-3">
        <div className="w-full h-[600px] rounded-xl flex justify-center relative">
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
            options={{ width: '426', height: '598' }}
            onLoad={handleLoad}
          />
        </div>

        <div className="w-full border-2 border-red-600 min-h-[600px] py-2 px-3 rounded-xl">
          Loading...
        </div>
        <div className="w-full border-2 border-red-600 h-[600px] py-2 px-3 rounded-xl">
          Loading
        </div>
        <div className="w-full border-2 border-red-600 h-[600px] py-2 px-3 rounded-xl">
          Loading
        </div>
      </div>
    </div>
  )
}
