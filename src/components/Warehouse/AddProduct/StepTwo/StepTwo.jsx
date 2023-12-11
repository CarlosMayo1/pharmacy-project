// tabler icon
import { IconCircleArrowRight } from '@tabler/icons-react'

const StepTwo = ({ nextStep }) => {
	return (
		// Second Section
		<form className='w-full'>
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
			<div className='flex justify-end mt-4'>
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

export default StepTwo
