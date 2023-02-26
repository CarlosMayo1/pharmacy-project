import { useState } from 'react'
import { useSelector } from 'react-redux'

import classes from './ClientsTable.module.css'

import Pagination from './Pagination'

const ClientsTable = ({ setShowModal, setUpdateClient }) => {
  // state using redux
  const listOfClients = useSelector(state => state.clientReducer.listOfClients)
  const loading = useSelector(state => state.clientReducer.loading)
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [clientsPerPage, setClientsPerPage] = useState(10)

  const onClickUpdatHandler = (client) => {
    console.log(`The follogin DNI: ${client.dni} has been clicked`)

    setUpdateClient(client)

    // shows edit modal handler
    onUpdateClientHandler()
  }

  const onUpdateClientHandler = () => {
    setShowModal(prevState => !prevState)
  }

  // Logic of pagination
  const lastClientsIndex = currentPage * clientsPerPage
  const firstClientsIndex = lastClientsIndex - clientsPerPage
  const currentClients = listOfClients.slice(firstClientsIndex, lastClientsIndex)

  return (
    <div className='list-clients'>
      <h3>Lista de clientes </h3>
      <span>Número de clientes = {listOfClients.length}</span>
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
          {loading ?? currentClients.map(client => (
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
      <Pagination
        totalClients={listOfClients.length}
        clientsPerPage={clientsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  )
}

export default ClientsTable
