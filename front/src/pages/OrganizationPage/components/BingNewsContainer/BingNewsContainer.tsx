import { bingNewsContainerProps } from './types'
import { formatDate } from 'helpers/formatDate'
import { ClipLoader } from 'react-spinners'
import { colors } from 'constants/colors'
import { useQuery } from '@tanstack/react-query'
import { getSourceFromBing } from 'api/organization'
import cx from 'classnames'
import { useEffect } from 'react'

export const BingNewsContainer = ({
  image,
  containerTitle,
  organization,
  domain,
  headerClasses,
  onDataLoaded,
}: bingNewsContainerProps) => {
  const { data, error, isLoading, isRefetching } = useQuery({
    queryKey: [domain, organization.name, domain],
    queryFn: getSourceFromBing,
    retry: 0,
    staleTime: Infinity,
  })

  useEffect(() => {
    if (data) {
      onDataLoaded(data.data.value)
    }
  }, [data])

  return (
    <>
      <h3
        className={cx(
          'border-b-2 text-2xl font-bold top-0 left-0 right-0 sticky',
          headerClasses
        )}
      >
        <img className="h-20" src={image} alt={containerTitle} />
      </h3>
      {isLoading || isRefetching ? (
        <div className="flex h-full justify-center pt-4">
          <ClipLoader size={75} color={colors.primary} />
        </div>
      ) : error ? (
        <div className="flex h-full justify-center pt-4">
          An error occurred try again!
        </div>
      ) : data?.data.value.length === 0 ? (
        <div className="flex h-full justify-center pt-4">
          There is no news about this company
        </div>
      ) : (
        <ul>
          {data?.data.value.map((value) => (
            <a
              key={value.url}
              href={value.url}
              target="_blank"
              rel="noreferrer"
            >
              <li className="py-3 flex items-center justify-between px-3 border-b-2 hover:bg-gray-200 transition-colors">
                <div>
                  <h4 className="font-semibold">{value.name}</h4>
                  <p className="text-gray-600">{value.description}</p>
                  <span className="text-gray-500 text-sm">
                    {formatDate(value.datePublished)}
                  </span>
                </div>
                {value.image && (
                  <div className="min-w-[96px] h-24 items-center flex justify-center">
                    <img
                      className="rounded-full w-24 h-24"
                      src={value.image.thumbnail.contentUrl}
                      alt=""
                    />
                  </div>
                )}
              </li>
            </a>
          ))}
        </ul>
      )}
    </>
  )
}
