// import Auth from './Auth'
import { useEffect } from 'react'
import { fetchClientsFromSupabase } from './utils/clients'

import './App.css'
import Banner from './UI/Banner'
import ClientsTable from './components/clients/ClientsTable'
import ClientsForm from './components/clients/ClientsForm'

// redux toolkit
import { useDispatch, useSelector } from 'react-redux'
import { clientSliceAction } from './store/clientStore/client-redux'

function App () {
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

        dispatch(clientSliceAction.getClients(data))
      }
    })

    // 👇 this code is not working
    setTimeout(() => {
      dispatch(clientSliceAction.resetToInitialState())
    }, 2000)
  }, [showBanner.show])

  return (
    <div className='App'>
      {showBanner.show ? <Banner>{showBanner.message}</Banner> : null}
      <div className='content'>
        <div className='new-client'>
          <h3>Registra nuevo cliente</h3>
          <ClientsForm />
        </div>
        <ClientsTable />
      </div>
    </div>
  )
}

export default App
