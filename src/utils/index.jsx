import { supabase } from './supabase.client'

export const insertDataIntoSupabase = async (data) => {
  const { error } = await supabase.from('clients').insert(data)
  return error
}
