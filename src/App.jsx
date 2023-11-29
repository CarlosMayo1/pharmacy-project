// import Auth from './Auth'
import { useEffect } from 'react'
import { fetchClientsFromSupabase } from './utils/clients'

import { Routes, Route } from 'react-router-dom'

import './App.css'

// redux toolkit
import { useDispatch, useSelector } from 'react-redux'
import { clientSliceAction } from './store/clientStore/client-redux'

// components
import Login from './components/Login/Login'
import Clients from './components/Clients/Clients'
import Home from './components/Home/Home'
import Header from './Layout/Header/Header'
import Products from './components/Products/Products'
import Sells from './components/Sells/Sells'
import Registers from './components/Registers/Registers'
import PrivateRoutes from './auth/PrivateRoutes'

// warehouse section
import WarehouseHome from './components/Warehouse/Home/Home'
import WarehouseIndex from './components/Warehouse/Home/WarehouseIndex'
import Stock from './components/Warehouse/Stock/Stock'
import LostProducts from './components/Warehouse/LostProduct/LostProduct'
import RefillOrder from './components/Warehouse/RefillOrder/RefillOrder'
import Container from './components/Warehouse/Container/Container'
import TypeContainer from './components/Warehouse/TypeContainer/TypeContainer'
import Price from './components/Warehouse/Price/Price'
import CloseToDueDate from './components/Warehouse/CloseToDueDate/CloseToDueDate'

function App() {
	// react redux
	const dispatch = useDispatch()
	const showBanner = useSelector(state => state.clientReducer.banner)

	useEffect(() => {
		const clients = fetchClientsFromSupabase()
		clients.then(response => {
			if (response.status === 200) {
				dispatch(clientSliceAction.loadingTable())
				const { data } = response

				// 👁️ sorting data based on the date 👇
				data.sort((date1, date2) => {
					return new Date(date2.created_at) - new Date(date1.created_at)
				})

				dispatch(clientSliceAction.getClients(data))
			}
		})

		// 👇 this code is not working
		setTimeout(() => {
			dispatch(clientSliceAction.resetToInitialState())
		}, 2000)
	}, [showBanner.show])

	return (
		<div className='App'>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route element={<PrivateRoutes />}>
					<Route element={<Home />} path='/' exact />
					<Route element={<Clients />} path='/clients' />
					{/* I'm not sure about this component */}
					<Route element={<WarehouseHome />} path='/warehouse'>
						<Route index element={<WarehouseIndex />} />
						<Route element={<Stock />} path='stock-productos' />
						<Route element={<Price />} path='prices' />
						<Route element={<Container />} path='container' />
						<Route element={<TypeContainer />} path='type-container' />
						<Route element={<LostProducts />} path='perdida-productos' />
						<Route element={<RefillOrder />} path='orden-salida' />
						<Route element={<CloseToDueDate />} path='proximos-vencer' />
					</Route>

					{/* <Route element={<Warehouse/>} path='/warehouse' /> */}
				</Route>
				{/* <Header /> */}
				{/* checks if has acess to the app */}
				{/* <Route path='/home' element={<Home />} />
				<Route path='/clients' element={<Clie	nts />} />
				<Route path='/sells' element={<Sells />} />
				<Route path='/products' element={<Products />} />
				<Route path='/registers' element={<Registers />} /> */}
			</Routes>
		</div>
	)
}

export default App
