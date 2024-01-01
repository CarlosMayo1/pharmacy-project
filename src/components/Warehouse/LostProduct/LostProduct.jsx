// react
import { useState, useEffect } from 'react'
// react-redux
import { useSelector, useDispatch } from 'react-redux'
// tabler icon
import { IconEdit, IconTrash } from '@tabler/icons-react'
// store
import { fetchLostProducts } from '../../../store/warehouseStore/warehouse-thunk'
// components
import AddLostProduct from './AddLostProduct/AddLostProduct'
import EditLostProduct from './EditLostProduct/EditLostProduct'
import { warehouseSliceAction } from '../../../store/warehouseStore/warehouse-redux'

const LostProducts = () => {
	const lostProducts = useSelector(state => state.warehouseReducer.lostProducts)
	const dispatch = useDispatch()
	const [isOpen, setIsOpen] = useState(false)
	const [isOpenEditModal, setIsOpenEditModal] = useState(false)

	const openModal = () => {
		setIsOpen(true)
	}

	const closeModal = () => {
		setIsOpen(false)
	}

	const openEditModal = lostProduct => {
		dispatch(warehouseSliceAction.getEditLostProduct(lostProduct))
		setIsOpenEditModal(true)
	}

	const closeEditModal = () => {
		setIsOpenEditModal(false)
	}

	const formatDate = newDate => {
		const date = new Date(newDate)
		let day = date.getDate()
		let month = date.getMonth() + 1
		let year = date.getFullYear()
		// This arrangement can be altered based on how we want the date's format to appe
		let currentDate = `${day}/${month}/${year}`
		return currentDate
	}

	useEffect(() => {
		// fetch all the lost products from supabase
		dispatch(fetchLostProducts())
	}, [])

	return (
		<>
			<h1 className='mb-2 text-lg font-bold'>Lista de productos perdidos</h1>
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
				<div className='flex items-center justify-between  pb-4 bg-white dark:bg-gray-900'>
					<form>
						<div className='flex items-center'>
							<input
								id='default-checkbox'
								type='checkbox'
								value=''
								className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
							/>
							<label
								htmlFor='default-checkbox'
								className='mt-2 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
							>
								Visualizar todo
							</label>
						</div>
					</form>

					<div className='relative'>
						<label htmlFor='table-search' className='sr-only'>
							Search
						</label>
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
				<table className='border-collapse w-full text-sm text-left text-gray-500 dark:text-gray-400'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th scope='col' className='px-1.5 py-1.5 border'>
								Nombre del producto
							</th>
							<th scope='col' className='px-1.5 py-1.5 border'>
								Uni
							</th>
							{/* <th scope='col' className='px-3 py-3 border'>
								Fecha de vencimiento
							</th> */}
							<th scope='col' className='px-1.5 py-1.5 border'>
								Causa de perdida de producto
							</th>
							<th scope='col' className='px-3 py-3 border'>
								Fecha
							</th>
							<th scope='col' className='px-3 py-3 border'>
								Reportado por
							</th>
							<th scope='col' className='px-1.5 py-1.5 border'>
								Acción
							</th>
						</tr>
					</thead>
					<tbody>
						{lostProducts.map(lostProduct => (
							<tr key={lostProduct.lost_product_id} className='bg-white'>
								<td
									scope='row'
									className='border px-1.5 py-1.5 font-medium text-gray-900 whitespace-nowrap dark:text-white'
								>
									{lostProduct.product.name}
								</td>
								<td className='border px-1.5 py-1.5'>{lostProduct.amount}</td>
								<td className='border px-1.5 py-1.5'>{lostProduct.cause}</td>
								<td className='border px-1.5 py-1.5'>
									{formatDate(lostProduct.created_date)}
								</td>
								<td className='border px-1.5 py-1.5'>
									{lostProduct.user_worker.worker.name}
								</td>
								<td className='border px-1.5 py-1.5 flex justify-between'>
									<button
										type='button'
										onClick={() => openEditModal(lostProduct)}
										className='bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-1.5 rounded'
									>
										<IconEdit size={18} />
									</button>
									<button
										type='button'
										onClick={() => console.log('working')}
										className='bg-card-color-4 hover:bg-card-color-8 text-white font-bold py-1 px-1.5 rounded'
									>
										<IconTrash size={18} />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/* HeadlessUI */}
			{isOpen && <AddLostProduct isOpen={isOpen} closeModal={closeModal} />}
			{isOpenEditModal && (
				<EditLostProduct
					isOpenEditModal={isOpenEditModal}
					closeEditModal={closeEditModal}
				/>
			)}
		</>
	)
}

export default LostProducts

// 	className='bg-card-color-4 hover:bg-card-color-8 text-white font-bold py-1 px-2 rounded'
