const ErrorMessage = ({ message }) => {
	return (
		<div
			className='bg-red-100 border flex flex-col items-center border-red-400 text-red-700 px-4 py-3 rounded relative'
			role='alert'
		>
			<strong className='font-bold mb-2 text-sXm'>Ha ocurrido un error</strong>
			<span className='block sm:inline text-xs'>{message}</span>
		</div>
	)
}

export default ErrorMessage
