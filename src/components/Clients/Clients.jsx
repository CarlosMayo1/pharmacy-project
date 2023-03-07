import { useSelector } from 'react-redux'
import ClientsForm from './ClientsForm'
import ClientsTable from './ClientsTable'

import Banner from '../../UI/Banner'

import classes from './Clients.module.css'

const Clients = () => {
  const showBanner = useSelector(state => state.clientReducer.banner)
  return (
    <>
      {showBanner.show ? <Banner>{showBanner.message}</Banner> : null}
      <div className={classes.content}>
        <div className={classes['new-client']}>
          <h3>Registra nuevo cliente</h3>
          <ClientsForm />
        </div>
        <ClientsTable />
      </div>
    </>
  )
}

export default Clients
