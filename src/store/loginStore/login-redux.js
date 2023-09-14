import { createSlice } from '@reduxjs/toolkit'
import { logIn } from '../../utils/login'

const initialState = {
	loading: false,
	userInfo: {},
	error: null,
	success: false,
}

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		startSession(state, action) {
			const session = logIn(action.payload.username, action.payload.password)
			session.then(response => {
				if (response.length > 0) {
					console.log('You can access to the app')
					return
				}
				console.log('You can not access to the app, you need permission')
			})
		},
	},
})

export default loginSlice.reducer
export const loginSliceAction = loginSlice.actions
