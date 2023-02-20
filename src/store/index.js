import { configureStore } from '@reduxjs/toolkit'

import clientReducer from './clientStore/client-redux'

const store = configureStore({
  reducer: {
    clientReducer
    // store
  }
})

export default store
