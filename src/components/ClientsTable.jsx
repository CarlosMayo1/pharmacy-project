import { useSelector } from 'react-redux'

import classes from './ClientsTable.module.css'

const ClientsTable = ({ setShowModal, setUpdateClient }) => {
  // state using redux
  const listOfClients = useSelector(state => state.clientReducer.listOfClients)
  const loading = useSelector(state => state.clientReducer.loading)

  const onClickUpdatHandler = (client) => {
    console.log(`The follogin DNI: ${client.dni} has been clicked`)

    setUpdateClient(client)

    // shows edit modal handler
    onUpdateClientHandler()
  }

  const onUpdateClientHandler = () => {
    setShowModal(prevState => !prevState)
  }

  return (
    <div className='list-clients'>
      <h3>Lista de clientes</h3>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>DNI</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Número de teléfono</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ?? listOfClients.map(client => (
            <tr key={client.dni}>
              <td>{client.dni}</td>
              <td>{client.name}</td>
              <td>{client.last_name}</td>
              <td>{client.phone_number}</td>
              <td>
                <div>
                  <button onClick={() => onClickUpdatHandler(client)}>update</button>
                  <button>delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ClientsTable
