import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	prices: [],
	loading: false,
	error: null,
	change: false, // it helps to refresh the page by using useEffect
	editPrice: {},
}

// logic of the price section
const priceSlice = createSlice({
	name: 'price',
	initialState,
	reducers: {
		getPricesFromSupabase(state, action) {
			state.prices = action.payload
		},
		changeSwitchState(state) {
			state.change = !state.change
		},
		editPrice(state, action) {
			state.editPrice = action.payload
		},
	},
})

export default priceSlice.reducer
export const priceSliceAction = priceSlice.actions
