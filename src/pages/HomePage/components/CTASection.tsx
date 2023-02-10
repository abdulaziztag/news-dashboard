import { Button } from 'components/Generic/Button'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'

export const CTASection = () => {
  return (
    <div className="relative bg-gray-900">
      <div className="relative h-56 bg-indigo-600 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&sat=-100"
          alt=""
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600 mix-blend-multiply"
        />
      </div>
      <div className="relative mx-auto max-w-md py-12 px-6 sm:max-w-7xl sm:py-20 md:py-28 lg:px-8 lg:py-32">
        <div className="md:ml-auto md:w-1/2 md:pl-10">
          <h2 className="text-lg font-semibold text-gray-300">
            Award winning support
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            We’re here to help
          </p>
          <p className="mt-3 text-lg text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas
            tempus tellus etiam sed. Quam a scelerisque amet ullamcorper eu enim
            et fermentum, augue. Aliquet amet volutpat quisque ut interdum
            tincidunt duis.
          </p>
          <div className="mt-8">
            <div className="inline-flex rounded-md shadow">
              <Button variant="light" className="ring-offset-black">
                Visit the help center
                <ArrowTopRightOnSquareIcon
                  className="-mr-1 ml-3 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
