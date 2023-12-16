import { supabase } from '../supabase.client'

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

// fetch all the functions from product_functions table
export const fetchFunctionsFromSupabase = async () => {
	const { data, error } = await supabase
		.from('product_function')
		.select('function_id, description')
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

// search for an specific function
export const searchForFunctionInSupabase = async fnct => {
	const { data, error } = await supabase
		.from('product_function')
		.select('description')
		.eq('function_id', fnct)
	if (data) return data
	if (error) return error
}

// insert data into product table and retrieve the record
export const insertNewProductInSupabase = async newProduct => {
	const { data, error } = await supabase
		.from('product')
		.insert(newProduct)
		.select()
	if (data) return data
	if (error) return error
	return error
}

// insert a new brand in the table
export const insertNewBrandInSupabse = async data => {
	const { error } = await supabase.from('product_brand').insert(data)
	return error
}

// insert a new classification in the table
export const insertNewClassificationInSupabase = async data => {
	const { error } = await supabase.from('product_classification').insert(data)
	return error
}

// insert a new type in the table
export const insertNewProductTypeInSupabase = async data => {
	const { error } = await supabase.from('product_type').insert(data)
	return error
}

// insert new price in the table
export const insertNewPriceInSupabase = async price => {
	const { error } = await supabase.from('product_price').insert(price)
	return error
}

// insert bulk of functions associated to the product
export const insertNewFunctionsInSupabase = async arrFunctions => {
	const { error } = await supabase
		.from('product_functions')
		.insert(arrFunctions)
	return error
}
