import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import classes from './ClientsTable.module.css'

import { clientSliceAction } from '../../store/clientStore/client-redux'
import UpdadateClientModal from './UpdateClientModal'
import Pagination from './Pagination'

const ClientsTable = () => {
  // state using redux
  const listOfClients = useSelector(state => state.clientReducer.listOfClients)
  const loading = useSelector(state => state.clientReducer.loading)
  const dispatch = useDispatch()

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [clientsPerPage] = useState(10)
  // updating client
  const [showModal, setShowModal] = useState(false)

  // close update modal
  const onCloseModal = () => {
    setShowModal(false)
  }

  // show update modal
  const onShowModal = (client) => {
    // getting client info
    dispatch(clientSliceAction.updateClient(client))
    setShowModal(true)
  }

  // Logic of pagination
  const lastClientsIndex = currentPage * clientsPerPage
  const firstClientsIndex = lastClientsIndex - clientsPerPage
  const currentClients = listOfClients.slice(firstClientsIndex, lastClientsIndex)

  return (
    <div className='list-clients'>
      <h3>Lista de clientes </h3>
      {/* modal that containt the form to update client */}
      {
      showModal
        ? <UpdadateClientModal onClose={onCloseModal} />
        : null
      }
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
          {loading ?? currentClients.map((client, index) => (
            <tr key={index}>
              <td>{client.dni}</td>
              <td>{client.name}</td>
              <td>{client.last_name}</td>
              <td>{client.phone_number}</td>
              <td>
                <div className={classes.actions}>
                  <button className={classes.update} onClick={() => onShowModal(client)}><i className='fa-sharp fa-regular fa-pen-to-square' /></button>
                  <button className={classes.delete}><i className='fa-solid fa-trash' /></button>
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
