import { supabase } from '../supabase.client'

export const logIn = async (username, password) => {
	const { data, error } = await supabase
		.from('user_worker')
		.select(`user_worker_id, users(role), worker(name, last_name), status`)
		.eq('username', username)
		.eq('password', password)
	if (error) return error
	if (data) return data
}
