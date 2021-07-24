import { gql } from '@apollo/client'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import ReactPlayer from 'react-player'
import client from '../../apollo-client'
import Layout from '../components/Layout'
import Image from 'next/image'
import { PlayIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import LaunchGrid from '../components/LaunchGrid'
import { RefreshIcon } from '@heroicons/react/outline'
import styles from '../../styles/Home.module.css'

export default function Home({ launches }) {
	const [isPlaying, setPlaying] = useState(true)
	const [listLaunch, setListLaunch] = useState(launches.data)
	const [start, setStart] = useState(12)
  const [isLoading, setLoading] = useState(false)

	const loadMore = async () => {
    setLoading(true)
		const { data } = await client.query({
			query: gql`
				query GetLaunches {
					launchesPastResult(limit: ${12}, offset: ${start}) {
						result {
							totalCount
						}
						data {
							id
							details
							mission_name
							links {
								flickr_images
							}
							launch_success
							launch_date_utc
						}
					}
				}
			`,
		})
    const result = data.launchesPastResult.data
    setLoading(false)
    setStart(start + 12)
    setListLaunch([...listLaunch, ...result])
	}

	return (
		<Layout title='SpaceLT'>
			<div className='sm:hidden relative h-96 w-full'>
				<Image src='/falcon.jpg' layout='fill' className='max-h-80 overflow-hidden' />
				<div className='absolute h-full flex justify-end items-center flex-col w-full bg-gradient-to-t from-black'>
					<p className='text-2xl text-white font-bold mb-4'>Falcon Heavy Launch</p>
					<Link href='https://www.youtube.com/watch?v=sX1Y2JMK6g8'>
						<a className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-white hover:bg-gray-200 focus:outline-none'>
							<PlayIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
							Watch Video
						</a>
					</Link>
				</div>
			</div>
			<div className='hidden sm:block relative w-full overflow-hidden lg:-mt-16 lg:max-h-screen'>
				<div className={styles.playerWrapper}>
					<ReactPlayer
						url='https://www.youtube.com/watch?v=sX1Y2JMK6g8'
						playing={true}
						muted={true}
						width='100%'
						height='56vw'
						loop={true}
						className={styles.reactPlayer}
					/>
				</div>
				<div className='z-10 absolute flex items-center justify-center flex-col top-0 w-full h-full bg-gradient-to-t via-transparent from-black'>
					<p className='text-5xl font-bold text-white pb-2'>FALCON HEAVY LAUNCH</p>
					<p className='text-lg font-medium text-white'>THE WORLD’S MOST POWERFUL ROCKET</p>
				</div>
			</div>
			<div className='max-w-screen-xl px-5 py-5 bg-black text-white mx-auto'>
				<h1 className='text-lg text-left font-bold mt-3'>SpaceLT Launches</h1>
				<div className='mt-3 mx-auto grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:max-w-none'>
					{listLaunch.map((l, idx) => (
						<LaunchGrid launch={l} key={idx} />
					))}
				</div>
        {listLaunch.length < launches.result.totalCount && (
          <div className='flex justify-center mt-5'>
            <button
              type='button'
              className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-white hover:bg-gray-200 focus:outline-none'
              onClick={loadMore}
            >
              <RefreshIcon className={`${isLoading ? 'animate-spin' : ''} -ml-1 mr-2 h-5 w-5`} aria-hidden='true' />
              Load More
            </button>
          </div>
        )}
			</div>
		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps = async () => {
	const { data } = await client.query({
		query: gql`
			query GetLaunches {
				launchesPastResult(limit: 12, offset: 0) {
					result {
						totalCount
					}
					data {
						id
						details
						mission_name
						links {
							flickr_images
						}
						launch_success
						launch_date_utc
					}
				}
			}
		`,
	})
	console.log(data)

	return {
		props: {
			launches: data.launchesPastResult,
		},
	}
}
