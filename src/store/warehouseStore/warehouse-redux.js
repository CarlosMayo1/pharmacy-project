import { createSlice } from '@reduxjs/toolkit'

// state
const initialState = {
	stock: [],
	loading: false,
	error: null,
}

const stockSlice = createSlice({
	name: 'stock',
	initialState,
	reducers: {
		getStockFromSupabase(state, action) {
			state.stock = action.payload
		},
	},
})

export default stockSlice.reducer
export const stockSliceAction = stockSlice.actions
