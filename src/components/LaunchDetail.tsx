import { DocumentTextIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useContext } from 'react'
import ReactPlayer from 'react-player'
import { LaunchContext } from '../contexts/LaunchContext'
import styles from '../../styles/Detail.module.css'

export default function LaunchDetail() {
	const [launch, setLaunch] = useContext(LaunchContext)
	return (
		<div className='mt-5 mx-auto'>
			<div className='flex flex-col'>
				<div className={styles.playerWrapper}>
					<ReactPlayer
						className={styles.reactPlayer}
						url={launch ? launch.links.video_link : '#'}
						controls={true}
						playing={true}
						width='100%'
						height='100%'
					/>
				</div>
				<div className='mt-3'>
					<h1 className='text-xl font-bold'>Descriptions</h1>
					<p className='mt-1'>{launch?.details}</p>
					{launch && launch.links.article_link && (
						<div className='flex justify-end mt-3'>
							<Link href={launch.links.article_link}>
								<a className='inline-flex items-center px-4 py-2 border border-white rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white'>
									<DocumentTextIcon className='-ml-1 mr-2 h-5 w-5 text-gray-900' aria-hidden='true' />
									View Article
								</a>
							</Link>
						</div>
					)}
				</div>
			</div>
			<div className='mt-10'>
				<div>
					<h3 className='text-lg leading-6 font-medium text-white'>Rocket Information</h3>
					<p className='mt-1 max-w-2xl text-sm text-gray-300'>Rocket details in this launch project.</p>
				</div>
				<div className='mt-4 border-t border-gray-700'>
					<dl className='sm:divide-y sm:divide-gray-700'>
						<div className='py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4'>
							<dt className='text-sm font-medium text-gray-100'>Rocket name</dt>
							<dd className='mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2'>
								{launch?.rocket.rocket_name}
							</dd>
						</div>
						<div className='py-4 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4'>
							<dt className='text-sm font-medium text-gray-100'>Rocket type</dt>
							<dd className='mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2'>
								{launch?.rocket.rocket_type}
							</dd>
						</div>
						<div className='py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4'>
							<dt className='text-sm font-medium text-gray-100'>Company</dt>
							<dd className='mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2'>
								{launch?.rocket.rocket.company}
							</dd>
						</div>
						<div className='py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4'>
							<dt className='text-sm font-medium text-gray-100'>Country</dt>
							<dd className='mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2'>
								{launch?.rocket.rocket.country}
							</dd>
						</div>
						<div className='py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4'>
							<dt className='text-sm font-medium text-gray-100'>Diameter</dt>
							<dd className='mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2'>
								{launch?.rocket.rocket.diameter.meters} meters
							</dd>
						</div>
						<div className='py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4'>
							<dt className='text-sm font-medium text-gray-100'>Height</dt>
							<dd className='mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2'>
								{launch?.rocket.rocket.height.meters} meters
							</dd>
						</div>
						<div className='py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4'>
							<dt className='text-sm font-medium text-gray-100'>Description</dt>
							<dd className='mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2'>
								{launch?.rocket.rocket.description}
							</dd>
						</div>
					</dl>
				</div>
			</div>
		</div>
	)
}
