import { supabase } from '../supabase.client'

// insert product in supabase
export const insertProductIntoSupabse = async (data) => {
  const products = await supabase.from('store').insert(data)
  return products
}
