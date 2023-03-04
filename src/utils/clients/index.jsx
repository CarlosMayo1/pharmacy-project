import { supabase } from '../supabase.client'

export const fetchClientsFromSupabase = async () => {
  const clients = await supabase.from('clients').select()
  return clients
}

export const insertDataIntoSupabase = async (data) => {
  const { error } = await supabase.from('clients').insert(data)
  return error
}

export const updateDataIntoSupabase = async (updatedClient) => {
  const { data, error } = await supabase.from('clients').update(updatedClient).eq('dni', updatedClient.dni)
  if (error) return error
  if (data) return data
}

export const deleteDataIntoSupabase = async (id) => {
  const { data, error } = await supabase.from('clients').delete().eq('id', id)
  if (error) return error
  if (data) return data
}
