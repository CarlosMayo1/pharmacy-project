// import Auth from './Auth'
import { useState } from 'react'
import { insertDataIntoSupabase } from './utils'

import './App.css'

function App () {
  const [input, setInput] = useState({
    dni: '',
    name: '',
    lastname: '',
    phoneNumber: ''
  })
  const [message, setMessage] = useState('')

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
    // creating the object that contains the form data
    const inputsData = {
      dni: input.dni,
      name: input.name,
      last_name: input.lastname,
      phone_number: input.phoneNumber
    }

    const insertData = insertDataIntoSupabase(inputsData)

    insertData.then(error => {
      console.log(error)

      if (error === null) {
        console.log('This has worked correctly')
        setMessage('This has worked correctly')
      }
    })
    resetInputToDefaultValue()
  }

  // reset inputs to initial state
  const resetInputToDefaultValue = () => {
    setInput({
      dni: '',
      name: '',
      lastname: '',
      phoneNumber: ''
    })
  }

  return (
    <div className='App'>
      <div className='new-client'>
        <h3>Registra nuevo cliente</h3>
        <form className='form' onSubmit={onSubmitFormHandler}>
          <label>DNI</label>
          <input type='number' className='form-input' name='dni' placeholder='DNI' onChange={onInputChangeHandler} value={input.dni} />
          <label>Nombre del usuario</label>
          <input type='text' className='form-input' name='name' placeholder='Nombre del usuario' onChange={onInputChangeHandler} />
          <label>Apellido del usuario</label>
          <input type='text' className='form-input' name='lastname' placeholder='Apellido del usuario' onChange={onInputChangeHandler} />
          <label>Número de teléfono</label>
          <input type='number' className='form-input' name='phoneNumber' placeholder='Número de teléfono' onChange={onInputChangeHandler} />
          <button type='submit' className='submit-button'>Ingresar Usuario</button>
        </form>
        {message}
      </div>
      <div className='list-clients'>
        <h3>Lista de clientes</h3>
        <table>
          <thead>
            <tr>
              <th>DNI</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Número de teléfono</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>49003535</td>
              <td>Carlos Hernan</td>
              <td>Mayo Borja</td>
              <td>956533328</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* {clients.length > 0 ? clients.map(client => <p key={client.id}>{client.dni} || {client.name}</p>) : <p>loading...</p>} */}
    </div>
  )
}

export default App
