import { configureStore } from '@reduxjs/toolkit'

import loginReducer from './loginStore/login-redux'
import clientReducer from './clientStore/client-redux'
import productReducer from './productStore/product-redux'
import priceReducer from './priceStore/price-redux'

const store = configureStore({
	reducer: {
		loginReducer,
		clientReducer,
		productReducer,
		priceReducer,
	},
})

export default store
