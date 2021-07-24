import { useEffect } from 'react'
import { useState } from 'react'
import LaunchGrid from '../components/LaunchGrid'
import Layout from '../components/Layout'
import NotFound from '../components/NotFound'

export default function Favorites() {
	const [listFavorite, setListFavorite] = useState([])

	useEffect(() => {
		const storage = localStorage.getItem('launches')
		const list = JSON.parse(storage)
		setListFavorite(list)
	}, [])

	return (
		<Layout title='Favorites'>
			<div className='max-w-screen-xl px-5 py-5 bg-black text-white mx-auto'>
				<h1 className='text-lg text-left font-bold mt-3'>Your Favorites</h1>
				{listFavorite && listFavorite.length > 0 ? (
					<div className='mt-3 mx-auto grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:max-w-none'>
						{listFavorite.map((l, idx) => (
							<LaunchGrid launch={l} key={idx} />
						))}
					</div>
				) : (
					<NotFound title='You have no favorites' detail='Please add some launches to your favorites.' />
				)}
			</div>
		</Layout>
	)
}
