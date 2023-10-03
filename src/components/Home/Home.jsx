const Home = () => {
	return (
		<div className='p-6'>
			<h1 className='text-lg font-bold'>Tabla de Productos</h1>
			<div className='flex justify-between'>
				{/* Form to add new product */}
				<form class='w-full max-w-sm'>
					<div class='md:flex md:items-center mb-6'>
						<div class='md:w-1/3'>
							<label
								class='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
								for='inline-full-name'
							>
								Full Name
							</label>
						</div>
						<div class='md:w-2/3'>
							<input
								class='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
								id='inline-full-name'
								type='text'
								value='Jane Doe'
							/>
						</div>
					</div>
					<div class='md:flex md:items-center mb-6'>
						<div class='md:w-1/3'>
							<label
								class='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
								for='inline-password'
							>
								Password
							</label>
						</div>
						<div class='md:w-2/3'>
							<input
								class='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
								id='inline-password'
								type='password'
								placeholder='******************'
							/>
						</div>
					</div>
					<div class='md:flex md:items-center mb-6'>
						<div class='md:w-1/3'></div>
						<label class='md:w-2/3 block text-gray-500 font-bold'>
							<input class='mr-2 leading-tight' type='checkbox' />
							<span class='text-sm'>Send me your newsletter!</span>
						</label>
					</div>
					<div class='md:flex md:items-center'>
						<div class='md:w-1/3'></div>
						<div class='md:w-2/3'>
							<button
								class='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
								type='button'
							>
								Sign Up
							</button>
						</div>
					</div>
				</form>
				{/* Table to see products */}
				<div class='relative overflow-x-auto shadow-md sm:rounded-lg'>
					<div class='pb-4 bg-white dark:bg-gray-900'>
						<label for='table-search' class='sr-only'>
							Search
						</label>
						<div class='relative mt-1'>
							<div class='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
								<svg
									class='w-4 h-4 text-gray-500 dark:text-gray-400'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 20 20'
								>
									<path
										stroke='currentColor'
										stroke-linecap='round'
										stroke-linejoin='round'
										stroke-width='2'
										d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
									/>
								</svg>
							</div>
							<input
								type='text'
								id='table-search'
								class='block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
								placeholder='Search for items'
							/>
						</div>
					</div>
					<table class='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
						<thead class='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
							<tr>
								<th scope='col' class='p-4'>
									<div class='flex items-center'>
										<label for='checkbox-all-search' class='sr-only'>
											checkbox
										</label>
									</div>
								</th>
								<th scope='col' class='px-6 py-3'>
									Nombre del producto
								</th>
								<th scope='col' class='px-6 py-3'>
									Usuario Creador
								</th>
								<th scope='col' class='px-6 py-3'>
									Fecha de creación
								</th>
								<th scope='col' class='px-6 py-3'>
									Estado
								</th>
								<th scope='col' class='px-6 py-3'>
									Es Mixto
								</th>
								<th scope='col' class='px-6 py-3'>
									Ver detalle
								</th>
								<th scope='col' class='px-6 py-3'>
									Acción
								</th>
							</tr>
						</thead>
						<tbody>
							<tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
								<td class='w-4 p-4'>
									<div class='flex items-center'>
										<label for='checkbox-table-search-1' class='sr-only'>
											checkbox
										</label>
									</div>
								</td>
								<th
									scope='row'
									class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
								>
									Apple MacBook Pro 17"
								</th>
								<td class='px-6 py-4'>Silver</td>
								<td class='px-6 py-4'>Laptop</td>
								<td class='px-6 py-4'>$2999</td>
								<td class='px-6 py-4'>
									<a
										href='#'
										class='font-medium text-blue-600 dark:text-blue-500 hover:underline'
									>
										Edit
									</a>
								</td>
							</tr>
							<tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
								<td class='w-4 p-4'>
									<div class='flex items-center'>
										<label for='checkbox-table-search-2' class='sr-only'>
											checkbox
										</label>
									</div>
								</td>
								<th
									scope='row'
									class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
								>
									Microsoft Surface Pro
								</th>
								<td class='px-6 py-4'>White</td>
								<td class='px-6 py-4'>Laptop PC</td>
								<td class='px-6 py-4'>$1999</td>
								<td class='px-6 py-4'>
									<a
										href='#'
										class='font-medium text-blue-600 dark:text-blue-500 hover:underline'
									>
										Edit
									</a>
								</td>
							</tr>
							<tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
								<td class='w-4 p-4'>
									<div class='flex items-center'>
										<label for='checkbox-table-search-3' class='sr-only'>
											checkbox
										</label>
									</div>
								</td>
								<th
									scope='row'
									class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
								>
									Magic Mouse 2
								</th>
								<td class='px-6 py-4'>Black</td>
								<td class='px-6 py-4'>Accessories</td>
								<td class='px-6 py-4'>$99</td>
								<td class='px-6 py-4'>
									<a
										href='#'
										class='font-medium text-blue-600 dark:text-blue-500 hover:underline'
									>
										Edit
									</a>
								</td>
							</tr>
							<tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
								<td class='w-4 p-4'>
									<div class='flex items-center'>
										<label for='checkbox-table-3' class='sr-only'>
											checkbox
										</label>
									</div>
								</td>
								<th
									scope='row'
									class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
								>
									Apple Watch
								</th>
								<td class='px-6 py-4'>Silver</td>
								<td class='px-6 py-4'>Accessories</td>
								<td class='px-6 py-4'>$179</td>
								<td class='px-6 py-4'>
									<a
										href='#'
										class='font-medium text-blue-600 dark:text-blue-500 hover:underline'
									>
										Edit
									</a>
								</td>
							</tr>
							<tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
								<td class='w-4 p-4'>
									<div class='flex items-center'>
										<label for='checkbox-table-3' class='sr-only'>
											checkbox
										</label>
									</div>
								</td>
								<th
									scope='row'
									class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
								>
									iPad
								</th>
								<td class='px-6 py-4'>Gold</td>
								<td class='px-6 py-4'>Tablet</td>
								<td class='px-6 py-4'>$699</td>
								<td class='px-6 py-4'>
									<a
										href='#'
										class='font-medium text-blue-600 dark:text-blue-500 hover:underline'
									>
										Edit
									</a>
								</td>
							</tr>
							<tr class='bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600'>
								<td class='w-4 p-4'>
									<div class='flex items-center'>
										<label for='checkbox-table-3' class='sr-only'>
											checkbox
										</label>
									</div>
								</td>
								<th
									scope='row'
									class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
								>
									Apple iMac 27"
								</th>
								<td class='px-6 py-4'>Silver</td>
								<td class='px-6 py-4'>PC Desktop</td>
								<td class='px-6 py-4'>$3999</td>
								<td class='px-6 py-4'>
									<a
										href='#'
										class='font-medium text-blue-600 dark:text-blue-500 hover:underline'
									>
										Edit
									</a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default Home
