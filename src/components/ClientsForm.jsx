import { insertDataIntoSupabase } from '../utils/index'

import classes from './ClientsForm.module.css'

const ClientsForm = (
  {
    input,
    listOfClients,
    error,
    setInput,
    setError,
    setBanner,
    setListOfClients
  }) => {
  const onInputChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    // setting all the input in a single state
    setInput((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  const onSubmitFormHandler = (e) => {
    e.preventDefault()

    // Do not send data if the inputs are empty
    if (input.dni === '' &&
      input.name === '' && input.lastName === '' &&
      input.phoneNumber === ''
    ) {
      setError({
        dniError: 'El DNI no debe estar vacio',
        nameError: 'El nombre no debe estar vacio',
        lastNameError: 'El apellido no debe estar vacio',
        phoneNumberError: 'El telefono no debe estar vacio'
      })
      return
    }

    // validates DNI
    if (input.dni.split('').length !== 8) {
      setError(prevState => {
        return {
          ...prevState,
          dniError: 'El DNI debe contener 8 digitos'
        }
      })
      return
    }

    // validates phone number
    if (input.phoneNumber.split('').length !== 9) {
      setError(prevState => {
        return {
          ...prevState,
          phoneNumberError: 'El teléfono debe contener 9 números'
        }
      })
      return
    }

    // creating the object that contains the form data
    const inputsData = {
      dni: input.dni,
      name: input.name,
      last_name: input.lastName,
      phone_number: input.phoneNumber
    }

    const insertData = insertDataIntoSupabase(inputsData)

    insertData.then(() => {
      // Shows a successful message
      setBanner({
        show: true,
        message: 'Se ha registrado un nuevo cliente exitosamente',
        style: 'success'
      })

      // insert data
      const newListsOfClients = [...listOfClients]
      newListsOfClients.unshift(inputsData)
      setListOfClients(newListsOfClients)
    }).catch(error => {
      // throw an error in case something goes wrong with the databas
      setBanner({
        show: true,
        message: 'Oops algo salio mal',
        style: 'error'
      })
      throw Error(error)
    })

    // set a message sending data
    setBanner({
      show: true,
      message: 'Enviando datos...',
      style: 'loading'
    })
    resetInputToDefaultValue()
  }

  // reset inputs to initial state
  const resetInputToDefaultValue = () => {
    setInput({
      dni: '',
      name: '',
      lastName: '',
      phoneNumber: ''
    })

    setError({
      dniError: '',
      nameError: '',
      lastNameError: '',
      phoneNumberError: ''
    })
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
        value={input.dni}
      />
      <span className={classes['error-message']}>{error.dniError}</span>
      <label>Nombre del usuario</label>
      <input
        type='text'
        className='form-input'
        name='name'
        placeholder='Nombre del usuario'
        onChange={onInputChangeHandler}
        value={input.name}
      />
      <span className={classes['error-message']}>{error.nameError}</span>
      <label>Apellido del usuario</label>
      <input
        type='text'
        className='form-input'
        name='lastName'
        placeholder='Apellido del usuario'
        onChange={onInputChangeHandler}
        value={input.lastName}
      />
      <span className={classes['error-message']}>{error.lastNameError}</span>
      <label>Número de teléfono</label>
      <input
        type='number'
        className='form-input'
        name='phoneNumber'
        placeholder='Número de teléfono'
        onChange={onInputChangeHandler}
        value={input.phoneNumber}
      />
      <span className={classes['error-message']}>{error.phoneNumberError}</span>
      <button type='submit' className={classes['submit-button']}>Ingresar Usuario</button>
    </form>
  )
}

export default ClientsForm
