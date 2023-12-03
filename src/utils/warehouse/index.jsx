import { supabase } from '../supabase.client'

// insert data into product table
export const insertNewProduct = async data => {
	const { error } = await supabase.from('product').insert(data)
	return error
}

// fetch all the brands from product_brand table
export const fetchBrandsFromSupabase = async () => {
	const { data, error } = await supabase
		.from('product_brand')
		.select('product_brand_id, name')
		.eq('state', 1)
	if (data) return data
	if (error) return error
}

// fetch all the product classification from product_classification table
export const fetchProductClassificationFromSupabase = async () => {
	const { data, error } = await supabase
		.from('product_classification')
		.select('product_classification_id, name')
		.eq('state', 1)
	if (data) return data
	if (error) return error
}

// fetch all the product types from product_type table
export const fetchProductTypesFromSupabase = async () => {
	const { data, error } = await supabase
		.from('product_type')
		.select('product_type_id, name')
		.eq('state', 1)
	if (data) return data
	if (error) return error
}
