import { supabase } from '../supabase.client'

// insert data into product table and retrieve the record
export const insertNewProductInSupabase = async data => {
	const { error } = await supabase.from('product').insert(data).select()
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

// search for a product in the table
export const searchForAProductByNameInSupabase = async productName => {
	const { data, error } = await supabase
		.from('product')
		.select('product_id, name')
		.ilike('name', `%${productName}%`)
		.limit(3)
	// .textSearch('name', `${productName}`)
	if (data) return data
	if (error) return error
}

// check if the inserted brand already exists in database
export const searchForExistingBrandInSupabase = async productBrand => {
	const { data, error } = await supabase
		.from('product_brand')
		.select()
		.eq('name', productBrand)
	if (data) return data
	if (error) return error
}

// check if the inserted classification already exists in database
export const searchForExistingClassificationInSupabase =
	async productClassification => {
		const { data, error } = await supabase
			.from('product_classification')
			.select()
			.eq('name', productClassification)
		if (data) return data
		if (error) return error
	}

// check if the inserted product type already exists in database
export const searchForExistingProductTypeInSupabase = async productType => {
	const { data, error } = await supabase
		.from('product_type')
		.select()
		.eq('name', productType)
	if (data) return data
	if (error) return error
}

// insert a new brand in the table
export const insertNewBrandInSupabse = async data => {
	const { error } = await supabase.from('product_brand').insert(data)
	return error
}

// inser a new classification in the table
export const insertNewClassificationInSupabase = async data => {
	const { error } = await supabase.from('product_classification').insert(data)
	return error
}

export const insertNewProductTypeInSupabase = async data => {
	const { error } = await supabase.from('product_type').insert(data)
	return error
}
