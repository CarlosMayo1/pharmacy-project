import { supabase } from '../supabase.client'

// NOTES:
// It is possible to create a reusable function?

// fetch producst from supabase
export const fetchProductsFromSupabase = async () => {
	const products = await supabase
		.from('product')
		.select(
			'product_id, name, created_date, user_worker_id, user_worker(worker(worker_id, name, last_name), users(role)), status, is_mixed',
		)
	return products
	// const products = await supabase.from('store').select()
	// return products
}

// insert product in supabase
export const insertProductIntoSupabse = async data => {
	const products = await supabase.from('store').insert(data)
	return products
}

export const updateProductIntoSupabse = async (updateProduct, id) => {
	const { data, error } = await supabase
		.from('products')
		.update(updateProduct)
		.eq('id', id)
	if (error) return error
	if (data) return data
}

// export const deleteDataIntoSupabase = async (id) => {
//   const { data, error } = await supabase.from('products').delete().eq('id', id)
//   if (error) return error
//   if (data) return data
// }

export const updateAmountOfStoreInSupabase = async (updatedStock, id) => {
	const { data, error } = await supabase
		.from('store')
		.update({ stock: updatedStock })
		.eq('product_id', id)
	if (error) return error
	if (data) return data
}

export const insertNewSellIntoSupabse = async data => {
	const products = await supabase.from('sells').insert(data)
	return products
}