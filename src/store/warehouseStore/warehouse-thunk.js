// utils
import {
	fetchBrandsFromSupabase,
	fetchProductClassificationFromSupabase,
	fetchProductTypesFromSupabase,
	fetchFunctionsFromSupabase,
	fetchProductsFromSupabase,
	fetchLostProductsFromSupabase,
} from '../../utils/warehouse'
// store
import { warehouseSliceAction } from './warehouse-redux'

// ===============================
// FETCH
// ===============================

// fetch all brands from supabase by using thunk
export const addProductModal = () => {
	// thunk
	return async function fetchModalData(dispatch) {
		// fetch all product brands from supabase
		fetchBrandsFromSupabase().then(response => {
			const productBrands = []
			const brands = response
			brands.map(brand => {
				productBrands.push({ value: brand.product_brand_id, label: brand.name })
			})
			// ☑️ sorting array alphabetically
			const orderedArr = sortArrAphabetically(productBrands)
			dispatch(warehouseSliceAction.getProductBrand(orderedArr))
		})

		// fetch all product classification from supabase
		fetchProductClassificationFromSupabase().then(response => {
			const productClassifications = []
			const classifications = response
			classifications.map(classification => {
				productClassifications.push({
					value: classification.product_classification_id,
					label: classification.name,
				})
			})
			// ☑️ sorting array alphabetically
			const orderedArr = sortArrAphabetically(productClassifications)
			dispatch(warehouseSliceAction.getProductClassification(orderedArr))
		})

		// fetch all product types from supabase
		fetchProductTypesFromSupabase().then(response => {
			const productTypes = []
			const types = response
			types.map(type => {
				productTypes.push({
					value: type.product_type_id,
					label: type.name,
				})
			})
			// ☑️ sorting array alphabetically
			const orderedArr = sortArrAphabetically(productTypes)
			dispatch(warehouseSliceAction.getProductType(orderedArr))
		})

		// fetch all the functions from supabase
		fetchFunctionsFromSupabase().then(response => {
			const productFunctions = []
			const functions = response
			functions.map(type => {
				productFunctions.push({
					value: type.function_id,
					label: type.description,
				})
			})
			// ☑️ sorting array alphabetically
			const orderedArr = sortArrAphabetically(productFunctions)
			dispatch(warehouseSliceAction.getProductFunctions(orderedArr))
		})

		fetchProductsFromSupabase().then(response => {
			const sortedArr = response.sort((a, b) => {
				if (a.name < b.name) {
					return -1
				}
				if (a.name > b.name) {
					return 1
				}
				return 0
			})
			dispatch(warehouseSliceAction.getListOfProducts(sortedArr))
		})
	}
}

export const fetchProductBrand = () => {
	return async function getProductBrands(dispatch) {
		fetchBrandsFromSupabase().then(response => {
			const productBrands = []
			const brands = response
			brands.map(brand => {
				productBrands.push({ value: brand.product_brand_id, label: brand.name })
			})
			// ☑️ sorting array alphabetically
			const orderedArr = sortArrAphabetically(productBrands)
			dispatch(warehouseSliceAction.getProductBrand(orderedArr))
		})
	}
}

export const fetchProductClassification = () => {
	return async function getProductClassifications(dispatch) {
		fetchProductClassificationFromSupabase().then(response => {
			const productClassifications = []
			const classifications = response
			classifications.map(classification => {
				productClassifications.push({
					value: classification.product_classification_id,
					label: classification.name,
				})
			})
			// ☑️ sorting array alphabetically
			const orderedArr = sortArrAphabetically(productClassifications)
			dispatch(warehouseSliceAction.getProductClassification(orderedArr))
		})
	}
}

export const fetchProductType = () => {
	return async function getProductTypes(dispatch) {
		fetchProductTypesFromSupabase().then(response => {
			const productTypes = []
			const types = response
			types.map(type => {
				productTypes.push({
					value: type.product_type_id,
					label: type.name,
				})
			})
			// ☑️ sorting array alphabetically
			const orderedArr = sortArrAphabetically(productTypes)
			dispatch(warehouseSliceAction.getProductType(orderedArr))
		})
	}
}

export const fetchFunction = () => {
	return async function getFunctions(dispatch) {
		fetchFunctionsFromSupabase().then(response => {
			const productFunctions = []
			const functions = response
			functions.map(type => {
				productFunctions.push({
					value: type.function_id,
					label: type.description,
				})
			})
			// ☑️ sorting array alphabetically
			const orderedArr = sortArrAphabetically(productFunctions)
			dispatch(warehouseSliceAction.getProductFunctions(orderedArr))
		})
	}
}

export const fetchProductsForSelect = () => {
	return async function getProducts(dispatch) {
		fetchProductsFromSupabase().then(response => {
			const listOfProducts = []
			const products = response
			products.map(type => {
				listOfProducts.push({
					value: type.product_id,
					label: type.name,
				})
			})
			// ☑️ sorting array alphabetically
			const orderedArr = sortArrAphabetically(listOfProducts)
			dispatch(warehouseSliceAction.getListOfProducts(orderedArr))
		})
	}
}

export const fetchLostProducts = () => {
	return async function getLostProducts(dispatch) {
		fetchLostProductsFromSupabase().then(response => {
			console.log(response)
			const sortedArr = response.sort((a, b) => {
				if (a.product.name < b.product.name) {
					return -1
				}
				if (a.name > b.name) {
					return 1
				}
				return 0
			})
			// const listOfLostProducts = [...response]
			// if the request is successfull
			if (response.length > 0) {
				dispatch(warehouseSliceAction.getLostProducts(sortedArr))
			}
		})
	}
}

// sorting function
const sortArrAphabetically = arr => {
	// sorting array alphabetically
	const sortedArr = arr.sort((a, b) => {
		let first = a.label.toLowerCase()
		let second = b.label.toLowerCase()

		if (first < second) {
			return -1
		}
		if (first > second) {
			return 1
		}
		return 0
	})

	return sortedArr
}
