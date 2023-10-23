import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
// headlessUI
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import { productSliceAction } from '../../store/productStore/product-redux'
import { fetchProductsFromSupabase } from '../../utils/products'
import Products from './Products/Products'

const Home = () => {
	const dispatch = useDispatch()
	const products = useSelector(state => state.productReducer.products)
	// headlessUI state
	const [isOpen, setIsOpen] = useState(false)

	const closeModal = () => {
		setIsOpen(false)
	}

	const openModal = () => {
		setIsOpen(true)
	}

	useEffect(() => {
		const products = fetchProductsFromSupabase()
		products.then(response => {
			// if status is ok
			if (response.status === 200) {
				// gets products from and supase and store it in a redux
				const data = {
					loading: true,
					listOfProducts: response.data,
				}
				dispatch(productSliceAction.getProductsFromSupabase(data))
			}
			console.log(response)
		})
	}, [])

	return (
		<div className='p-6'>
			<h1 className='text-lg font-bold'>Tabla de Productos</h1>
			<div>
				{/* Table to see products */}
				<div className='mb-2'>
					<button
						type='button'
						onClick={openModal}
						className='bg-pharmacy-color-1 hover:bg-pharmacy-color-5 text-white font-bold py-2 px-4 rounded'
					>
						Agregar
					</button>
				</div>
				{products.loading && <Products />}
			</div>
			{/* HeadlessUI */}
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as='div' className='relative z-10' onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='fixed inset-0 bg-black bg-opacity-25' />
					</Transition.Child>

					<div className='fixed inset-0 overflow-y-auto'>
						<div className='flex min-h-full items-center justify-center p-4 text-center'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'
							>
								<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
									<Dialog.Title
										as='h3'
										className='text-lg font-medium leading-6 text-gray-900'
									>
										Payment successful
									</Dialog.Title>
									<div className='mt-2'>
										<p className='text-sm text-gray-500'>
											Your payment has been successfully submitted. We’ve sent
											you an email with all of the details of your order.
										</p>
									</div>

									<div className='mt-4'>
										<button
											type='button'
											className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
											onClick={closeModal}
										>
											Got it, thanks!
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	)
}

export default Home
