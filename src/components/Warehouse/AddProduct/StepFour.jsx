// tabler icon
import { IconCircleArrowRight, IconCircleArrowLeft } from '@tabler/icons-react'

const StepFour = ({ nextStep, previousStep }) => {
	return (
		// Fourth Section
		<form className='w-full'>
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
					<option value='Descongestionante'>Descongestionante</option>
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
			{/* Next and Previous Buttons */}
			<div className='flex justify-between mt-4'>
				<button
					type='button'
					className='inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
					onClick={previousStep}
				>
					<IconCircleArrowLeft className='mr-2' />
					Retroceder
				</button>{' '}
				<button
					type='button'
					className=' inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
					onClick={nextStep}
				>
					Siguiente
					<IconCircleArrowRight className='ml-2' />
				</button>
			</div>
		</form>
	)
}

export default StepFour
