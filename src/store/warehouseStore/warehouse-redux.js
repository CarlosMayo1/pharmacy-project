import { createSlice } from '@reduxjs/toolkit'

// state
const initialState = {
	stock: [],
	loading: false,
	error: null,
	// modal data
	productBrand: [],
	productType: [],
	productClassification: [],
	productFunctions: [],
	productComponents: [],
}

const warehouseSlice = createSlice({
	name: 'warehouse',
	initialState,
	reducers: {
		getProductBrand(state, action) {
			state.productBrand = action.payload
		},
		getProductClassification(state, action) {
			state.productClassification = action.payload
		},
		getProductType(state, action) {
			state.productType = action.payload
		},
	},
})

export default warehouseSlice.reducer
export const warehouseSliceAction = warehouseSlice.actions
