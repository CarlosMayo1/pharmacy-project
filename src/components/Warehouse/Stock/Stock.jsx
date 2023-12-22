// react
import { useState, useEffect } from 'react'
// redux
import { useSelector, useDispatch } from 'react-redux'
import { addProductModal } from '../../../store/warehouseStore/warehouse-thunk'
// tabler icon
import { IconEye, IconTrash, IconEdit } from '@tabler/icons-react'
// componets
import AddProductModal from './StockModal/StockModal'

const StockProducts = () => {
	const listOfProducts = useSelector(
		state => state.warehouseReducer.listOfProducts,
	)
	// state
	const dispatch = useDispatch()
	// headlessUI state
	const [isOpen, setIsOpen] = useState(false)

	const closeModal = () => {
		setIsOpen(false)
	}

	const openModal = () => {
		// dispatch(priceSliceAction.editPrice(item))
		setIsOpen(true)
	}

	useEffect(() => {
		dispatch(addProductModal())
	}, [])

	const formatDate = d => {
		const date = new Date(d)
		let day = date.getDate()
		let month = date.getMonth() + 1
		let year = date.getFullYear()
		// This arrangement can be altered based on how we want the date's format to appe
		let currentDate = `${day}/${month}/${year}`
		return currentDate
	}

	return (
		<>
			<h1 className='mb-2 text-lg font-bold'>Tabla de almacen</h1>
			<div>
				{/* Button */}
				<div className='mb-2'>
					<button
						type='button'
						onClick={openModal}
						className='bg-pharmacy-color-1 hover:bg-pharmacy-color-5 text-white font-bold py-2 px-4 rounded'
					>
						Agregar
					</button>
				</div>
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
				<table className='border-collapse border w-full text-sm text-left text-gray-500 dark:text-gray-400'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th scope='col' className='px-1.5 py-1.5 border'>
								Nombre del producto
							</th>
							<th scope='col' className='px-1.5 py-1.5 border'>
								Cantidad
							</th>
							<th scope='col' className='px-1.5 py-1.5 border'>
								Fecha de vencimiento
							</th>
							<th scope='col' className='px-1.5 py-1.5 border'>
								Observaciones
							</th>
							<th scope='col' className='text-center py-1.5 border'>
								Detalle
							</th>
							<th scope='col' className='py-1.5 border text-center'>
								Acción
							</th>
						</tr>
					</thead>
					<tbody>
						{listOfProducts.map(product => {
							return (
								<tr key={product.product_id} className='bg-white'>
									<td
										scope='row'
										className='border font-medium px-1.5 py-1 text-gray-900 whitespace-nowrap dark:text-white'
									>
										{product.name}
									</td>
									<td className='border'>{product.stock}</td>
									<td className='border'>{product.expire_date}</td>
									<td className='border'>{product.observation}</td>
									<td className='border '>
										<div className='flex justify-center py-1'>
											<button
												type='button'
												onClick={() => console.log('working')}
												className='bg-card-color-1 hover:bg-card-color-5 text-white font-bold py-1 px-1 rounded'
											>
												<IconEye size={18} />
											</button>
										</div>
									</td>
									<td className='border'>
										<div className='flex justify-evenly'>
											<button
												type='button'
												onClick={() => console.log('working')}
												className='bg-card-color-4 hover:bg-card-color-8 text-white font-bold py-1 px-1 rounded'
											>
												<IconTrash size={18} />
											</button>
											<button
												type='button'
												onClick={() => console.log('working')}
												className='bg-card-color-3 hover:bg-card-color-7 text-white font-bold py-1 px-1 rounded'
											>
												<IconEdit size={18} />
											</button>
										</div>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
			{/* HeadlessUI */}
			<AddProductModal isOpen={isOpen} closeModal={closeModal} />
		</>
	)
}

export default StockProducts
