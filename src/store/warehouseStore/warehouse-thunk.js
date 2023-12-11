// utils
import {
	fetchBrandsFromSupabase,
	fetchProductClassificationFromSupabase,
	fetchProductTypesFromSupabase,
} from '../../utils/warehouse'
// store
import { warehouseSliceAction } from './warehouse-redux'

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
			dispatch(warehouseSliceAction.getProductBrand(productBrands))
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
			dispatch(
				warehouseSliceAction.getProductClassification(productClassifications),
			)
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
			dispatch(warehouseSliceAction.getProductType(productTypes))
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
			dispatch(warehouseSliceAction.getProductBrand(productBrands))
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
			dispatch(
				warehouseSliceAction.getProductClassification(productClassifications),
			)
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
			dispatch(warehouseSliceAction.getProductType(productTypes))
		})
	}
}

// return async function fetchProductBrands(dispatch, getState) {
//   fetchBrandsFromSupabase().then(response => {
//     dispatch(warehouseSliceAction.getProductBrand(response))
//   })
// }

// export const fetchAllBrandsFromSupabase = createAsyncThunk('warehouse/fetchBrandsFromSupabase', () => {
//   const dispatch = useDispatch()
//   fetchBrandsFromSupabase().then(response => {
//     dispatch()
//   })
// })
