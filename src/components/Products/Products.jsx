import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import classes from './Products.module.css'

import { fetchProductsFromSupabase, insertProductIntoSupabse } from '../../utils/products'
import { productSliceAction } from '../../store/productStore/product-redux'

const Products = () => {
  // state using redux
  const listOfProducts = useSelector(state => state.productReducer.listOfProducts)
  const dispatch = useDispatch()
  // state of the app
  const [loading, setLoading] = useState(false)
  const [inputs, setIinputs] = useState({
    name: '',
    common_name: '',
    active_component: '',
    laboratory: '',
    type: '',
    entry_date: '',
    expiration_date: '',
    stock: '',
    price: '',
    function: ''
  })

  const onChangeInputHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setIinputs({
      ...inputs,
      [name]: value
    })
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()

    insertProductIntoSupabse(inputs).then(res => {
      console.log('data has been added successfully')
    }).catch(error => {
      console.log(error)
      throw new Error(error)
    })
  }

  useEffect(() => {
    const clients = fetchProductsFromSupabase()
    clients.then(response => {
      const { data } = response
      dispatch(productSliceAction.getProducts(data))
      setLoading(true)
    })
  }, [])
  return (
    <div className={classes.container}>
      <div className={classes['form-wrapper']}>
        <h3>Ingresar producto al inventario</h3>
        <form className={classes.form}>
          <div className={classes['form-control']}>
            <label>Nombre comercial</label>
            <input type='text' id='name' name='name' value={inputs.name} placeholder='Nombre comercial del producto' onChange={onChangeInputHandler} />
          </div>
          <div className={classes['form-control']}>
            <label>Nombre comun</label>
            <input type='text' id='commonName' name='common_name' value={inputs.commonName} placeholder='Nombre comun del producto' onChange={onChangeInputHandler} />
          </div>
          <div className={classes['form-control']}>
            <label>Componente activo</label>
            <input type='text' id='activeComponent' name='active_component' value={inputs.activeComponent} placeholder='Componente activo' onChange={onChangeInputHandler} />
          </div>
          <div className={classes['form-control']}>
            <label>Laboratorio</label>
            <input type='text' id='laboratory' name='laboratory' value={inputs.laboratory} placeholder='Laboratorio' onChange={onChangeInputHandler} />
          </div>
          <div className={classes['form-control']}>
            <label>Tipo</label>
            <input type='text' id='type' name='type' value={inputs.type} placeholder='Tipo de producto' onChange={onChangeInputHandler} />
          </div>
          <div className={classes['form-control']}>
            <label>Fecha de ingreso</label>
            <input type='date' id='entryDate' name='entry_date' value={inputs.entryDate} onChange={onChangeInputHandler} />
          </div>
          <div className={classes['form-control']}>
            <label>Fecha de expiración</label>
            <input type='date' id='expirationDate' name='expiration_date' value={inputs.expirationDate} onChange={onChangeInputHandler} />
          </div>
          <div className={classes['form-control']}>
            <label>Stock</label>
            <input type='number' id='stock' name='stock' value={inputs.stock} placeholder='Cantidad de stock' onChange={onChangeInputHandler} />
          </div>
          <div className={classes['form-control']}>
            <label>Precio</label>
            <input type='number' id='price' name='price' value={inputs.price} placeholder='Precio del producto' onChange={onChangeInputHandler} />
          </div>
          <div className={classes['form-control']}>
            <label>¿Para qué sirve?</label>
            <textarea rows='5' id='function' name='function' value={inputs.function} placeholder='Función del producto' onChange={onChangeInputHandler} />
          </div>
          <div className={classes['form-actions']}>
            <button type='submit' className={classes['submit-button']} onClick={onSubmitHandler}>Ingresar</button>
          </div>
        </form>
      </div>
      <div className={classes['products-table-wrapper']}>
        <h3>Almacen</h3>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Fecha de caducidad</th>
              <th>Funcion</th>
              <th>Cantidad</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? listOfProducts.map(product => (
                <tr key={product.product_id}>
                  <td>{product.name}</td>
                  <td>{product.type}</td>
                  <td>{product.expiration_date}</td>
                  <td>{product.function}</td>
                  <td>{product.stock}</td>
                  <td>
                    <div className={classes['form-actions']}>
                      <button>Editar</button>
                      <button>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Products
