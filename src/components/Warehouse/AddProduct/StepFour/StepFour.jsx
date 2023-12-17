// react
import { useState, useEffect } from 'react'
// react redux
import { useSelector } from 'react-redux'
// react hook form
import { useForm, Controller } from 'react-hook-form'
// react-select
import Select from 'react-select'
// tabler icon
import {
	IconListNumbers,
	IconPlaystationX,
	IconFlag2Filled,
	IconLink,
} from '@tabler/icons-react'
// utils
import { insertNewFunctionsInSupabase } from '../../../../utils/warehouse'
// components
import AddNewFunctionModal from './AddNewFunction/AddNewFunction'

const StepFour = () => {
	const functions = useSelector(
		state => state.warehouseReducer.productFunctions,
	)
	const [showList, setShowList] = useState(false)
	const [listOfFunctions, setListOfFunctions] = useState([])
	const [showSubmitButton, setShowSubmitButton] = useState(false)
	const [showNewFunctionModal, setShowModalFunctionModal] = useState(false)
	const {
		control,
		getValues,
		reset,
		register,
		handleSubmit,
		clearErrors,
		setError,
		formState: { errors },
	} = useForm()

	const onSubmitFormHandler = () => {
		const listOfSelectedFunctions = [...listOfFunctions]
		const insertFunctions = []
		for (let i = 0; i < listOfSelectedFunctions.length; i++) {
			insertFunctions.push({
				product_id: 'fed1c37a-b065-4755-9724-f436525bc9e0',
				product_function_id: listOfSelectedFunctions[i].productFunction.value,
				observation: listOfSelectedFunctions[i].productObservation,
				state: 1,
			})
		}

		// send data
		insertNewFunctionsInSupabase(insertFunctions).then(response => {
			console.log(response)
			if (response === null) {
				console.log('well done!')
			}
		})

		setShowList(false)
		setListOfFunctions([])
		setShowSubmitButton(false)
		console.log(insertFunctions)
	}

	const onAddProductFunction = handleSubmit(data => {
		// displays the list of selected functions
		setShowList(true)

		// validates that there are only 5 functions on the list
		if (listOfFunctions.length === 5) {
			setError('productFunction', {
				type: 'custom',
				message: 'Solo se admite un maximo de 5 funciones',
			})

			setTimeout(() => {
				// cleans error
				clearErrors('productFunction')
			}, 5000)
			return
		}

		const formValues = getValues()

		// copy the list of functions that already exits
		const listOfSelectedFunctions = [...listOfFunctions]

		if (listOfSelectedFunctions.length > 0) {
			// action
			for (let i = 0; i < listOfSelectedFunctions.length; i++) {
				if (
					formValues.productFunction.label ===
					listOfSelectedFunctions[i].productFunction.label
				) {
					return
				}
			}
		}

		// push new function inside the array
		listOfSelectedFunctions.push(formValues)
		// sets the new array
		setListOfFunctions(listOfSelectedFunctions)

		// reset all the inputs int the form
		reset()
	})

	const onFinishListOfFunctions = () => {
		setShowSubmitButton(prevState => !prevState)
	}

	const onDeleteFunctionHandler = id => {
		if (showSubmitButton) {
			setError('tableError', {
				type: 'custom',
				message: 'Para editar las funciones, presione en el botón "Editar"',
			})

			setTimeout(() => {
				// cleans error
				clearErrors('tableError')
			}, 5000)
			return
		}
		// copying the arr
		const listOfSelectedFunctions = [...listOfFunctions]
		// return a new array that no include delete datga
		const filteredFunctions = listOfSelectedFunctions.filter(
			fnct => fnct.productFunction.value !== id,
		)
		// set new array
		setListOfFunctions(filteredFunctions)
	}

	const showAddNewFunctionModalHandler = () => {
		setShowModalFunctionModal(true)
	}

	const closeAddNewFunctionModalHandler = () => {
		setShowModalFunctionModal(false)
	}

	useEffect(() => {
		// hide the list when it's empty
		if (listOfFunctions.length === 0) {
			setShowList(false)
		}
	}, [listOfFunctions.length])

	// section of list of functions
	const ListOfFunctionsSection = () => {
		return (
			<div className='bg-gray-50  border-l-4 border-gray-200 mt-2 py-2 px-4'>
				<div className='flex justify-between'>
					<p className='flex items-center font-light mb-2'>
						{' '}
						<IconListNumbers size={18} className='mr-2' /> Lista de funciones
						agregadas
					</p>
					<button
						className='text-sm bg-gray-500 hover:bg-gray-600 px-2 py-2 text-white rounded-lg'
						onClick={onFinishListOfFunctions}
					>
						{showSubmitButton ? 'Editar' : 'Finalizar'}
					</button>
				</div>
				<table className='border-collapse bg-white w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
							<th scope=' col' className='px-2 py-2'>
								Función
							</th>
							<th scope='col' className='text-center px-2 py-2'>
								Observación
							</th>
							<th scope='col' className='text-center px-2 py-2'></th>
						</tr>
					</thead>
					<tbody>
						{listOfFunctions.map(fnct => (
							<tr
								className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
								key={fnct.productFunction.value}
							>
								<td
									scope='row'
									className='border text-sm px-2 py-2  font-semibold text-gray-900 whitespace-nowrap dark:text-white'
								>
									{fnct.productFunction.label}
								</td>
								<td className='border px-2 py-2'>
									<a
										href='#'
										className='text-xs font-medium text-blue-600 dark:text-blue-500 hover:underline'
									>
										{fnct.productObservation}
									</a>
								</td>
								<td className='flex justify-center px-2 py-2'>
									<button
										type='button'
										onClick={() =>
											onDeleteFunctionHandler(fnct.productFunction.value)
										}
									>
										<IconPlaystationX size={18} className='text-red-500' />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<p className='text-red-500 text-xs italic'>
					{errors.tableError && errors.tableError.message}
				</p>
			</div>
		)
	}

	return (
		// Fourth Section
		<>
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
				<div className='w-full  mb-4'>
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
							defaultValue=''
							rules={{
								value: true,
								required: 'Este campo es obligatorio',
								// onChange: e => onSelectAFunctionHandler(e),
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

				{/* helpful information for the user */}
				<div className='w-full bg-gray-50 border-l-4 border-gray-200 py-2 px-4 mb-4 '>
					<p className='text-gray-500 text-sm font-semibold flex items-center mb-2'>
						<IconFlag2Filled size={18} className='mr-2' /> ¿No existe algun
						dato? Ingresalo en el siguiente enlace:
					</p>
					<ul className='text-sm text-gray-500 font-bold'>
						<li>
							<button
								type='button'
								onClick={showAddNewFunctionModalHandler}
								className='flex items-center'
							>
								<IconLink size={18} className='mr-2' />
								Ingresar marca
							</button>
						</li>
					</ul>
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
				{showList && <ListOfFunctionsSection />}
				{/* Next and Previous Buttons */}
				<div className='flex justify-center mt-4'>
					<button
						type='button'
						onClick={onAddProductFunction}
						className={`${
							showSubmitButton ? 'hidden ' : ''
						}inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
					>
						Agregar
					</button>
					{showSubmitButton && (
						<button
							type='button'
							onClick={onSubmitFormHandler}
							className={`inline-flex justify-center rounded-md border border-transparent bg-green-300 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
						>
							Enviar
						</button>
					)}
				</div>
			</form>
			<AddNewFunctionModal
				isOpen={showNewFunctionModal}
				closeModal={closeAddNewFunctionModalHandler}
			/>
		</>
	)
}

export default StepFour
