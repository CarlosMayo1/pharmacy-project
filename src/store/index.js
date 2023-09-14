import { configureStore } from '@reduxjs/toolkit'

import loginReducer from './loginStore/login-redux'
import clientReducer from './clientStore/client-redux'
import productReducer from './productStore/product-redux'

const store = configureStore({
	reducer: {
		loginReducer,
		clientReducer,
		productReducer,
	},
})

export default store
