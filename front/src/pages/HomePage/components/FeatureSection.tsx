export const FeatureSection = () => {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="mx-auto flex-col max-w-7xl justify-center px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:py-40 lg:px-8">
        <div className="flex self-center max-w-3xl flex-col gap-y-10">
          <div className="flex flex-col gap-y-2 text-center">
            <h2 className="font-bold text-2xl">Get alerted!</h2>
            <p className="text-lg">
              Rella uses AI to help you automate your follow up game. Never
              forget about a follow up again, save time and increase your win
              rate! In the biz we like to call this “FU Money”
            </p>
          </div>
          <div className="flex justify-center">
            <div className="h-64 w-96 bg-gray-400 rounded-3xl"></div>
          </div>
        </div>

        <hr className="max-md:block hidden mt-5" />

        <div className="flex max-md:flex-col max-md:items-center justify-between max-w-7xl pt-5 gap-y-10">
          <div className="flex self-end max-md:self-center">
            <div className="h-64 w-96 bg-gray-400 rounded-3xl"></div>
          </div>
          <div className="flex flex-col max-w-lg gap-y-2 text-end max-md:text-center   justify-center">
            <h2 className="font-bold text-2xl">Increase your Win rates!</h2>
            <p className="text-lg">
              Rella will help you stay informed on any relevant information
              hitting the street about the companies you are currently or desire
              to work with
            </p>
          </div>
        </div>

        <hr className="max-md:block hidden mt-5" />

        <div className="flex max-md:flex-col max-md:items-center justify-between max-w-7xl pt-5 gap-y-10">
          <div className="flex flex-col max-w-lg gap-y-2 text-start max-md:text-center justify-center">
            <h2 className="font-bold text-2xl">Save time researching!</h2>
            <p className="text-lg">
              Rella does all of the research for you and combines this
              information in one easy to use dashboard
            </p>
          </div>
          <div className="flex self-end max-md:self-center">
            <div className="h-64 w-96 bg-gray-400 rounded-3xl"></div>
          </div>
        </div>

        <hr className="max-md:block hidden mt-5" />

        <div className="flex max-md:flex-col max-md:items-center justify-between max-w-7xl pt-5 gap-y-10">
          <div className="flex self-end max-md:self-center">
            <div className="h-64 w-96 bg-gray-400 rounded-3xl"></div>
          </div>
          <div className="flex flex-col max-w-lg gap-y-2 text-end max-md:text-center justify-center">
            <h2 className="font-bold text-2xl">
              Accelerate your reply rates!{' '}
            </h2>
            <p className="text-lg">
              Our AI will study the information gathered on any org and produce
              relevant follow up messaging for you
            </p>
          </div>
        </div>

        <hr className="max-md:block hidden mt-5" />

        <div className="flex max-md:flex-col max-md:items-center justify-between max-w-7xl pt-5 gap-y-10">
          <div className="flex flex-col max-w-lg gap-y-2 text-start max-md:text-center justify-center">
            <h2 className="font-bold text-2xl">Convert pipeline to revenue!</h2>
            <p className="text-lg">
              Never let a deal sit stale again, with Rella you always find a
              reason to reach out!
            </p>
          </div>
          <div className="flex self-end max-md:self-center">
            <div className="h-64 w-96 bg-gray-400 rounded-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
