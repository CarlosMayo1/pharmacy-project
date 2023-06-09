import { supabase } from '../supabase.client'

// fetch producst from supabase
export const fetchSellsFromSupabase = async () => {
  const sells = await supabase.from('sells').select()
  return sells
}

export const fetchSellsByRange = async (start, end) => {
  const sells = await supabase.from('sells').select().gte('date', start).lte('date', end)
  return sells
}
