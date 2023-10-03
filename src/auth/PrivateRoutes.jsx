import { Navigate, Outlet } from 'react-router-dom'
import Wrapper from '../Layout/Wrapper/Wrapper'

const PrivateRoutes = () => {
	const auth = JSON.parse(localStorage.getItem('session'))

	return auth !== null && auth.isAuth ? <Wrapper /> : <Navigate to='/login' />
}

export default PrivateRoutes
