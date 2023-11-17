import { supabase } from '../supabase.client'

export const fetchStockFromSupabase = async () => {
	const { data, error } = await supabase
		.from('warehouse_stock')
		.select(
			'stock_id, product_detail(product(name), classification(description), product_type(description)), stock, expiration_date, observation',
		)
	if (error) return error
	if (data) return data
}
