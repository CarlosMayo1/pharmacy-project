import { TaskAbortError, createSlice } from '@reduxjs/toolkit'

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
	modalMessage: {
		show: false,
		type: '',
		background: '',
		message: '',
	},
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
		showModalMessage(state, action) {
			state.modalMessage = {
				show: action.payload.show,
				type: action.payload.type,
				background: action.payload.background,
				message: action.payload.message,
			}
		},
		changeModalMessage(state) {
			state.modalMessage = {
				show: false,
				type: '',
				background: '',
				message: '',
			}
		},
	},
})

export default warehouseSlice.reducer
export const warehouseSliceAction = warehouseSlice.actions
