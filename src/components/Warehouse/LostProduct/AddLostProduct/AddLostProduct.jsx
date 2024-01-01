// react
import { Fragment, useEffect } from 'react'
// react-redux
import { useSelector, useDispatch } from 'react-redux'
// react hook form
import { useForm, Controller } from 'react-hook-form'
// headless ui
import { Dialog, Transition } from '@headlessui/react'
// react-select
import Select from 'react-select'
// warehouse-thunk
import {
	fetchProductsForSelect,
	fetchLostProducts,
} from '../../../../store/warehouseStore/warehouse-thunk'
// store
import { insertNewLostProductInSupabase } from '../../../../utils/warehouse'
// components
import SuccessfulMessage from '../../AddProduct/StepOne/SuccessfulMessage/SuccessfulMessage'

const AddLostProduct = ({ isOpen, closeModal }) => {
	const products = useSelector(state => state.warehouseReducer.listOfProducts)
	const modalMessage = useSelector(state => state.warehouseReducer.modalMessage)
	const dispatch = useDispatch()
	const {
		control,
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const onSubmitFormHandler = handleSubmit(data => {
		const lostProduct = {
			product_id: data.product.value,
			user_worker: JSON.parse(localStorage.getItem('session')).user_worker_id,
			amount: data.amount,
			cause: data.productLostCause,
			created_date: getCurrentDate(),
			state: 1,
		}
		console.log(lostProduct)
		insertNewLostProductInSupabase(lostProduct).then(response => {
			if (response === null) {
				console.log('The information has been sent successfully')
				dispatch(fetchLostProducts())
			}
			// clean the form
			reset()
			closeModal()
		})
	})

	useEffect(() => {
		dispatch(fetchProductsForSelect())
	}, [])

	const getCurrentDate = () => {
		const date = new Date()
		let day = date.getDate()
		let month = date.getMonth() + 1
		let year = date.getFullYear()
		// This arrangement can be altered based on how we want the date's format to appe
		let currentDate = `${year}-${month}-${day}`
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
					<div className='fixed inset-0 bg-black/25' />
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
							<Dialog.Panel className='w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
								{modalMessage.show && <SuccessfulMessage />}
								<form className='w-full' onSubmit={onSubmitFormHandler}>
									<h3 className='text-lg font-medium leading-6 text-gray-900 border-b pb-2 mb-4'>
										Producto Perdido
									</h3>

									{/* Product */}
									<div className='flex flex-wrap -mx-3 mb-4'>
										<div className='w-full px-3 mb-6 md:mb-0'>
											<label
												className='block text-gray-700 text-sm font-bold mb-2'
												htmlFor='grid-product'
											>
												Seleccione el producto
											</label>
											<Controller
												name='product'
												control={control}
												rules={{
													value: true,
													message: 'Este campo es obligatorio',
												}}
												defaultValue=''
												render={({ field }) => (
													<Select {...field} options={products} />
												)}
											/>
										</div>
									</div>

									{/*  Amount */}
									<div className='flex flex-wrap -mx-3 mb-4'>
										<div className='w-full px-3 mb-6 md:mb-0'>
											<label
												className='block text-gray-700 text-sm font-bold mb-2'
												htmlFor='grid-amount'
											>
												Ingrese la cantidad
											</label>
											<input
												className='shadow appearance-none border rounded w-full py-1.5 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
												id='grid-amount'
												type='number'
												placeholder='1'
												{...register('amount', {
													required: {
														value: true,
														message: 'Este campo es obligatorio.',
													},
												})}
											/>
											<p className='text-red-500 text-xs italic'>
												{errors.amount && errors.amount.message}
											</p>
										</div>
									</div>

									<div className='flex flex-wrap  mb-2'>
										<label
											htmlFor='product-lost-cause'
											className='block text-gray-700 text-sm font-bold mb-2'
										>
											Ingresar el motivo de la perdida del producto
										</label>
										<textarea
											id='product-lost-cause'
											rows='3'
											className='shadow appearance-none border rounded w-full mb-2 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
											placeholder='Escriba un mensaje claro y sencillo'
											{...register('productLostCause')}
										></textarea>
									</div>

									<div className='flex justify-center mt-4'>
										<button
											type='submit'
											// disabled={disableSubmitButton}
											className='bg-blue-100 text-blue-900 hover:bg-blue-200 inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
										>
											Enviar
										</button>
									</div>
								</form>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}

export default AddLostProduct
{
	/* {showSpinner ? (
												<div role='status'>
													<svg
														aria-hidden='true'
														className='w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
														viewBox='0 0 100 101'
														fill='none'
														xmlns='http://www.w3.org/2000/svg'
													>
														<path
															d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
															fill='currentColor'
														/>
														<path
															d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
															fill='currentFill'
														/>
													</svg>
													<span className='sr-only'>Loading...</span>
												</div>
											) : (
												'Enviar'
											)} */
}
