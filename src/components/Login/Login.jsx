import { useDispatch } from 'react-redux'
import { loginSliceAction } from '../../store/loginStore/login-redux'
import { useForm } from 'react-hook-form'

const Login = () => {
	// redux
	const dispatch = useDispatch()
	// react hook form
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	// submition
	const onSubmitHandleForm = handleSubmit(data => {
		const userSession = {
			username: data.username,
			password: data.password,
		}
		dispatch(loginSliceAction.startSession(userSession))
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
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
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
				</form>
				<p className='text-center text-gray-500 text-xs'>
					&copy;2023 Chamanacu. Todos los derechos reservados.
				</p>
			</div>
		</div>
	)
}

export default Login
