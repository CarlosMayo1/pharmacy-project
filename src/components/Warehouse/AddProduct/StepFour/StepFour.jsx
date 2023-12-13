// react redux
import { useSelector } from 'react-redux'
// react hook form
import { useForm, Controller } from 'react-hook-form'
// react-select
import Select from 'react-select'

const StepFour = ({ nextStep }) => {
	const functions = useSelector(
		state => state.warehouseReducer.productFunctions,
	)
	const {
		control,
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const onSubmitFormHandler = handleSubmit(data => {
		console.log(data)
	})

	return (
		// Fourth Section
		<form className='w-full' onSubmit={onSubmitFormHandler}>
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
					htmlFor='grid-product-function'
				>
					Ingrese la funcionalidad del producto
				</label>
				<div className='flex flex-col'>
					<Controller
						name='productFunction'
						control={control}
						rules={{
							value: true,
							required: 'Este campo es obligatorio',
						}}
						render={({ field }) => (
							<Select name='productFunction' {...field} options={functions} />
						)}
					/>
				</div>
				<p className='text-red-500 text-xs italic'>
					{errors.productFunction && errors.productFunction.message}
				</p>
			</div>
			{/* If there is and observation */}
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
			{/* Next and Previous Buttons */}
			<div className='flex justify-center mt-4'>
				<button
					type='submit'
					className=' inline-flex justify-center rounded-md border border-transparent bg-green-200 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
				>
					Enviar
				</button>
			</div>
		</form>
	)
}

export default StepFour
