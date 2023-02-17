import { supabase } from './supabase.client'

export const fetchClientsFromSupabase = async () => {
  const clients = await supabase.from('clients').select()
  return clients
}

export const insertDataIntoSupabase = async (data) => {
  const { error } = await supabase.from('clients').insert(data)
  return error
}
