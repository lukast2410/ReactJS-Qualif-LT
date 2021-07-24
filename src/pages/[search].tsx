import { gql } from '@apollo/client'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import client from '../../apollo-client'
import Layout from '../components/Layout'
import LaunchGrid from '../components/LaunchGrid'
import { RefreshIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import NotFound from '../components/NotFound'

export default function Search({ launches }) {
	const router = useRouter()
	const search = router.query.search
	const [listLaunch, setListLaunch] = useState(launches.data)
	const [start, setStart] = useState(12)
	const [isLoading, setLoading] = useState(false)

	useEffect(() => {
		setListLaunch(launches.data)
	}, [launches])

	const loadMore = async () => {
		setLoading(true)
		const { data } = await client.query({
			query: gql`
				query GetLaunches($limit: Int, $start: Int, $search: String) {
					launchesPastResult(limit: $limit, offset: $start, find: { mission_name: $search }) {
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
			variables: {
				limit: 12,
				start: start,
				search: search,
			},
		})
		const result = data.launchesPastResult.data
		setLoading(false)
		setStart(start + 12)
		setListLaunch([...listLaunch, ...result])
	}

	return (
		<Layout title='SpaceLT'>
			<div className='max-w-screen-xl px-5 py-5 bg-black text-white mx-auto'>
				<h1 className='text-lg text-left font-bold'>You search for "{search}"</h1>
				{listLaunch.length == 0 ? (
					<NotFound title='Not Found' detail='Please try another keyword.' />
				) : (
					<>
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
									<RefreshIcon
										className={`${isLoading ? 'animate-spin' : ''} -ml-1 mr-2 h-5 w-5`}
										aria-hidden='true'
									/>
									Load More
								</button>
							</div>
						)}
					</>
				)}
			</div>
		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const search = query.search

	const { data } = await client.query({
		query: gql`
			query GetLaunches($limit: Int, $start: Int, $search: String) {
				launchesPastResult(limit: $limit, offset: $start, find: { mission_name: $search }) {
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
		variables: {
			limit: 12,
			start: 0,
			search: search,
		},
	})

	return {
		props: {
			launches: data.launchesPastResult,
		},
	}
}
