import { useSelector } from 'react-redux'

const Products = () => {
	const products = useSelector(
		state => state.productReducer.products.listOfProducts,
	)

	return (
		<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
			<div className='flex justify-end pb-4 bg-white dark:bg-gray-900'>
				<label htmlFor='table-search' className='sr-only'>
					Search
				</label>
				<div className='relative mt-1'>
					<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
						<svg
							className='w-4 h-4 text-gray-500 dark:text-gray-400'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 20 20'
						>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
							/>
						</svg>
					</div>
					<input
						type='text'
						id='table-search'
						className='block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='Search for items'
					/>
				</div>
			</div>
			<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
				<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
					<tr>
						<th scope='col' className='px-6 py-3'>
							Nombre del producto
						</th>
						<th scope='col' className='px-6 py-3'>
							Usuario Creador
						</th>
						<th scope='col' className='px-6 py-3'>
							Fecha de creación
						</th>
						<th scope='col' className='px-6 py-3'>
							Estado
						</th>
						<th scope='col' className='px-6 py-3'>
							Es Mixto
						</th>
						<th scope='col' className='px-6 py-3'>
							Ver detalle
						</th>
						<th scope='col' className='px-6 py-3'>
							Acción
						</th>
					</tr>
				</thead>
				<tbody>
					{products.map(product => {
						return (
							<tr
								key={product.product_id}
								className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
							>
								<td
									scope='row'
									className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
								>
									{product.name}
								</td>
								<td className='px-6 py-4'>{product.user_worker.worker.name}</td>
								<td className='px-6 py-4'>{product.created_date}</td>
								<td className='px-6 py-4'>{product.status}</td>
								<td className='px-6 py-4'>{product.is_mixed}</td>
								<td className='px-6 py-4'>
									<a
										href='#'
										className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
									>
										Ver detalle
									</a>
								</td>
								<td className='px-6 py-4'>
									<a
										href='#'
										className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
									>
										Edición
									</a>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default Products
