export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const formatDate = (date) => {
	let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	let day = date.getDate()

	let monthIndex = date.getMonth()
	let monthName = monthNames[monthIndex]

	let year = date.getFullYear()

	return `${monthName} ${day}, ${year}`
}