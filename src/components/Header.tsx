import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, SearchIcon, XIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Header() {
	const router = useRouter()

	const handleSearch = async (e) => {
		e.preventDefault()
    router.replace(`/${e.target.search.value}`)
	}

	return (
		<Disclosure as='nav' className='bg-gray-800 z-50 relative'>
			{({ open }) => (
				<>
					<div className='max-w-7xl mx-auto px-2 sm:px-4 lg:px-8'>
						<div className='relative flex items-center justify-between h-16'>
							<div className='flex items-center px-2 lg:px-0'>
								<div className='flex-shrink-0 hidden lg:flex lg:items-center'>
									<Link href='/'>
										<a>
											<Image src={'/SpaceLT.png'} width={155} height={40} className='hidden lg:block' alt='Not Found'/>
										</a>
									</Link>
								</div>
								<div className='flex-shrink-0 flex items-center lg:hidden'>
									<Link href='/'>
										<a>
											<Image src={'/SpaceLT-logo.png'} width={40} height={40} className='block lg:hidden' alt='Not Found'/>
										</a>
									</Link>
								</div>
								<div className='hidden lg:block lg:ml-6'>
									<div className='flex space-x-4'>
										{/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
										<Link href='/'>
											<a
												className={`${
													router.route == '/'
														? 'bg-gray-900 text-white'
														: 'text-gray-300 hover:bg-gray-700 hover:text-white'
												} px-3 py-2 rounded-md text-sm font-medium`}
											>
												Home
											</a>
										</Link>
										<Link href='/favorites'>
											<a
												className={`${
													router.route.includes('favorites')
														? 'bg-gray-900 text-white'
														: 'text-gray-300 hover:bg-gray-700 hover:text-white'
												} px-3 py-2 rounded-md text-sm font-medium`}
											>
												Favorites
											</a>
										</Link>
									</div>
								</div>
							</div>
							<div className='flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end'>
								<div className='max-w-lg w-full lg:max-w-xs'>
									<label htmlFor='search' className='sr-only'>
										Search
									</label>
									<div className='relative'>
										<form onSubmit={handleSearch}>
											<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
												<SearchIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
											</div>
											<input
												id='search'
												name='search'
												className='block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 sm:text-sm'
												placeholder='Search'
												type='search'
											/>
										</form>
									</div>
								</div>
							</div>
							<div className='flex lg:hidden'>
								{/* Mobile menu button */}
								<Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
									<span className='sr-only'>Open main menu</span>
									{open ? (
										<XIcon className='block h-6 w-6' aria-hidden='true' />
									) : (
										<MenuIcon className='block h-6 w-6' aria-hidden='true' />
									)}
								</Disclosure.Button>
							</div>
						</div>
					</div>

					<Disclosure.Panel className='lg:hidden'>
						<div className='px-2 pt-2 pb-3 space-y-1'>
							<Link href='/'>
								<a
									className={`${
										router.route == '/'
											? 'bg-gray-900 text-white'
											: 'text-gray-300 hover:bg-gray-700 hover:text-white'
									} block px-3 py-2 rounded-md text-base font-medium`}
								>
									Home
								</a>
							</Link>
							<Link href='/favorites'>
								<a
									className={`${
										router.route.includes('favorites')
											? 'bg-gray-900 text-white'
											: 'text-gray-300 hover:bg-gray-700 hover:text-white'
									} block px-3 py-2 rounded-md text-base font-medium`}
								>
									Favorites
								</a>
							</Link>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	)
}
