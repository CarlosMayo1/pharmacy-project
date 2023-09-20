import { createSlice } from '@reduxjs/toolkit'

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
			state.userInfo = {
				user_worker_id: action.payload.user_worker_id,
				status: action.payload.status,
				role: action.payload.users.role,
				name: `${action.payload.worker.last_name}, ${action.payload.worker.name}`,
			}
		},
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
