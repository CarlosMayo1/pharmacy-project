import { Outlet } from 'react-router-dom'
import BlueCard from '../../../UI/WarehouseCard/WarehouseBlueCard'
import GreenCard from '../../../UI/WarehouseCard/WarehouseGreenCard'
import YellowCard from '../../../UI/WarehouseCard/WarehouseYellowCard'
import RedCard from '../../../UI/WarehouseCard/WarehouseRedCard'

const Home = () => {
	return (
		<div className='p-4'>
			{/* cards information */}
			<div className='flex justify-between mb-8'>
				<BlueCard />
				<GreenCard />
				<YellowCard />
				<RedCard />
			</div>
			{/* Renders all the content of the warehouse */}
			<Outlet />
		</div>
	)
}

export default Home
