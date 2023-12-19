// react redux
import { useSelector } from 'react-redux'
// react hook form
import { useForm } from 'react-hook-form'
// tabler icon
import { IconCircleArrowRight } from '@tabler/icons-react'
// utils
import { insertNewStockInSupabase } from '../../../../utils/warehouse'

const StepThree = ({ nextStep }) => {
	const insertedProduct = useSelector(
		state => state.warehouseReducer.insertedProduct,
	)
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const onSubmitFormHandler = handleSubmit(data => {
		const insertData = {
			product_id: insertedProduct.product_id,
			stock: data.productStock,
			user_worker_id: JSON.parse(localStorage.getItem('session'))
				.user_worker_id, // gets data from the user logged
			created_date: getCurrentDate(),
			isCompleted: 1,
			observation: data.productObservation,
			state: 1,
		}

		console.log(insertData)

		insertNewStockInSupabase(insertData).then(response => {
			console.log(response)
			if (response === null) {
				// cleans all the fields
				reset()
				nextStep()
			}
		})
	})

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
		// Third Section
		<form className='w-full' onSubmit={onSubmitFormHandler}>
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
					step='any'
					placeholder='1000'
					{...register('productStock', {
						required: {
							value: true,
							message: 'Este campo es obligatorio',
						},
					})}
				/>
				<p className='text-red-500 text-xs italic'>
					{errors.productStock && errors.productStock.message}
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

export default StepThree
