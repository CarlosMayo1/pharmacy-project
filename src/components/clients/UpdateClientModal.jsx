import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactDOM from 'react-dom'
import Modal from '../../UI/Modal'

import classes from './UpdateClientModal.module.css'

import { updateDataIntoSupabase } from '../../utils/clients'
import { clientSliceAction } from '../../store/clientStore/client-redux'

const ClientsModal = ({ onClose }) => {
  // redux state -> showing info from the selected client
  const updateClientInfo = useSelector(state => state.clientReducer.updateClient)
  const dispatch = useDispatch()
  // state of the app
  const [inputs, setInputs] = useState({
    dni: updateClientInfo.dni.toString(),
    name: updateClientInfo.name,
    lastName: updateClientInfo.last_name,
    phoneNumber: updateClientInfo.phone_number
  })
  const [error, setError] = useState({
    dniError: '',
    nameError: '',
    lastNameError: '',
    phoneNumberError: ''
  })

  // handling inputs
  const onInputHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setInputs(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  const onUpdateClientHandler = (e) => {
    e.preventDefault()

    // if fields are empty they through and error
    if (inputs.dni === '' &&
    inputs.name === '' && inputs.lastName === '' &&
    inputs.phoneNumber === '') {
      setError({
        errorDni: 'El DNI no puede estar vacío',
        errorName: 'El nombre no puede estar vacío',
        errorLastName: 'El apellido no puede estar vacío',
        errorPhoneNumber: 'El apellido no puede estar vacío'
      })
      return
    }

    // validate DNI
    if (inputs.dni.split('').length !== 8) {
      setError({
        errorDni: 'El DNI debe contener 8 números',
        errorName: '',
        errorLastName: '',
        errorPhoneNumber: ''
      })
      return
    }

    // validate phone number
    if (inputs.phoneNumber.split('').length !== 9) {
      setError({
        errorDni: '',
        errorName: '',
        errorLastName: '',
        errorPhoneNumber: 'El teléono debe contener 9 números'
      })
      return
    }

    const updatedData = {
      dni: inputs.dni,
      name: inputs.name,
      last_name: inputs.lastName,
      phone_number: inputs.phoneNumber
    }

    const response = updateDataIntoSupabase(updatedData)

    response.then(() => {
      // shows a successful banner
      dispatch(clientSliceAction.handleSuccessfullBanner('Se ha editado el cliente correctamente'))
    }).catch(error => {
      dispatch(clientSliceAction.handleErrorBanner('¡Oops error al editar cliente!'))
      throw new Error(error)
    })
    // close modal
    onClose()
  }

  return (
    <Modal onClose={onClose}>
      <form className={classes.form} onSubmit={onUpdateClientHandler}>
        <h3>Editar cliente</h3>
        <label>Editar DNI</label>
        <input
          type='number'
          name='dni'
          placeholder='DNI'
          value={inputs.dni}
          onChange={onInputHandler}
        />
        <span className={classes['error-message']}>{error.errorDni}</span>
        <label>Editar nombre</label>
        <input
          type='text'
          name='name'
          placeholder='Nombre'
          value={inputs.name}
          onChange={onInputHandler}
        />
        <span className={classes['error-message']}>{error.errorName}</span>
        <label>Editar apellido</label>
        <input
          type='text'
          name='lastName'
          placeholder='Apellido'
          value={inputs.lastName}
          onChange={onInputHandler}
        />
        <span className={classes['error-message']}>{error.errorLastName}</span>
        <label>Editar numero de teléfono</label>
        <input
          type='number'
          name='phoneNumber'
          placeholder='Número de teléfono'
          value={inputs.phoneNumber}
          onChange={onInputHandler}
        />
        <span className={classes['error-message']}>{error.errorPhoneNumber}</span>
        <div className={classes.actions}>
          <button type='submit' className={classes['submit-button']}>Editar</button>
        </div>
      </form>
    </Modal>
  )
}

// showing modal through portal
export default function UpdateClienteModal ({ onClose, updateClienteInfo }) {
  return ReactDOM.createPortal(
    <ClientsModal onClose={onClose} updateClientInfo={updateClienteInfo} />,
    document.getElementById('root-modal')
  )
}
