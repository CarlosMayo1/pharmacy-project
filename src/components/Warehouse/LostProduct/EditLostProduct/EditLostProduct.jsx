// react
import { Fragment } from 'react'
// redux
import { useSelector, useDispatch } from 'react-redux'
// react hook form
import { useForm } from 'react-hook-form'
// headless-ui
import { Dialog, Transition } from '@headlessui/react'
// utils
import { updateLostProductInSupabase } from '../../../../utils/warehouse'
//readux-thunk
import { fetchLostProducts } from '../../../../store/warehouseStore/warehouse-thunk'

const EditLostProduct = ({ isOpenEditModal, closeEditModal }) => {
	const editLostProduct = useSelector(
		state => state.warehouseReducer.editLostProduct,
	)
	const dispatch = useDispatch()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			amount: editLostProduct.amount !== null ? editLostProduct.amount : '',
			productLostCause:
				editLostProduct.cause !== null ? editLostProduct.cause : '',
		},
	})

	const onSubmitFormHandler = handleSubmit(data => {
		const editedLostProduct = {
			lost_product_id: editLostProduct.lost_product_id,
			amount: data.amount,
			cause: data.productLostCause,
		}

		console.log(editedLostProduct)
		updateLostProductInSupabase(editedLostProduct).then(response => {
			console.log(response)
			// updates the list of lost products
			dispatch(fetchLostProducts())
		})
	})

	return (
		<Transition appear show={isOpenEditModal} as={Fragment}>
			<Dialog as='div' className='relative z-10' onClose={closeEditModal}>
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
								<form className='w-full' onSubmit={onSubmitFormHandler}>
									<h3 className='text-lg font-medium leading-6 text-gray-900 border-b pb-2 mb-4'>
										Editar Producto Perdido
									</h3>

									<h4 className='font-bold text-normal underline mb-2'>
										{editLostProduct.product.name}
									</h4>

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

export default EditLostProduct
