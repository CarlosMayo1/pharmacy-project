// import Auth from './Auth'
import { useState, useEffect } from 'react'
import { fetchClientsFromSupabase } from './utils/clients'

import './App.css'
import Banner from './UI/Banner'
import ClientsTable from './components/ClientsTable'
import ClientsForm from './components/ClientsForm'
import ClientsModal from './components/ClientsModal'

// trying redux toolkit
import { useDispatch, useSelector } from 'react-redux'
import { clientSliceAction } from './store/clientStore/client-redux'

function App () {
  const [showModal, setShowModal] = useState(false)
  const [updateClient, setUpdateClient] = useState({
    updateDni: '',
    updateName: '',
    updateLastName: '',
    updatePhoneNumber: ''
  })

  // react redux
  const dispatch = useDispatch()
  const showBanner = useSelector(state => state.clientReducer.banner)

  useEffect(() => {
    const clients = fetchClientsFromSupabase()
    clients.then(response => {
      if (response.status === 200) {
        dispatch(clientSliceAction.loadingTable())
        const { data } = response

        // 👁️ sorting data based on the date 👇
        data.sort((date1, date2) => {
          return new Date(date2.created_at) - new Date(date1.created_at)
        })

        console.log('Data has been added')
        dispatch(clientSliceAction.getClients(data))
      }
    })

    // 👇 this code is not working
    setTimeout(() => {
      console.log('Excuting code inside the timeout')
      dispatch(clientSliceAction.resetToInitialState())
    }, 3000)

    // return clearTimeout(timeout)
  }, [showBanner.show])

  return (
    <div className='App'>
      {showModal ? <ClientsModal setShowModal={setShowModal} updateClient={updateClient} /> : null}
      {showBanner.show ? <Banner>{showBanner.message}</Banner> : null}
      <div className='content'>
        <div className='new-client'>
          <h3>Registra nuevo cliente</h3>
          <ClientsForm />
        </div>
        <ClientsTable
          setShowModal={setShowModal}
          setUpdateClient={setUpdateClient}
        />
      </div>
    </div>
  )
}

export default App
