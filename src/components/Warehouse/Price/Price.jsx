// react
import { useState, useEffect } from 'react'
// redux
import { useDispatch, useSelector } from 'react-redux'
// supabase
import { fetchProductPriceFromSupabase } from '../../../utils/price'
// store
import { priceSliceAction } from '../../../store/priceStore/price-redux'
// components
import EditPriceModal from './EditPriceModal/EditPriceModal'
// tablerIcon
import { IconEdit } from '@tabler/icons-react'

const Price = () => {
	const dispatch = useDispatch()
	// redux
	const prices = useSelector(state => state.priceReducer.prices)
	const changeSwitch = useSelector(state => state.priceReducer.change)

	// headlessUI state
	const [isOpen, setIsOpen] = useState(false)

	const closeModal = () => {
		setIsOpen(false)
	}

	const openModal = item => {
		dispatch(priceSliceAction.editPrice(item))
		setIsOpen(true)
	}

	useEffect(() => {
		// fetching the prices of the products
		fetchProductPriceFromSupabase().then(response => {
			console.log(response)
			const orderedData = response.sort((a, b) => {
				if (a.product_detail.product.name < b.product_detail.product.name) {
					return -1
				}
				if (a.product_detail.product.name > b.product_detail.product.name) {
					return 1
				}
				return 0
			})
			dispatch(priceSliceAction.getPricesFromSupabase(orderedData))
		})
	}, [changeSwitch])

	// Requires pagination
	return (
		<div className='p-6'>
			<h1 className='text-lg font-bold'>Tabla de Pricios de los productos</h1>
			<div>
				{/* Search bar */}
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
				{/* Table of prices */}
				<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th scope='col' className='px-6 py-3'>
								Nombre del producto
							</th>
							<th scope='col' className='px-6 py-3'>
								Classificacion
							</th>
							<th scope='col' className='px-6 py-3'>
								Tipo de producto
							</th>
							<th scope='col' className='px-6 py-3'>
								Precio (S/)
							</th>
							<th scope='col' className='px-6 py-3'>
								Acción
							</th>
						</tr>
					</thead>
					<tbody>
						{prices.map(item => (
							<tr
								key={item.product_price_id}
								className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
							>
								<td
									scope='row'
									className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
								>
									{item.product_detail.product.name}
								</td>
								<td className='px-6 py-4'>
									{item.product_detail.classification.description}
								</td>
								<td className='px-6 py-4'>
									{item.product_detail.product_type.description}
								</td>
								<td className='px-6 py-4'>{item.price.toFixed(2)}</td>
								<td className='px-6 py-4'>
									<button
										type='button'
										onClick={() => openModal(item)}
										className='bg-pharmacy-color-5 hover:bg-pharmacy-color-1 text-white font-bold py-1 px-2 rounded'
									>
										<IconEdit className='w-5' />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/* HeadlessUI */}
			{isOpen && <EditPriceModal isOpen={isOpen} closeModal={closeModal} />}
		</div>
	)
}

export default Price
