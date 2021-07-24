import Link from 'next/link'
import { CalendarIcon } from '@heroicons/react/outline'
import { formatDate } from '../pages/api/helper'
import Image from 'next/image'

export default function LaunchGrid({ launch }) {
	let detail = launch.details ? launch.details.substring(0, 75).trim() : null
	if (detail && launch.details.length > 75) {
		detail += '...'
	}

	return (
		<div className='flex flex-col rounded-lg shadow-lg overflow-hidden'>
			<div className='flex-shrink-0 bg-gray-400'>
				<img
					className={`h-48 w-full ${
						launch.links.flickr_images.length == 0 ? 'object-scale-down' : 'object-cover'
					}`}
					src={launch.links.flickr_images.length == 0 ? '/rocket.png' : launch.links.flickr_images[0]}
					alt='Not Found'
				/>
			</div>
			<div className='flex-1 bg-gray-800 p-6 flex flex-col justify-between'>
				<div className='flex-1'>
					<Link href={`/launch/${launch.id}`}>
						<a className='block'>
							<p className='text-xl font-semibold text-white'>{launch.mission_name}</p>
							{detail && <p className='mt-3 text-base text-gray-400'>{detail}</p>}
						</a>
					</Link>
				</div>
				<div className='mt-3 relative'>
          <div className='flex space-x-0.5 items-center'>
            <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true"/>
            <p>{formatDate(new Date(launch.launch_date_utc))}</p>
          </div>
					<span
						className={`${
							launch.launch_success ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'
						} px-2 py-1 text-xs font-bold rounded-full absolute right-0 bottom-0`}
					>
						{launch.launch_success ? 'Success' : 'Failed'}
					</span>
				</div>
			</div>
		</div>
	)
}
