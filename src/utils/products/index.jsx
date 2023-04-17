import { supabase } from '../supabase.client'

// fetch producst from supabase
export const fetchProductsFromSupabase = async () => {
  const products = await supabase.from('store').select()
  return products
}

// insert product in supabase
export const insertProductIntoSupabse = async (data) => {
  const products = await supabase.from('store').insert(data)
  return products
}

export const updateProductIntoSupabse = async (updateProduct, id) => {
  const { data, error } = await supabase.from('products').update(updateProduct).eq('id', id)
  if (error) return error
  if (data) return data
}
