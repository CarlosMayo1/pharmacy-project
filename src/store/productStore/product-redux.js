import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	inputs: {
		name: '',
		laboratory: '',
		type: '',
		entry_date: '',
		expiration_date: '',
		stock: '',
		price: '',
		function: '',
	},
	banner: {
		show: false,
		message: '',
		style: '',
	},
	updateProductAmount: {},
	listOfProducts: [],
	deleteProductId: '',
	selectedProducts: [],
	totalAmount: 0,
	products: {
		loading: false,
		listOfProducts: [],
	},
}

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		getProductsFromSupabase(state, action) {
			state.products = action.payload
		},
		getProducts(state, action) {
			state.listOfProducts = action.payload
		},
		handleInputs(state, action) {
			state.inputs[action.payload.name] = action.payload.value
		},
		// shows a successfull banner
		handleSuccessfullBanner(state, action) {
			state.banner = {
				show: true,
				message: action.payload,
				style: 'success',
			}
		},
		// shows a blue loading banner
		handleLoadingBanner(state) {
			state.banner = {
				show: true,
				message: 'Enviando datos...',
				style: 'loading',
			}
		},
		// shows an error
		handleErrorBanner(state, action) {
			state.banner = {
				show: true,
				message: action.payload,
				style: 'error',
			}
		},
		// reset to initial state
		resetToInitialState(state) {
			state.inputs = {
				name: '',
				common_name: '',
				active_component: '',
				laboratory: '',
				type: '',
				entry_date: '',
				expiration_date: '',
				stock: '',
				price: '',
				function: '',
			}

			state.banner = {
				show: false,
				message: '',
				style: '',
			}
		},
		handleSelectedProducts(state, action) {
			state.selectedProducts = action.payload
		},
		handleAddProduct(state, action) {
			const updatedTotalAmount =
				state.totalAmount + action.payload.price * action.payload.amount

			const existingCartItemIndex = state.selectedProducts.findIndex(
				item => item.id === action.payload.id,
			)

			const existingCartItem = state.selectedProducts[existingCartItemIndex]

			let updatedSelectedProducts

			if (existingCartItem) {
				const updatedSelectedProduct = {
					...existingCartItem,
					amount: existingCartItem.amount + action.payload.amount,
					total:
						state.totalAmount + action.payload.price * action.payload.amount,
				}

				updatedSelectedProducts = [...state.selectedProducts]
				updatedSelectedProducts[existingCartItemIndex] = updatedSelectedProduct
			} else {
				updatedSelectedProducts = state.selectedProducts.concat(action.payload)
			}
			state.selectedProducts = updatedSelectedProducts
			state.totalAmount = updatedTotalAmount
		},
		handleUpdateProductAmount(state, action) {
			const existingProductItemIndex = state.selectedProducts.findIndex(
				product => product.id === action.payload.id,
			)

			state.updateProductAmount =
				state.selectedProducts[existingProductItemIndex]
		},
		handleUpdateAmount(state, action) {
			// getting index of the product inside the list of selected products
			const existingProductItemIndex = state.selectedProducts.findIndex(
				product => product.id === action.payload.id,
			)

			// updating list of selected products
			state.selectedProducts[existingProductItemIndex].amount =
				action.payload.amount
			state.selectedProducts[existingProductItemIndex].total =
				state.selectedProducts[existingProductItemIndex].amount *
				state.selectedProducts[existingProductItemIndex].price
		},
		handleDeleteProductId(state, action) {
			state.deleteProductId = action.payload
		},
		handlerRemoveProductFromList(state, action) {
			const filteredProducts = state.selectedProducts.filter(
				product => product.id !== action.payload,
			)
			state.selectedProducts = filteredProducts
		},
		handleCleanSelectedProducts(state) {
			state.selectedProducts = []
		},
	},
})

export default productSlice.reducer
export const productSliceAction = productSlice.actions