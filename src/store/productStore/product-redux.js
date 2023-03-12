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
  listOfProducts: [],
  banner: {
    show: false,
    message: '',
    style: ''
  }
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
    }
  }
})

export default productSlice.reducer
export const productSliceAction = productSlice.actions
