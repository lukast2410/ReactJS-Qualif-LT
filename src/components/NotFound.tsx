export default function NotFound({ title, detail }) {
	return (
		<div className='max-w-screen-xl mx-auto pb-6'>
			<div className='w-full bg-blue-200 text-center rounded-lg px-4 py-10 mt-4'>
				<h1 className='text-blue-800 text-base sm:text-2xl font-bold'>{title}</h1>
				<p className='text-blue-700 text-sm sm:text-base font-medium'>{detail}</p>
			</div>
		</div>
	)
}
