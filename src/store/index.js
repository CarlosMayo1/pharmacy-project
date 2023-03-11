import { configureStore } from '@reduxjs/toolkit'

import clientReducer from './clientStore/client-redux'
import productReducer from './productStore/product-redux'

const store = configureStore({
  reducer: {
    clientReducer,
    productReducer
  }
})

export default store
