import { useState } from 'react'
import { insertDataIntoSupabase } from '../utils/clients/index'
import { useSelector, useDispatch } from 'react-redux'

import { clientSliceAction } from '../store/clientStore/client-redux'

import classes from './ClientsForm.module.css'

const ClientsForm = () => {
  // use redux
  const dispatch = useDispatch()
  const inputs = useSelector(state => state.clientReducer.inputs)
  const [error, setError] = useState({
    errorDni: '',
    errorName: '',
    errorLastName: '',
    errorPhoneNumber: ''
  })

  const onInputChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    dispatch(clientSliceAction.handleInputs({ name, value }))
  }

  const onSubmitFormHandler = (e) => {
    e.preventDefault()

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

    // creating the object that contains the form data
    const inputsData = {
      dni: inputs.dni,
      name: inputs.name,
      last_name: inputs.lastName,
      phone_number: inputs.phoneNumber
    }

    const insertData = insertDataIntoSupabase(inputsData)

    insertData.then(() => {
      // Shows a successful message
      dispatch(clientSliceAction.handleSuccessfullBanner())
      // resets values to initial state
      dispatch(clientSliceAction.resetToInitialState())
    })

    // // set a message sending data
    dispatch(clientSliceAction.handleLoadingBanner())
  }

  return (
    <form className={classes.form} onSubmit={onSubmitFormHandler}>
      <label>DNI</label>
      <input
        type='number'
        className='form-input'
        name='dni'
        placeholder='DNI'
        onChange={onInputChangeHandler}
        value={inputs.dni}

      />
      <span className={classes['error-message']}>{error.errorDni}</span>
      <label>Nombre del usuario</label>
      <input
        type='text'
        className='form-input'
        name='name'
        placeholder='Nombre del usuario'
        onChange={onInputChangeHandler}
        value={inputs.name}
      />
      <span className={classes['error-message']}>{error.errorName}</span>
      <label>Apellido del usuario</label>
      <input
        type='text'
        className='form-input'
        name='lastName'
        placeholder='Apellido del usuario'
        onChange={onInputChangeHandler}
        value={inputs.lastName}
      />
      <span className={classes['error-message']}>{error.errorLastName}</span>
      <label>Número de teléfono</label>
      <input
        type='number'
        className='form-input'
        name='phoneNumber'
        placeholder='Número de teléfono'
        onChange={onInputChangeHandler}
        value={inputs.phoneNumber}
      />
      <span className={classes['error-message']}>{error.errorPhoneNumber}</span>
      <button type='submit' className={classes['submit-button']}>Ingresar Usuario</button>
    </form>
  )
}

export default ClientsForm
