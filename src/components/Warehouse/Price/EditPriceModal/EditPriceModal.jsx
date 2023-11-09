// react
import { Fragment } from 'react'
// headlessUI
import { Dialog, Transition } from '@headlessui/react'
// redux
import { useSelector, useDispatch } from 'react-redux'
// react hook form
import { useForm } from 'react-hook-form'
// utils
import {
	fetchProductPriceFromSupabase,
	updateStatusOfPriceFromSupabase,
	createNewProductPrice,
} from '../../../../utils/price'
// store
import { priceSliceAction } from '../../../../store/priceStore/price-redux'

const EditPriceModal = ({ isOpen, closeModal }) => {
	// state
	const editPrice = useSelector(state => state.priceReducer.editPrice)
	const dispatch = useDispatch()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const onSubmitFormHandler = handleSubmit(data => {
		// data from the form
		console.log(data)
		const newData = {
			...data,
			date: getCurrentDate(),
		}
		// update the status of the price to inactive
		updateStatusOfPriceFromSupabase(data.product_price_id).then(response => {
			console.log(response)
		})
		// insert data
		createNewProductPrice(newData).then(response => {
			console.log(response)
			// fetch data after inserting
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
			closeModal()
		})
	})

	const getCurrentDate = () => {
		const date = new Date()
		let day = date.getDate()
		let month = date.getMonth() + 1
		let year = date.getFullYear()
		// This arrangement can be altered based on how we want the date's format to appe
		let currentDate = `${day}-${month}-${year}`
		return currentDate
	}

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as='div' className='relative z-10' onClose={closeModal}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-black bg-opacity-25' />
				</Transition.Child>

				<div className='fixed inset-0 overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4 text-center'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'
						>
							<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
								<Dialog.Title
									as='h3'
									className='text-lg font-medium leading-6 text-gray-900 border-b pb-2 mb-4'
								>
									Editar Precio
								</Dialog.Title>
								<div className='mt-2'>
									<form onSubmit={onSubmitFormHandler}>
										<div className='mb-4'>
											<input
												className='hidden shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
												id='product_price_id'
												type='text'
												placeholder='ID del precio'
												value={editPrice.product_price_id}
												readOnly={true}
												{...register('product_price_id')}
											/>
										</div>
										<div className='mb-4'>
											<input
												className='hidden shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
												id='product_detail_id'
												type='text'
												placeholder='ID del Producto'
												value={editPrice.product_detail.product_detail_id}
												readOnly={true}
												{...register('product_detail_id')}
											/>
										</div>
										<div className='mb-4'>
											<label
												className='block text-gray-700 text-sm font-bold mb-2'
												htmlFor='productName'
											>
												Nombre del producto
											</label>
											<input
												className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
												id='productName'
												type='text'
												placeholder='Nombre del producto'
												value={
													Object.keys(editPrice).length === 0 // if the object is empty
														? ''
														: editPrice.product_detail.product.name
												}
												readOnly={true}
											/>
										</div>
										<div className='mb-4'>
											<label
												className='block text-gray-700 text-sm font-bold mb-2'
												htmlFor='priceBefore'
											>
												Precio anterior
											</label>
											<input
												className='shadow appearance-none border rounded w-full py-2 px-3 bg-slate-100 text-gray-700 focus:outline-none focus:shadow-outline'
												id='priceBefore'
												type='text'
												placeholder='ID del producto'
												value={
													Object.keys(editPrice).length === 0
														? ''
														: editPrice.price.toFixed(2)
												}
												readOnly={true}
											/>
										</div>
										<div className='mb-4'>
											<label
												className='block text-gray-700 text-sm font-bold mb-2'
												htmlFor='newPrice'
											>
												Nuevo precio
											</label>
											<input
												className={`shadow ${
													errors.newPrice && 'border-red-500'
												} appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline`}
												id='newPrice'
												type='number'
												step='any'
												placeholder='Nuevo precio'
												{...register('newPrice', {
													required: {
														value: true,
														message: 'Se requiere completar este campo',
													},
												})}
											/>
											{errors.newPrice && (
												<span className='text-red-500 text-xs italic'>
													{errors.newPrice.message}
												</span>
											)}
										</div>
										<div className='text-center mt-4'>
											<button
												type='submit'
												className=' inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
											>
												Editar
											</button>
										</div>
									</form>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}

export default EditPriceModal
