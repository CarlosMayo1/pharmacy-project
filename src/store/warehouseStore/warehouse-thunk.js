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
			dispatch(warehouseSliceAction.getProductBrand(response))
		})

		// fetch all product classification from supabase
		fetchProductClassificationFromSupabase().then(response => {
			dispatch(warehouseSliceAction.getProductClassification(response))
		})

		// fetch all product types from supabase
		fetchProductTypesFromSupabase().then(response => {
			dispatch(warehouseSliceAction.getProductType(response))
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
