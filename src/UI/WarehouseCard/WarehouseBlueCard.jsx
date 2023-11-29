// react router dom
import { Link } from 'react-router-dom'
// tabler icon
import { IconCircleArrowRight, IconShoppingCart } from '@tabler/icons-react'

const BlueCard = () => {
	return (
		<div className=' flex flex-col justify-between text-white bg-card-color-1 max-w-xs rounded-lg'>
			<div className='p-3 flex justify-between items-center'>
				<div className='mb-2'>
					{/* header */}
					<h1 className='text-3xl font-bold mb-2'>100</h1>
					<p className='text-normal font-normal break-all'>
						Cantidad de productos
					</p>
				</div>
				<IconShoppingCart
					className='pt-4 text-gray-600 opacity-50'
					size='80'
					strokeWidth='1.5'
				/>
			</div>

			{/* footer */}
			<div className='flex justify-end rounded-b-lg bg-card-color-5'>
				<Link
					to='stock-productos'
					className='w-full flex items-center justify-center text-center p-1 text-sm font-normal'
				>
					Mas Info
					<IconCircleArrowRight className='ml-2' />
				</Link>
			</div>
		</div>
	)
}

export default BlueCard
