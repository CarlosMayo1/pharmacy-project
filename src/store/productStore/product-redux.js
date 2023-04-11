import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  inputs: {
    name: '',
    common_name: '',
    active_component: '',
    laboratory: '',
    type: '',
    entry_date: '',
    expiration_date: '',
    stock: '',
    price: '',
    function: ''
  },
  banner: {
    show: false,
    message: '',
    style: ''
  },
  listOfProducts: [],
  selectedProducts: [],
  totalAmount: 0
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProducts (state, action) {
      state.listOfProducts = action.payload
    },
    handleInputs (state, action) {
      state.inputs[action.payload.name] = action.payload.value
    },
    // shows a successfull banner
    handleSuccessfullBanner (state, action) {
      state.banner = {
        show: true,
        message: action.payload,
        style: 'success'
      }
    },
    // shows a blue loading banner
    handleLoadingBanner (state) {
      state.banner = {
        show: true,
        message: 'Enviando datos...',
        style: 'loading'
      }
    },
    // shows an error
    handleErrorBanner (state, action) {
      state.banner = {
        show: true,
        message: action.payload,
        style: 'error'
      }
    },
    // reset to initial state
    resetToInitialState (state) {
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
        function: ''
      }

      state.banner = {
        show: false,
        message: '',
        style: ''
      }
    },
    handleSelectedProducts (state, action) {
      state.selectedProducts = action.payload
    },
    handleAddProduct (state, action) {
      const updatedTotalAmount = state.totalAmount + action.payload.price * action.payload.amount

      const existingCartItemIndex = state.selectedProducts.findIndex(item => item.id === action.payload.id)

      const existingCartItem = state.selectedProducts[existingCartItemIndex]

      let updatedSelectedProducts

      if (existingCartItem) {
        const updatedSelectedProduct = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.payload.amount
        }

        updatedSelectedProducts = [...state.selectedProducts]
        updatedSelectedProducts[existingCartItemIndex] = updatedSelectedProduct
      } else {
        updatedSelectedProducts = state.selectedProducts.concat(action.payload)
      }
      state.selectedProducts = updatedSelectedProducts
      state.totalAmount = updatedTotalAmount
    }
  }
})

export default productSlice.reducer
export const productSliceAction = productSlice.actions
