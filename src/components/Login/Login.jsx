import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginSliceAction } from '../../store/loginStore/login-redux'
import { logIn } from '../../utils/login/index'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from './ErrorMessage'

const Login = () => {
	// redux
	const errorMessage = useSelector(state => state.loginReducer.error)
	const dispatch = useDispatch()
	// react hook form
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()
	const navigate = useNavigate()

	// hides the error message
	useEffect(() => {
		setTimeout(() => {
			dispatch(loginSliceAction.hideErrorMessage())
		}, 3000)
	}, [errorMessage])

	// submition
	const onSubmitHandleForm = handleSubmit(data => {
		const session = logIn(data.username, data.password)
		session.then(response => {
			console.log(response)
			// if the user exits and it is active
			if (response.length > 0) {
				// the user is active
				if (response[0].status === 1) {
					// store the information of the session
					dispatch(loginSliceAction.startSession(response[0]))
					// let the user continue
					navigate('/home')
				} else {
					// the user is inactive
					dispatch(
						loginSliceAction.loginError('El usuario no se encuentra activo.'),
					)
				}
			} else {
				// dispatch and action here to update status
				dispatch(
					loginSliceAction.loginError('Usuario y/o contraseña incorrecto.'),
				)
			}
		})
	})
	return (
		<div className='w-full h-screen flex items-center justify-center'>
			<div className='w-full max-w-xs'>
				<form
					className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
					onSubmit={onSubmitHandleForm}
				>
					<div className='mb-4'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='username'
						>
							Usuario
						</label>
						<input
							className={`shadow appearance-none border ${
								errors.username && 'border-red-500'
							} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
							id='username'
							type='text'
							placeholder='Nombre de usuario'
							{...register('username', {
								required: {
									value: true,
									message: 'Se requiere el nombre de usuario',
								},
							})}
						/>
						{errors.username && (
							<p className='text-red-500 text-xs italic'>
								{errors.username.message}
							</p>
						)}
					</div>
					<div className='mb-6'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='password'
						>
							Contraseña
						</label>
						<input
							className={`shadow appearance-none border ${
								errors.password && 'border-red-500'
							} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
							id='password'
							type='password'
							placeholder='******************'
							{...register('password', {
								required: {
									value: true,
									message: 'Se requiere la contraseña del usuario',
								},
							})}
						/>
						{errors.password && (
							<p className='text-red-500 text-xs italic'>
								{errors.password.message}
							</p>
						)}
					</div>
					<div className='flex items-center justify-center'>
						<button
							className='bg-blue-500 mb-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
							type='submit'
						>
							Ingresar
						</button>
						{/* This section is not available at the moment */}
						{/* <a
							className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
							href='#'
						>
							Forgot Password?
						</a> */}
					</div>
					{/* ERROR ALERT */}
					{errorMessage && <ErrorMessage message={errorMessage} />}
				</form>

				<p className='text-center text-gray-500 text-xs'>
					&copy;2023 Chamanacu. Todos los derechos reservados.
				</p>
			</div>
		</div>
	)
}

export default Login
