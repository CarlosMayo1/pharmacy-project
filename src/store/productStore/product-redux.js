import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
    }
  }
})

export default productSlice.reducer
export const productSliceAction = productSlice.actions
