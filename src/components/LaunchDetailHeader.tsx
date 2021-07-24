import { CalendarIcon } from '@heroicons/react/outline'
import { CheckCircleIcon, StarIcon, XCircleIcon } from '@heroicons/react/solid'
import { useEffect } from 'react'
import { useContext, useState } from 'react'
import { LaunchContext } from '../contexts/LaunchContext'
import { formatDate } from '../pages/api/helper'

export default function LaunchDetailHeader() {
	const [launch, setLaunch] = useContext(LaunchContext)
	const [isLoading, setLoading] = useState(false)
  const [launchData, setLaunchData] = useState(null)

  useEffect(() => {
    const storage = localStorage.getItem('launches')
    const list = JSON.parse(storage)
    if(list && launch){
      const found = list.find(x => x.id == launch.id)
      setLaunchData(found)
    }
  }, [launch])

	const handleAddFavorite = async () => {
    setLoading(true)
		const data = {
			id: launch.id,
			details: launch.details,
			mission_name: launch.mission_name,
			links: {
				flickr_images: launch.links.flickr_images,
			},
			launch_success: launch.launch_success,
			launch_date_utc: launch.launch_date_utc,
		}
    const storage = localStorage.getItem('launches')
    let list = JSON.parse(storage)
    if(list){
      list.push(data)
    }else{
      list = []
      list.push(data)
    }

    localStorage.setItem('launches', JSON.stringify(list))
    setLoading(false)
    setLaunchData(data)
	}

	const handleRemoveFavorite = async () => {
    setLoading(true)
    const storage = localStorage.getItem('launches')
    let list = JSON.parse(storage)
    if(!list) return

    const idx = list.findIndex(x => x.id == launch.id)
    list.splice(idx, 1)
    localStorage.setItem('launches', JSON.stringify(list))
    setLoading(false)
    setLaunchData(null)
  }

	return (
		<div className='max-w-7xl mx-auto xl:flex xl:items-center xl:justify-between'>
			<div className='flex-1 min-w-0'>
				<h1 className='mt-2 text-2xl font-bold leading-7 sm:text-3xl sm:truncate'>{launch?.mission_name}</h1>
				<div className='flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-8'>
					{launch?.launch_success ? (
						<div className='mt-2 flex items-center text-green-400'>
							<CheckCircleIcon className='flex-shrink-0 mr-1.5 h-5 w-5 text-green-500' aria-hidden='true' />
							Success
						</div>
					) : (
						<div className='mt-2 flex items-center text-red-400'>
							<XCircleIcon className='flex-shrink-0 mr-1.5 h-5 w-5 text-red-500' aria-hidden='true' />
							Failed
						</div>
					)}
					<div className='mt-2 flex items-center text-sm text-gray-300'>
						<CalendarIcon className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-200' aria-hidden='true' />
						{formatDate(new Date(launch?.launch_date_utc))}
					</div>
				</div>
			</div>
			<div className='mt-3 flex xl:mt-0 xl:ml-4'>
				<span className='sm:block'>
          {launchData ? (
            <button
              type='button'
              className='inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2'
              onClick={handleRemoveFavorite}
            >
              <StarIcon
                className={`${isLoading ? 'animate-spin' : ''} -ml-1 mr-2 h-5 w-5 text-yellow-500`}
                aria-hidden='true'
              />
              Remove from Favorite
            </button>
          ) : (
            <button
              type='button'
              className='inline-flex items-center px-4 py-2 border border-yellow-400 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-yellow-400'
              onClick={handleAddFavorite}
            >
              <StarIcon
                className={`${isLoading ? 'animate-spin' : ''} -ml-1 mr-2 h-5 w-5 text-white`}
                aria-hidden='true'
              />
              Add to Favorite
            </button>
          )}
				</span>
			</div>
		</div>
	)
}
