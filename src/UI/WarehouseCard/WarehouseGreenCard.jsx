import { IconCircleArrowRight, IconDoorExit } from '@tabler/icons-react'

const GreenCard = () => {
	return (
		<div className='  flex flex-col justify-between text-white bg-card-color-2  max-w-xs rounded-lg'>
			<div className='p-3 flex justify-between items-center'>
				<div className='mb-2'>
					{/* header */}
					<h1 className='text-3xl font-semibold mb-2'>80</h1>
					<p className='text-normal font-normal break-all '>
						Ordenes de Salida mensual
					</p>
				</div>
				<IconDoorExit className='pt-4 opacity-80' size='80' strokeWidth='1.5' />
			</div>

			{/* footer */}
			<div className='flex rounded-b-lg bg-card-color-6'>
				<a
					href='#'
					className='w-full flex items-center justify-center text-center p-1 text-sm font-normal'
				>
					Mas Info
					<IconCircleArrowRight className='ml-2' />
				</a>
			</div>
		</div>
	)
}

export default GreenCard
