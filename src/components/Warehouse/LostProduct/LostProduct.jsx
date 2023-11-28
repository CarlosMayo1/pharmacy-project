import { IconEyeCheck } from '@tabler/icons-react'

const LostProducts = () => {
	return (
		<div className='p-4'>
			<h1 className='mb-2 text-lg font-bold'>Lista de productos perdidos</h1>
			<div>
				{/* Button */}
				<div className='mb-2'>
					<button
						type='button'
						// onClick={openModal}
						className='bg-pharmacy-color-1 hover:bg-pharmacy-color-5 text-white font-bold py-2 px-4 rounded'
					>
						Agregar
					</button>
				</div>
				{/* Search bar */}
				<div className='flex items-center justify-between  pb-4 bg-white dark:bg-gray-900'>
					<form>
						<div className='flex items-center'>
							<input
								id='default-checkbox'
								type='checkbox'
								value=''
								className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
							/>
							<label
								htmlFor='default-checkbox'
								className='mt-2 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
							>
								Visualizar todo
							</label>
						</div>
					</form>

					<div className='relative'>
						<label htmlFor='table-search' className='sr-only'>
							Search
						</label>
						<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
							<svg
								className='w-4 h-4 text-gray-500 dark:text-gray-400'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 20 20'
							>
								<path
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
								/>
							</svg>
						</div>
						<input
							type='text'
							id='table-search'
							className='block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='Search for items'
						/>
					</div>
				</div>
				{/* Table of prices */}
				<table className='border-collapse w-full text-sm text-left text-gray-500 dark:text-gray-400'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th scope='col' className='px-3 py-3 border'>
								Nombre del producto
							</th>
							<th scope='col' className='px-3 py-3 border'>
								Cantidad (unidades)
							</th>
							<th scope='col' className='px-3 py-3 border'>
								Fecha de vencimiento
							</th>
							<th scope='col' className='px-3 py-3 border'>
								Observación
							</th>
							<th scope='col' className='px-3 py-3 border'>
								Estado
							</th>
							<th scope='col' className='px-3 py-3 border'>
								Acción
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className='bg-white'>
							<td
								scope='row'
								className='border px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
							>
								Dioxaflex
							</td>
							<td className='border px-3 py-4'>2</td>
							<td className='border px-3 py-4'>11/11/2023</td>

							<td className='border px-3 py-4'>
								Hubo una caja que nadie se percató que estaba proxima a
								vencerse.
							</td>
							<td className='border px-3 py-4'>
								<span className='bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300'>
									Pendiente
								</span>
							</td>
							<td className='border px-3 py-4 h-full'>
								{/* 👁️ the admin can see the button to approve but any other can't */}
								<button
									type='button'
									onClick={() => console.log('working')}
									className='bg-card-color-4 hover:bg-card-color-8 text-white font-bold py-1 px-2 rounded'
								>
									<IconEyeCheck />
								</button>
							</td>
						</tr>
						<tr className='bg-white'>
							<td
								scope='row'
								className='border px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
							>
								Anaflex
							</td>
							<td className='border px-3 py-4'>10</td>
							<td className='border px-3 py-4'>01/02/2024</td>
							<td className='border px-3 py-4'></td>
							<td className='border px-3 py-4'>
								<span className='bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300'>
									Aprobado
								</span>
							</td>
							<td className='border px-3 py-4 h-full'>
								<button
									type='button'
									onClick={() => console.log('working')}
									className='bg-gray-400  text-white font-bold py-1 px-2 rounded'
								>
									<IconEyeCheck />
								</button>
							</td>
						</tr>
						<tr className='bg-white'>
							<td
								scope='row'
								className='border px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
							>
								Ciproflixacino
							</td>
							<td className='border px-3 py-4'>3</td>
							<td className='border px-3 py-4'>11/11/2025</td>

							<td className='border px-3 py-4'>
								Accidentalmente fue pisada por alguien
							</td>
							<td className='border px-3 py-4'>
								<span className='bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300'>
									Pendiente
								</span>
							</td>
							<td className='border px-3 py-4 h-full'>
								{/* 👁️ the admin can see the button to approve but any other can't */}
								<button
									type='button'
									onClick={() => console.log('working')}
									className='bg-card-color-4 hover:bg-card-color-8 text-white font-bold py-1 px-2 rounded'
								>
									<IconEyeCheck />
								</button>
							</td>
						</tr>
						<tr className='bg-white'>
							<td
								scope='row'
								className='border px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
							>
								Tolsabron
							</td>
							<td className='border px-3 py-4'>1</td>
							<td className='border px-3 py-4'>10/05/2024</td>
							<td className='border px-3 py-4'>
								El producto vino golpeado al ser trasladado. Fue vendido a uno
								de los trabajadores a precio preferencial de S/8.00
							</td>
							<td className='border px-3 py-4'>
								<span className='bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300'>
									Aprobado
								</span>
							</td>
							<td className='border px-3 py-4 h-full'>
								<button
									type='button'
									onClick={() => console.log('working')}
									className='bg-gray-400  text-white font-bold py-1 px-2 rounded'
								>
									<IconEyeCheck />
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			{/* HeadlessUI */}
		</div>
	)
}

export default LostProducts
