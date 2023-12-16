// react
import { useState, useEffect } from 'react'
// redux
import { useSelector, useDispatch } from 'react-redux'
// react hook form
import { useForm, Controller } from 'react-hook-form'
// react-select
import Select from 'react-select'
// utils
import {
	searchForAProductByNameInSupabase,
	insertNewProductInSupabase,
} from '../../../../utils/warehouse'
// store
import { warehouseSliceAction } from '../../../../store/warehouseStore/warehouse-redux'
// tabler icon
import {
	IconCircleArrowRight,
	IconInfoHexagon,
	IconListCheck,
	IconCircleCheck,
	IconFlag2Filled,
	IconLink,
} from '@tabler/icons-react'
// components
import AddBrandModal from './AddBrandModal/AddBrandModal'
import AddClassificationModal from './AddClassificationModal/AddClassificationModal'
import AddProductTypeModal from './AddProductTypeModal/AddProductTypeModal'

const StepOne = ({ nextStep }) => {
	const dispatch = useDispatch()
	const brands = useSelector(state => state.warehouseReducer.productBrand)
	const classifications = useSelector(
		state => state.warehouseReducer.productClassification,
	)
	const types = useSelector(state => state.warehouseReducer.productType)
	const [showSection, setShowSection] = useState(false)
	const [showList, setShowList] = useState(false)
	const [searchedProducts, setSearchedProducts] = useState([])
	const [inputQuery, setInputQuery] = useState('')
	const [repeatedProduct, setRepeatedProduct] = useState(false)
	const [repeatedProductErrorMessage, setRepeatedProductErrorMessage] =
		useState('')
	const {
		control,
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()
	const [openBrandModal, setOpenBrandModal] = useState(false)
	const [openClassificationModal, setOpenClassificationModal] = useState(false)
	const [openProductTypeModal, setOpenProductTypeModal] = useState(false)

	// Product Brand Modal
	const openBrandModalHandler = () => {
		setOpenBrandModal(true)
	}

	const closeBrandModalHandler = () => {
		setOpenBrandModal(false)
		// 👁️ hides modal message when closing modal
		dispatch(warehouseSliceAction.changeModalMessage())
	}

	// Product Classification Modal
	const openClassificationModalHandler = () => {
		setOpenClassificationModal(true)
	}

	const closeClassificationModalHandler = () => {
		setOpenClassificationModal(false)
		// 👁️ hides modal message when closing modal
		dispatch(warehouseSliceAction.changeModalMessage())
	}

	// Product Type Modal
	const openProductTypeModalHandler = () => {
		setOpenProductTypeModal(true)
	}

	const closeProductTypeModalHandler = () => {
		setOpenProductTypeModal(false)
		// 👁️ hides modal message when closing modal
		dispatch(warehouseSliceAction.changeModalMessage())
	}

	const onSubmitFormHandler = handleSubmit(data => {
		if (repeatedProduct) {
			return
		}
		const insertData = {
			name: data.productName,
			common_name: data.productCommonName,
			product_brand_id: data.productBrand.value,
			product_classification_id: data.productClassification.value,
			product_type_id: data.productType.value,
			content: data.productContent,
			density: data.productDensity,
			user_worker_id: JSON.parse(localStorage.getItem('session'))
				.user_worker_id, // gets data from the user logged
			created_date: getCurrentDate(),
			expire_date: data.productExpirationDate,
			state: 1,
			isCompleted: 1,
			observation: data.productObservation,
			is_mixed: data.productMixed ? 1 : 0,
			isAssigned: 0,
		}

		console.log(insertData)

		insertNewProductInSupabase(insertData).then(response => {
			console.log(response)
			if (response === null) {
				dispatch(warehouseSliceAction.getInsertedProduct(response[0]))
				// cleans all the fields
				reset()
			}
		})

		nextStep()
	})

	const onChangeCheckbox = () => {
		setShowSection(!showSection)
	}

	const getCurrentDate = () => {
		const date = new Date()
		let day = date.getDate()
		let month = date.getMonth() + 1
		let year = date.getFullYear()
		// This arrangement can be altered based on how we want the date's format to appe
		let currentDate = `${day}/${month}/${year}`
		return currentDate
	}

	// hidden section for liquids
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
					{...register('productContent', {
						required: {
							value: showSection ? true : false,
							message: 'Este campo es obligatorio',
						},
					})}
				/>
				<p className='text-red-500 text-xs italic'>
					{errors.productContent && errors.productContent.message}
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
					{...register('productDensity', {
						required: {
							value: showSection ? true : false,
							message: 'Este campo es obligatorio',
						},
					})}
				/>
				<p className='text-red-500 text-xs italic'>
					{errors.productDensity && errors.productDensity.message}
				</p>
			</div>
		</div>
	)

	useEffect(() => {
		// stop when the input is emtpy
		if (inputQuery === '' || inputQuery === ' ') {
			setRepeatedProduct(false)
			setRepeatedProductErrorMessage('')
			setShowList(false)
			return
		}

		// search 500ms after the user stops typing
		const onSearchProductNameInSupabase = setTimeout(() => {
			searchForAProductByNameInSupabase(inputQuery).then(response => {
				if (response.length > 0) {
					if (response[0].name === inputQuery) {
						setRepeatedProduct(true)
						setRepeatedProductErrorMessage(
							'Este producto ya se encuentra registrado en la base de datos',
						)
					}
					setShowList(true)
					setSearchedProducts(response)
				} else {
					setRepeatedProduct(false)
					setRepeatedProductErrorMessage('')
				}
			})
			// })
		}, 500)

		// clean the timeout
		return () => clearTimeout(onSearchProductNameInSupabase)
	}, [inputQuery])

	return (
		// STEP ONE - INSERT PRODUCT INFORMATION
		<>
			<form className='w-full' onSubmit={onSubmitFormHandler}>
				<h3 className='text-lg font-medium leading-6 text-gray-900 border-b pb-2 mb-2'>
					Ingresar Nuevo Producto
				</h3>

				{/* helpful information for the user */}
				<div className='w-full bg-gray-50 border-l-4 border-gray-200 py-2 px-4 mb-4 '>
					<p className='text-gray-500 text-sm font-semibold flex items-center'>
						<IconInfoHexagon size={18} className='mr-2' /> Ejemplo de ingreso de
						nombre:{' '}
						<span className='font-bold ml-1'> Paracetamol 120mg/5mL </span>
					</p>
				</div>

				{/* Name of product */}
				<div className='flex flex-wrap -mx-3 mb-4'>
					<div className='w-full px-3 mb-6 md:mb-0'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='grid-product-name'
						>
							Nombre del producto
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-1.5 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
							id='grid-product-name'
							type='text'
							placeholder='Nombre del producto'
							{...register('productName', {
								required: {
									value: true,
									message: 'Este campo es obligatorio',
								},
								onChange: e => setInputQuery(e.target.value),
							})}
						/>
						<p className='text-red-500 text-xs italic'>
							{repeatedProduct ? repeatedProductErrorMessage : null}
						</p>

						{showList && (
							<div className='bg-gray-50  border-l-4 border-gray-200 mt-2 py-2 px-4'>
								<p className='flex items-center font-light mb-2'>
									{' '}
									<IconListCheck size={18} className='mr-2' /> Lista de
									productos existentes
								</p>
								<ul>
									{searchedProducts.map(product => (
										<li
											className=' flex items-center text-sm font-semibold'
											key={product.product_id}
										>
											<IconCircleCheck
												size={18}
												className='text-card-color-2 mr-2'
											/>{' '}
											<span className='text-card-color-4 font-semibold'>
												{product.name}
											</span>
										</li>
									))}
								</ul>
							</div>
						)}
						<p className='text-red-500 text-xs italic'>
							{errors.productName && errors.productName.message}
						</p>
					</div>
				</div>

				{/* helpful information for the user */}
				<div className='w-full bg-gray-50 border-l-4 border-gray-200 py-2 px-4 mb-4 '>
					<p className='text-gray-500 text-sm font-semibold flex items-center mb-2'>
						<IconFlag2Filled size={18} className='mr-2' /> ¿No existe algun
						dato? Ingresalo en los siguientes enlances:
					</p>
					<ul className='text-sm text-gray-500 font-bold flex justify-between'>
						<li>
							<button
								type='button'
								onClick={openBrandModalHandler}
								className='flex items-center'
							>
								<IconLink size={18} className='mr-2' />
								Ingresar marca
							</button>
						</li>
						<li>
							{' '}
							<button
								type='button'
								className='flex items-center'
								onClick={openClassificationModalHandler}
							>
								<IconLink size={18} className='mr-2' />
								Ingresar Clasificación
							</button>
						</li>
						<li>
							{' '}
							<button
								type='button'
								className='flex items-center'
								onClick={openProductTypeModalHandler}
							>
								<IconLink size={18} className='mr-2' />
								Ingresar tipo de producto
							</button>
						</li>
					</ul>
				</div>

				{/* Product brand -  Product classification */}
				<div className='flex flex-wrap mb-2'>
					<div className='w-full md:w-1/2 pr-3'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='grid-brand'
						>
							Marca
						</label>
						<div className='flex flex-col'>
							<Controller
								name='productBrand'
								control={control}
								rules={{
									value: true,
									required: 'Este campo es obligatorio',
								}}
								render={({ field }) => (
									<Select name='productBrand' {...field} options={brands} />
								)}
							/>
						</div>
						<p className='text-red-500 text-xs italic'>
							{errors.productBrand && errors.productBrand.message}
						</p>
					</div>
					<div className='w-full md:w-1/2 mb-6 md:mb-0'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='grid-product-classification'
						>
							Clasificación del producto
						</label>
						<Controller
							name='productClassification'
							control={control}
							rules={{
								value: true,
								required: 'Este campo es obligatorio',
							}}
							render={({ field }) => (
								<Select
									name='productClassification'
									{...field}
									options={classifications}
								/>
							)}
						/>
						<p className='text-red-500 text-xs italic'>
							{errors.productClassification &&
								errors.productClassification.message}
						</p>
					</div>
				</div>

				{/* Product type - Expiration date */}
				<div className='flex flex-wrap mb-2'>
					<div className='w-full md:w-1/2 pr-3'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='grid-product-type'
						>
							Tipo de producto
						</label>
						<Controller
							name='productType'
							control={control}
							rules={{
								value: true,
								required: 'Este campo es obligatorio',
							}}
							render={({ field }) => (
								<Select name='productType' {...field} options={types} />
							)}
						/>
						<p className='text-red-500 text-xs italic'>
							{errors.productType && errors.productType.message}
						</p>
					</div>
					<div className='w-full md:w-1/2'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='grid-expiration-date'
						>
							Fecha de vencimiento
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
							type='date'
							{...register('productExpirationDate', {
								required: {
									value: true,
									message: 'Este campo es obligatorio',
								},
							})}
						/>
						<p className='text-red-500 text-xs italic'>
							{errors.productExpirationDate &&
								errors.productExpirationDate.message}
						</p>
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
						{...register('productCommonName')}
					/>
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
						<input
							type='checkbox'
							htmlFor='mixed '
							{...register('productMixed')}
						/>
						<label className=' text-gray-700 text-sm mt-2 font-medium ml-2'>
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
						{...register('productObservation')}
					></textarea>
				</div>

				<div className='flex justify-end mt-4'>
					<button
						type='submit'
						className=' inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
					>
						Siguiente
						<IconCircleArrowRight className='ml-2' />
					</button>
				</div>
			</form>
			{/* Add Product Brand - Product Classification - Product Type Modal */}
			{openBrandModal && (
				<AddBrandModal
					isOpen={openBrandModal}
					closeModal={closeBrandModalHandler}
				/>
			)}
			{openClassificationModal && (
				<AddClassificationModal
					isOpen={openClassificationModal}
					closeModal={closeClassificationModalHandler}
				/>
			)}
			{openProductTypeModal && (
				<AddProductTypeModal
					isOpen={openProductTypeModal}
					closeModal={closeProductTypeModalHandler}
				/>
			)}
		</>
	)
}

export default StepOne
