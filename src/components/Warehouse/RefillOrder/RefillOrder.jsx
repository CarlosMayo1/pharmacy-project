import { IconEye } from '@tabler/icons-react'

// 👁️ 👁️ This is a list of orders that has been completed
// ❓ should I do another list of orders asked for the shop

const RefillOrder = () => {
	return (
		<div className='p-4'>
			<h1 className='mb-2 text-lg font-bold'>
				Historial de despachos a tienda
			</h1>
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
								# Orden
							</th>
							<th scope='col' className='px-3 py-3 border'>
								Responsable
							</th>
							<th scope='col' className='px-3 py-3 border'>
								Fecha de despacho
							</th>
							<th scope='col' className='px-3 py-3 border'>
								Observación
							</th>
							<th scope='col' className='px-3 py-3 border'>
								Detalle
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className='bg-white'>
							<td
								scope='row'
								className='border px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
							>
								00001
							</td>
							<td className='border px-3 py-4'>Carlos Mayo</td>
							<td className='border px-3 py-4'>11/05/2023</td>

							<td className='border px-3 py-4'>
								No se pudo despachar acidoacetilsalisílico debido a que los 50
								que quedaban fueron comidos por la rata.
							</td>
							<td className='border px-3 py-4 h-full'>
								{/* 👁️ See the list of products that have been dispatched */}
								<button
									type='button'
									onClick={() => console.log('working')}
									className='bg-card-color-1 hover:bg-card-color-5 text-white font-bold py-1 px-2 rounded'
								>
									<IconEye />
								</button>
							</td>
						</tr>
						<tr className='bg-white'>
							<td
								scope='row'
								className='border px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
							>
								00010
							</td>
							<td className='border px-3 py-4'>Milagros Mayo</td>
							<td className='border px-3 py-4'>02/02/2023</td>
							<td className='border px-3 py-4'></td>
							<td className='border px-3 py-4 h-full'>
								<button
									type='button'
									onClick={() => console.log('working')}
									className='bg-card-color-1 hover:bg-card-color-5  text-white font-bold py-1 px-2 rounded'
								>
									<IconEye />
								</button>
							</td>
						</tr>
						<tr className='bg-white'>
							<td
								scope='row'
								className='border px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
							>
								00020
							</td>
							<td className='border px-3 py-4'>Maira Perez</td>
							<td className='border px-3 py-4'>11/11/2023</td>

							<td className='border px-3 py-4'>
								No se despachó dolocordralan ni doloibupress debido a que no se
								contaba con stock.
							</td>
							<td className='border px-3 py-4 h-full'>
								{/* 👁️ the admin can see the button to approve but any other can't */}
								<button
									type='button'
									onClick={() => console.log('working')}
									className='bg-card-color-1 hover:bg-card-color-5 text-white font-bold py-1 px-2 rounded'
								>
									<IconEye />
								</button>
							</td>
						</tr>
						<tr className='bg-white'>
							<td
								scope='row'
								className='border px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
							>
								00002
							</td>
							<td className='border px-3 py-4'>Amelida Borja</td>
							<td className='border px-3 py-4'>10/05/2023</td>
							<td className='border px-3 py-4'>
								Se envía un tolsabron que ha sido mallugado cuando fue
								almacenado.
							</td>
							<td className='border px-3 py-4 h-full'>
								<button
									type='button'
									onClick={() => console.log('working')}
									className='bg-card-color-1 hover:bg-card-color-5  text-white font-bold py-1 px-2 rounded'
								>
									<IconEye />
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

export default RefillOrder
