// reducer
import { useSelector } from 'react-redux'
// tabler icon
import { IconCircleCheck, IconBug } from '@tabler/icons-react'

const SuccessfulMessage = () => {
	const modalMessage = useSelector(state => state.warehouseReducer.modalMessage)

	const modalIcon = modalType => {
		switch (modalType) {
			case 'success':
				return <IconCircleCheck size={18} strokeWidth='2.5' className='mr-2' />
			case 'error':
				return <IconBug size={18} strokeWidth='2.5' className='mr-2' />
		}
	}

	return (
		<div className={`${modalMessage.background} p-2 mb-4`}>
			<p className='flex items text-sm font-semibold text-white'>
				{modalIcon(modalMessage.type)}
				{modalMessage.message}
			</p>
		</div>
	)
}

export default SuccessfulMessage
