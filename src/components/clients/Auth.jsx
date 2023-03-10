import { useState } from 'react'
import { supabase } from '../../utils/supabase.client'

const Auth = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) throw error
      console.log('Check your email for the login link!')
    } catch (error) {
      console.log(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='row flex-center flex'>
      <div className='col-6 form-widget' aria-live='polite'>
        <h2 className='header'>Supabase + React</h2>
        <p className='description'>Sign in via magic link with your email below</p>
        {loading
          ? (
              'Sending magic link...'
            )
          : (
            <form onSubmit={handleLogin}>
              <label htmlFor='email'>Email</label>
              <input
                id='email'
                className='inputField'
                type='email'
                placeholder='Your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className='button block' aria-live='polite'>
                Send magic link
              </button>
            </form>
            )}
      </div>
    </div>
  )
}

export default Auth
