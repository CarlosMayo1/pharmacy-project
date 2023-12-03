// react
import { useState } from 'react'
// redux
import { useSelector } from 'react-redux'
// react hook form
import { useForm } from 'react-hook-form'

// tabler icon
import { IconCircleArrowRight } from '@tabler/icons-react'

const StepOne = ({ nextStep }) => {
	const brands = useSelector(state => state.warehouseReducer.productBrand)
	const classifications = useSelector(
		state => state.warehouseReducer.productClassification,
	)
	const productTypes = useSelector(state => state.warehouseReducer.productType)
	const [showSection, setShowSection] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const onSubmitFormHandler = handleSubmit(data => {
		console.log(data)
		// const newProduct = {
		// 	name: data.productName,
		// 	brandId
		// }

		// insert data into product table
		// data from the form
		// nextStep()
	})

	const onChangeCheckbox = e => {
		setShowSection(!showSection)
		console.log(e.target.checked)
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
					{...register('productVolume', {
						required: {
							value: showSection ? true : false,
							message: 'Este campo es obligatorio',
						},
					})}
				/>
				<p className='text-red-500 text-xs italic'>
					{errors.productVolume && errors.productVolume.message}
				</p>
			</div>
		</div>
	)

	return (
		// First Section
		<form className='w-full' onSubmit={onSubmitFormHandler}>
			<h3 className='text-lg font-medium leading-6 text-gray-900 border-b pb-2 mb-4'>
				Ingresar Nuevo Producto
			</h3>

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
						{...register('productName', {
							required: {
								value: true,
								message: 'Este campo es obligatorio',
							},
						})}
					/>
					<p className='text-red-500 text-xs italic'>
						{errors.productName && errors.productName.message}
					</p>
				</div>
				<div className='w-full md:w-2/6 pl-1 pr-3'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='grid-brand'
					>
						Marca
					</label>
					<div className='flex flex-col'>
						<select
							id='brands'
							className='shadow appearance-none border rounded w-full mb-2 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
							{...register('productBrand', {
								required: {
									value: true,
									message: 'Este campo es obligatorio',
								},
							})}
						>
							<option value='' defaultValue>
								Seleccione una marca
							</option>
							{brands.map(brand => (
								<option key={brand.product_brand_id} value={`${brand.name}`}>
									{brand.name}
								</option>
							))}
						</select>
					</div>
					<p className='text-red-500 text-xs italic'>
						{errors.productBrand && errors.productBrand.message}
					</p>
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
						{...register('productClassification', {
							required: {
								value: true,
								message: 'Este campo es obligatorio',
							},
						})}
					>
						<option value='' defaultValue>
							Elija la clasificación
						</option>
						{classifications.map(classification => (
							<option
								key={classification.product_classification_id}
								value={`${classification.name}`}
							>
								{classification.name}
							</option>
						))}
					</select>
					<p className='text-red-500 text-xs italic'>
						{errors.productClassification &&
							errors.productClassification.message}
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
						className='shadow appearance-none border rounded w-full mb-2 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
						{...register('productType', {
							required: {
								value: true,
								message: 'Este campo es obligatorio',
							},
						})}
					>
						<option value='' defaultValue>
							Elija el tipo de producto
						</option>
						{productTypes.map(productType => (
							<option
								key={productType.product_type_id}
								value={`${productType.name}`}
							>
								{productType.name}
							</option>
						))}
					</select>
					<p className='text-red-500 text-xs italic'>
						{errors.productType && errors.productType.message}
					</p>
				</div>
				<div className='w-full md:w-1/3 pl-1 pr-3'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='grid-expiration-date'
					>
						Fecha de vencimiento
					</label>
					<input
						className='shadow appearance-none border rounded w-full mb-2 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
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
				<p className='text-red-500 text-xs italic'>
					{/* Please fill out this field. */}
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
	)
}

export default StepOne
