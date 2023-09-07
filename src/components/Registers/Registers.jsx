import { useState, useEffect, useSelect, useDispatch } from 'react'

import { fetchSellsFromSupabase, fetchSellsByRange } from '../../utils/sells/index'

import classes from './Registers.module.css'

const Registers = () => {
  const [listOfProducts, setListOfProducts] = useState([])
  const [selectedOption, setSelectedOption] = useState('day')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const onChangeSelectHandler = (e) => {
    setSelectedOption(e.target.value)
  }

  const onChangeStartDateHandler = (e) => {
    const newStartedDate = e.target.value + ' ' + '00:00:00'
    setStartDate(newStartedDate)
  }

  const onChangeEndDateHandler = (e) => {
    const newEndedDate = e.target.value + ' ' + '23:59:59.999'
    setEndDate(newEndedDate)
  }

  const onSubmitFilterHandler = (e) => {
    e.preventDefault()

    if (selectedOption === 'day') {
      console.log('showing sells of the day')
    }

    if (selectedOption === 'week') {
      if (startDate !== '' && endDate !== '') {
        const range = fetchSellsByRange(startDate, endDate)
        range.then(response => setListOfProducts(response.data))
      } else {
        throw new Error('Empty spaces are not acceptable')
      }
    }

    if (selectedOption === 'month') {
      console.log('showing sells of the month')
    }

    console.log('this is the end of the program')
  }

  useEffect(() => {
    const sells = fetchSellsFromSupabase()
    sells.then(response => {
      const data = response.data
      console.log(data)
      setListOfProducts(data)
    })
  }, [])

  function dateFormat (date) {
    const newDate = new Date(date)
    return newDate.getDate() + '/' + newDate.getMonth() + '/' + newDate.getFullYear()
  }

  return (
    <div className={classes.container}>
      <h2>Registros</h2>
      <div className={classes.content}>
        <h4>Filtrar</h4>
        <form className={classes.filter} onSubmit={onSubmitFilterHandler}>
          <select onChange={onChangeSelectHandler}>
            <option value='day' selected='day'>Diario</option>
            <option value='week'>Semanal</option>
            <option value='month'>Mensual</option>
          </select>
          {
            selectedOption === 'week'
              ? <div>
                <div>
                  <label>Inicio</label>
                  <input type='date' id='start' onChange={onChangeStartDateHandler} />
                </div>
                <div>
                  <label>Fin</label>
                  <input type='date' id='end' onChange={onChangeEndDateHandler} />
                </div>
                </div>
              : null
          }
          {
            selectedOption === 'month'
              ? <div>
                <label>Seleccione el mes</label>
                <input type='month' value='2023-06' />
              </div>
              : null
          }
          {/* <div>
            <label>Seleccione el mes</label>
            <input type='month' value='2023-06' />
          </div> */}
          <button type='submit'>Filtrar</button>
        </form>
        <div className={classes.total}>Total: {listOfProducts.reduce((accumulator, object) => {
          return accumulator + object.total
        }, 0)}
        </div>
        <ul className={classes.products}>
          <li>
            <ul>
              {listOfProducts.map((product, index) => {
                return (
                  <li key={product.id}>
                    <p className={classes['product-title']}>Compra #{index + 1}</p>
                    <table className={classes.table}>
                      <thead>
                        <tr>
                          <th>Fecha</th>
                          <th>Nombre</th>
                          <th>tipo</th>
                          <th>Cantidad</th>
                          <th>Precio</th>
                          <th>Total</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {JSON.parse(product.list_of_products).map(subproduct => {
                          return (
                            <tr key={subproduct.id}>
                              <td>{dateFormat(product.date)}</td>
                              <td>{subproduct.name}</td>
                              <td>{subproduct.type}</td>
                              <td>{subproduct.amount}</td>
                              <td>{subproduct.price}</td>
                              <td>{subproduct.amount * subproduct.price}</td>
                              <td>
                                <button>Eliminar</button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                    <p className={classes.subtotal}>Subtotal: {JSON.parse(product.list_of_products).reduce((accumulator, object) => {
                      return accumulator + object.total
                    }, 0)}
                    </p>
                  </li>
                )
              })}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Registers
