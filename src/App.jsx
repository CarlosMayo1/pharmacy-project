// import Auth from './Auth'
import { useState, useEffect } from 'react'
import { fetchClientsFromSupabase } from './utils'

import './App.css'
import Banner from './UI/Banner'
import ClientsTable from './components/ClientsTable'
import ClientsForm from './components/ClientsForm'
import Modal from './UI/Modal'

function App () {
  const [input, setInput] = useState({
    dni: '',
    name: '',
    lastName: '',
    phoneNumber: ''
  })
  const [error, setError] = useState({
    dniError: '',
    nameError: '',
    lastNameError: '',
    phoneNumberError: ''
  })
  const [loading, setLoading] = useState('loading...')
  const [listOfClients, setListOfClients] = useState('')
  const [banner, setBanner] = useState({
    show: false,
    message: '',
    style: ''
  })
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const clients = fetchClientsFromSupabase()
    clients.then(response => {
      if (response.status === 200) {
        setLoading(null)
        const { data } = response
        setListOfClients(data.reverse())
      }
    })
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setBanner({
        show: false,
        message: '',
        style: ''
      })
    }, 3000)
  }, [banner.show])

  return (
    <div className='App'>
      {showModal ? <Modal /> : null}
      {banner.show ? <Banner style={banner.style}>{banner.message}</Banner> : null}
      <div className='content'>
        <div className='new-client'>
          <h3>Registra nuevo cliente</h3>
          <ClientsForm
            input={input}
            listOfClients={listOfClients}
            setListOfClients={setListOfClients}
            error={error}
            setInput={setInput}
            setError={setError}
            setBanner={setBanner}
          />
        </div>
        <ClientsTable loading={loading} listOfClients={listOfClients} />
      </div>
    </div>
  )
}

export default App
