const CloseToDueDate = () => {
	return (
		<div>
			<h1 className='mb-2 text-lg font-bold'>Productos próximos a vencer</h1>
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
				<div className='flex justify-end pb-4 bg-white dark:bg-gray-900'>
					<label htmlFor='table-search' className='sr-only'>
						Search
					</label>
					<div className='relative mt-1'>
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
								Ubicación
							</th>
							<th scope='col' className='px-3 py-3 border'>
								Observación
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
								Gripa Check
							</td>
							<td className='border px-3 py-4'>200</td>
							<td className='border px-3 py-4'>12/11/2024</td>
							<td className='border px-3 py-4'>ANT01000000000001</td>
							<td className='border px-3 py-4'>
								Los productos llegaron con fecha muy próxima a vencerse y no se
								precataron al momnento de ingresarlos en el almacen
							</td>
							<td className='border px-3 py-4 h-full'>
								<button
									type='button'
									onClick={() => console.log('working')}
									className='bg-pharmacy-color-5 hover:bg-pharmacy-color-1 text-white font-bold py-1 px-2 rounded'
								>
									Edit
								</button>
							</td>
						</tr>
						<tr className='bg-white'>
							<td
								scope='row'
								className='border px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
							>
								Clorfenamina Meleato
							</td>
							<td className='border px-3 py-4'>300</td>
							<td className='border px-3 py-4'>05/06/2024</td>
							<td className='border px-3 py-4'>ANT01000000000002</td>
							<td className='border px-3 py-4'>
								De las 300 unidades, en realidad hay 100 que se vencen para la
								fecha del 05/06/2023, el resto se encuentran para la fecha de
								10/10/2024
							</td>
							<td className='border px-3 py-4 h-full'>
								<button
									type='button'
									onClick={() => console.log('working')}
									className='bg-pharmacy-color-5 hover:bg-pharmacy-color-1 text-white font-bold py-1 px-2 rounded'
								>
									Edit
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
							<td className='border px-3 py-4'>50</td>
							<td className='border px-3 py-4'>01/02/2024</td>
							<td className='border px-3 py-4'>ANT01000000000003</td>
							<td className='border px-3 py-4'></td>
							<td className='border px-3 py-4 h-full'>
								<button
									type='button'
									onClick={() => console.log('working')}
									className='bg-pharmacy-color-5 hover:bg-pharmacy-color-1 text-white font-bold py-1 px-2 rounded'
								>
									Edit
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default CloseToDueDate
