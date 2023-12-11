// react
import { useState, Fragment } from 'react'
// headlessUI
import { Dialog, Transition } from '@headlessui/react'
// components
import StepOne from '../../AddProduct/StepOne/StepOne'
import StepTwo from '../../AddProduct/StepTwo/StepTwo'
import StepThree from '../../AddProduct/StepThree/StepThree'
import StepFour from '../../AddProduct/StepFour/StepFour'

const stockModal = ({ isOpen, closeModal }) => {
	// state
	const [counter, setCounter] = useState(1)

	const onNextStep = () => {
		if (counter >= STEPS.length) {
			return
		}

		setCounter(prevState => prevState + 1)
		switchForm()
	}

	const onPreviousStep = () => {
		if (counter === 1) {
			return
		}

		setCounter(prevState => prevState - 1)
	}

	// steps in the multistep form
	const STEPS = [
		{
			id: 1,
			title: 'Primer paso',
		},
		{
			id: 2,
			title: 'Segundo paso',
		},
		{
			id: 3,
			title: 'Tercer paso',
		},
		{
			id: 4,
			title: 'Cuarto paso',
		},
	]

	// let renderForm = (

	// )

	const switchForm = () => {
		switch (counter) {
			case 1:
				return <StepOne nextStep={onNextStep} />
			case 2:
				return <StepTwo nextStep={onNextStep} />
			case 3:
				return <StepThree nextStep={onNextStep} previousStep={onPreviousStep} />
			case 4:
				return <StepFour previousStep={onPreviousStep} />
		}
	}

	return (
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
							<Dialog.Panel className='transform w-full max-w-4xl w-lg overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
								<div className='mt-2 flex'>
									<div className='bg-pharmacy-color-3	 mr-4 rounded-2xl p-4 w-1/3'>
										<h1 className='mb-4 text-white font-semibold text-xl'>
											Pasos a seguir
										</h1>
										<ul className='text-white'>
											{STEPS.map(step => (
												<li key={step.id} className='flex items-center mb-6'>
													<div
														className={`${
															step.id === counter
																? 'bg-white text-pharmacy-color-3'
																: 'text-white'
														}  w-10 h-10 rounded-full border-2 border-white flex justify-center items-center mr-4`}
													>
														<p className='font-bold'>{step.id}</p>
													</div>
													<p className='font-bold'>{step.title}</p>
												</li>
											))}
										</ul>
									</div>
									{/* First form */}
									{switchForm()}
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}

export default stockModal
