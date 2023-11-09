import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { priceSliceAction } from '../../../store/priceStore/price-redux'

const ProductPrice = () => {
	const dispatch = useDispatch()
	const prices = useSelector(state => state.priceReducer.prices)

	console.log('prices')

	useEffect(() => {
		const productPrice = fetchProductPriceFromSupabase()
		productPrice.then(response => {
			// if status is ok
			if (response.status === 200) {
				console.log(response.data)
				dispatch(priceSliceAction.getPricesFromSupabase(response.data))
			}
		})
	}, [])

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
							Precio (S/)
						</th>
						<th scope='col' className='px-6 py-3'>
							Ver detalle
						</th>
						<th scope='col' className='px-6 py-3'>
							Acción
						</th>
						<th scope='col' className='px-6 py-3'>
							Estado
						</th>
					</tr>
				</thead>
				<tbody>
					{}
					<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
						<td
							scope='row'
							className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
						>
							Amoxicilina 125mg/5mL
						</td>
						<td className='px-6 py-4'>7.00</td>
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
						<td className='px-6 py-4'>Activo</td>
					</tr>
					<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
						<td
							scope='row'
							className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
						>
							Paracetamol 500mg
						</td>
						<td className='px-6 py-4'>0.30</td>
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
						<td className='px-6 py-4'>Activo</td>
					</tr>
					<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
						<td
							scope='row'
							className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
						>
							Repriman
						</td>
						<td className='px-6 py-4'>15.00</td>
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
						<td className='px-6 py-4'>Activo</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}
export default ProductPrice
