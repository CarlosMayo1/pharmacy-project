import { supabase } from '../supabase.client'

// fetch all the prices of the products
export const fetchProductPriceFromSupabase = async () => {
	const { data, error } = await supabase
		.from('product_price')
		.select(
			'product_price_id, product_detail(product_detail_id, product(name), classification(description), product_type(description)), price, status',
		)
		.gt('status', 0)

	if (error) return error
	if (data) return data
}

export const updateStatusOfPriceFromSupabase = async product_detail_id => {
	const { error } = await supabase
		.from('product_price')
		.update({ status: 0 })
		.eq('product_price_id', product_detail_id)
	return error
}

export const createNewProductPrice = async data => {
	const { error } = await supabase.from('product_price').insert({
		product_detail_id: data.product_detail_id,
		price: data.newPrice,
		status: 1,
		date: data.date,
	})
	return error
}
