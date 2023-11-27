// react
import { useState, Fragment } from 'react'
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

const stockModal = ({ isOpen, closeModal }) => {
	// state
	const [showSection, setShowSection] = useState(false)
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

	// section for liquids
	const hiddenSection = (
		<div className='flex flex-wrap -mx-3 mb-2'>
			<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
				<label
					className='block text-gray-700 text-sm font-bold mb-2'
					htmlFor='grid-product-content'
				>
					Contenido del producto
				</label>
				<input
					className='shadow appearance-none border rounded w-full mb-2 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
					id='grid-product-content'
					type='text'
					placeholder='120mL'
				/>
				<p className='text-red-500 text-xs italic'>
					Please fill out this field.
				</p>
			</div>
			<div className='w-full md:w-1/2 pl-1 pr-3'>
				<label
					className='block text-gray-700 text-sm font-bold mb-2'
					htmlFor='grid-product-type'
				>
					Densidad del producto
				</label>
				<input
					className='shadow appearance-none border rounded w-full mb-2 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
					id='grid-product-density'
					type='text'
					placeholder='120gr/mL'
				/>
			</div>
		</div>
	)

	const onChangeCheckbox = e => {
		setShowSection(!showSection)
		console.log(e.target.checked)
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
							<Dialog.Panel className='transform w-full max-w-2xl w-lg overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
								<Dialog.Title
									as='h3'
									className='text-lg font-medium leading-6 text-gray-900 border-b pb-2 mb-4'
								>
									Ingresar Nuevo Producto
								</Dialog.Title>
								<div className='mt-2 flex'>
									<form className='w-full' onSubmit={onSubmitFormHandler}>
										{/* Name and Brand */}
										<div className='flex flex-wrap -mx-3 mb-2'>
											<div className='w-full md:w-4/6 px-3 mb-6 md:mb-0'>
												<label
													className='block text-gray-700 text-sm font-bold mb-2'
													htmlFor='grid-product-name'
												>
													Nombre del producto
												</label>
												<input
													className='shadow appearance-none border rounded w-full mb-2 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
													id='grid-product-name'
													type='text'
													placeholder='Nombre del producto'
												/>
												<p className='text-red-500 text-xs italic'>
													Please fill out this field.
												</p>
											</div>
											<div className='w-full md:w-2/6 pl-1 pr-3'>
												<label
													className='block text-gray-700 text-sm font-bold mb-2'
													htmlFor='grid-brand'
												>
													Marca
												</label>
												<select
													id='brands'
													className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
												>
													<option defaultValue>Seleccione una marca</option>
													<option value='Portugal'>Portugal</option>
													<option value='BabySec'>BabySec</option>
													<option value='IQfarma'>IQfarma</option>
													<option value='Alkofarma'>Alkofarma</option>
												</select>
											</div>
										</div>
										{/* Product type - Product classification - expiration date*/}
										<div className='flex flex-wrap -mx-3 mb-2'>
											<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
												<label
													className='block text-gray-700 text-sm font-bold mb-2'
													htmlFor='grid-product-classification'
												>
													Clasificación del producto
												</label>
												<select
													id='product-classification'
													className='shadow appearance-none border rounded mb-2 w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
												>
													<option defaultValue>Elija la clasifiación</option>
													<option value='Orales'>Orales</option>
													<option value='Tópicas'>Tópicas</option>
													<option value='Óticos'>Óticos</option>
													<option value='Intradérmicos'>Intradérmicos</option>
												</select>
												<p className='text-red-500 text-xs italic'>
													Please fill out this field.
												</p>
											</div>
											<div className='w-full md:w-1/3 pl-1 pr-3'>
												<label
													className='block text-gray-700 text-sm font-bold mb-2'
													htmlFor='grid-product-type'
												>
													Tipo de producto
												</label>
												<select
													id='product-type'
													className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
												>
													<option defaultValue>
														Elija el tipo de producto
													</option>
													<option value='Tableta'>Tableta</option>
													<option value='Unitoma'>Unitoma</option>
													<option value='Ampolla'>Ampolla</option>
													<option value='Crema'>Crema</option>
												</select>
											</div>
											<div className='w-full md:w-1/3 pl-1 pr-3'>
												<label
													className='block text-gray-700 text-sm font-bold mb-2'
													htmlFor='grid-expiration-date'
												>
													Fecha de vencimiento
												</label>
												<input
													className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
													type='date'
												/>
											</div>
										</div>
										{/* Common name */}
										<div className='w-full md:w-full mb-2'>
											<label
												className='block text-gray-700 text-sm font-bold mb-2'
												htmlFor='grid-product-common-name'
											>
												¿Tiene un nombre común conocido? De ser así, indcarlo.
											</label>
											<input
												className='shadow appearance-none border rounded w-full mb-2 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
												id='grid-product-common-name'
												type='text'
												placeholder='Nombre común conocido'
											/>
											<p className='text-red-500 text-xs italic'>
												Please fill out this field.
											</p>
										</div>
										{/* Checkbox */}
										<div className='flex mb-2'>
											<div className='flex items-center mr-8'>
												<input onChange={onChangeCheckbox} type='checkbox' />
												<label
													className=' text-gray-700 text-sm mt-2 font-medium ml-2'
													htmlFor='liquid '
												>
													¿Es un líquido?
												</label>
											</div>
											<div className='flex items-center mr-4'>
												<input type='checkbox' />
												<label
													className=' text-gray-700 text-sm mt-2 font-medium ml-2'
													htmlFor='liquid '
												>
													¿Es mixto?
												</label>
											</div>
										</div>
										{/* Content - Density */}
										{showSection && hiddenSection}
										{/* Observations */}
										<div className='flex flex-wrap  mb-2'>
											<label
												htmlFor='product-observation'
												className='block text-gray-700 text-sm font-bold mb-2'
											>
												Ingrese alguna observación de ser necesario
											</label>
											<textarea
												id='product-observation'
												rows='3'
												className='shadow appearance-none border rounded w-full mb-2 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
												placeholder='Escriba un mensaje claro y sencillo'
											></textarea>
										</div>
										{/* divider */}
										<hr className='border border-gray-400' />
										{/* Second Section */}
										<h2 className='pt-2 ext-lg font-medium leading-6 text-gray-900 border-b pb-2 mb-4'>
											Sección de precio del producto
										</h2>
										{/* Price of the product */}
										<div className='w-full md:w-full mb-2'>
											<label
												className='block text-gray-700 text-sm font-bold mb-2'
												htmlFor='grid-product-price'
											>
												Indicar el precio a vender del producto
											</label>
											<input
												className='shadow appearance-none border rounded w-full mb-2 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
												id='grid-product-price'
												type='number'
												placeholder='S/'
											/>
											<p className='text-red-500 text-xs italic'>
												Please fill out this field.
											</p>
										</div>
										{/* If there is and observation */}
										<div className='flex flex-wrap  mb-2'>
											<label
												htmlFor='product-price-observation'
												className='block text-gray-700 text-sm font-bold mb-2'
											>
												Ingrese alguna observación de ser necesario
											</label>
											<textarea
												id='product-price-observation'
												rows='3'
												className='shadow appearance-none border rounded w-full mb-2 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
												placeholder='Escriba un mensaje claro y sencillo'
											></textarea>
										</div>
										{/* Divider */}
										<hr className='border border-gray-400' />
										{/* Third Section */}
										<h2 className='pt-2 ext-lg font-medium leading-6 text-gray-900 border-b pb-2 mb-4'>
											Sección de almacenamiento del producto
										</h2>
										<div className='w-full md:w-full mb-2'>
											<label
												className='block text-gray-700 text-sm font-bold mb-2'
												htmlFor='grid-product-stock'
											>
												Indicar la cantidad de stock del producto
											</label>
											<input
												className='shadow appearance-none border rounded w-full mb-2 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
												id='grid-product-stock'
												type='number'
												placeholder='1000'
											/>
											<p className='text-red-500 text-xs italic'>
												Please fill out this field.
											</p>
										</div>
										{/* If there is and observation */}
										<div className='flex flex-wrap  mb-2'>
											<label
												htmlFor='product-price-observation'
												className='block text-gray-700 text-sm font-bold mb-2'
											>
												Ingrese alguna observación de ser necesario
											</label>
											<textarea
												id='product-price-observation'
												rows='3'
												className='shadow appearance-none border rounded w-full mb-2 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
												placeholder='Escriba un mensaje claro y sencillo'
											></textarea>
										</div>
										{/* Fourth Section */}
										<h2 className='pt-2 ext-lg font-medium leading-6 text-gray-900 border-b pb-2 mb-4'>
											Sección de funcionalidad del producto
										</h2>
										{/* Function */}
										<div className='flex justify-items-center'>
											<p>Nombre del producto:</p>{' '}
											<span className=' text-gray-700 text-sm font-bold ml-2 mt-1 mb-2 underline'>
												Amoxicilina con ácido clavulanico
											</span>
										</div>
										<div className='w-full  mb-2'>
											<label
												className='block text-gray-700 text-sm font-bold mb-2'
												htmlFor='grid-product-classification'
											>
												Ingrese la funcionalidad del producto
											</label>
											<select
												id='product-classification'
												className='shadow appearance-none border rounded mb-2 w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
											>
												<option defaultValue>Elija la funcionalidad</option>
												<option value='Antipirético'>Antipirético</option>
												<option value='Antitusigeno'>Antitusigeno</option>
												<option value='Descongestionante'>
													Descongestionante
												</option>
												<option value='Antibiótico'>Antibiótico</option>
											</select>
											<p className='text-red-500 text-xs italic'>
												Please fill out this field.
											</p>
										</div>
										{/* If there is and observation */}
										<div className='flex flex-wrap  mb-2'>
											<label
												htmlFor='product-price-observation'
												className='block text-gray-700 text-sm font-bold mb-2'
											>
												Ingrese alguna observación de ser necesario
											</label>
											<textarea
												id='product-price-observation'
												rows='3'
												className='shadow appearance-none border rounded w-full mb-2 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
												placeholder='Escriba un mensaje claro y sencillo'
											></textarea>
										</div>

										<div className='text-center mt-4'>
											<button
												type='submit'
												className=' inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
											>
												Nuevo
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

export default stockModal
