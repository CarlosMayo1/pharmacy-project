// react router dom
import { Link } from 'react-router-dom'
// tabler icon
import { IconCircleArrowRight, IconCalendarCheck } from '@tabler/icons-react'

const YellowCard = () => {
	return (
		<div className='  flex flex-col justify-between text-black bg-card-color-3  max-w-xs rounded-lg'>
			<div className='p-3 flex justify-between items-center'>
				<div className='mb-2'>
					{/* header */}
					<h1 className='text-3xl font-semibold mb-2'>5</h1>
					<p className='text-normal font-normal break-all '>
						Productos Próximos a vencer
					</p>
				</div>
				<IconCalendarCheck
					className='pt-4 opacity-80'
					size='80'
					strokeWidth='1.5'
				/>
			</div>

			{/* footer */}
			<div className='flex rounded-b-lg bg-card-color-7'>
				<Link
					to='proximos-vencer'
					className='w-full flex items-center justify-center text-center p-1 text-sm font-normal'
				>
					Mas Info
					<IconCircleArrowRight className='ml-2' />
				</Link>
			</div>
		</div>
	)
}

export default YellowCard
