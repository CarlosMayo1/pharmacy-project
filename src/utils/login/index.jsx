import { supabase } from '../supabase.client'

export const logIn = async (username, password) => {
	const { data, error } = await supabase
		.from('user_worker')
		.select()
		.or(`username.eq.${username},password.eq.${password}`)
	if (error) return error
	if (data) return data
}
