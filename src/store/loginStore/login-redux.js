import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	loading: false,
	error: null,
	// userInfo: {},
	// success: false,
}

// logic of the login section
const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		// it is not necessary
		// startSession(state, action) {
		// 	// stores the session in global state
		// 	state.userInfo = action.payload.userData
		// 	// the session was successfully set
		// 	state.success = true
		// },
		loginError(state, action) {
			state.error = action.payload
		},
		hideErrorMessage(state) {
			state.error = null
		},
	},
})

export default loginSlice.reducer
export const loginSliceAction = loginSlice.actions
