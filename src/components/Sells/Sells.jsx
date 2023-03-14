import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { productSliceAction } from '../../store/productStore/product-redux'
import { fetchProductsFromSupabase } from '../../utils/products'

// components
import SellProducts from './SellProducts'

import classes from './Sells.module.css'

import Card from '../../UI/Card'

const Sell = () => {
  // redux
  const listOfProducts = useSelector(state => state.productReducer.listOfProducts)
  const dispatch = useDispatch()

  const onSearchProductHandler = (e) => {
    console.log(e.target.value)
  }

  useEffect(() => {
    // getting products from database
    const products = fetchProductsFromSupabase()
    products.then(response => {
      const { data } = response
      dispatch(productSliceAction.getProducts(data))
    })
  }, [])
  return (
    <div className={classes.container}>
      <Card>
        <h3>Productos</h3>
        <form className={classes.form}>
          <input type='text' id='search' name='search' placeholder='Buscar producto' onChange={onSearchProductHandler} />
          <button className={classes.search}>Buscar</button>
        </form>
        {listOfProducts.length > 0 ? <SellProducts listOfProducts={listOfProducts} /> : <p>Loading...</p>}
      </Card>
      <Card>
        <div className='buy-section'>
          <h3>Compras </h3>
          <form>
            <div className={classes['inputs-container']}>
              <input type='text' placeholder='C0001' />
              <input type='text' placeholder='49003535' />
              <input type='text' placeholder='Calos Mayo' />
              <button className={classes['new-sell']}>Nueva venta</button>
            </div>
          </form>
          <div className={classes.bill}>
            <h4>Pedido</h4>
            <table className={classes.table}>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Tipo</th>
                  <th>Cantidad</th>
                  <th>Precio Uni</th>
                  <th>Monto</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Alcohol</td>
                  <td>Frasco</td>
                  <td>1</td>
                  <td>S/ 10</td>
                  <td>S/ 10</td>
                  <td>
                    <button className={classes.delete}><i className='fa-solid fa-trash' /></button>
                  </td>
                </tr>
                <tr>
                  <td>Paracetamol</td>
                  <td>Pastilla</td>
                  <td>5</td>
                  <td>S/ 0.30</td>
                  <td>S/ 1.50</td>
                  <td>
                    <button className={classes.delete}><i className='fa-solid fa-trash' /></button>
                  </td>
                </tr>
                <tr>
                  <td>Repriman</td>
                  <td>Jarabe</td>
                  <td>2</td>
                  <td>S/ 15</td>
                  <td>S/ 30</td>
                  <td>
                    <button className={classes.delete}><i className='fa-solid fa-trash' /></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={classes.payment}>
          <div className={classes['form-group']}>
            <label>Forma de pago</label>
            <input type='text' placeholder='cash' />
          </div>
          <div className={classes['form-group']}>
            <label>Paga con:</label>
            <input type='number' placeholder='50' />
          </div>
          <div className={classes['form-group']}>
            <label>Total</label>
            <span>S/ 41.50</span>
          </div>
          <div className={classes['form-group']}>
            <label>Paga con</label>
            <span>S/ 50.00</span>
          </div>
          <div className={classes['form-group']}>
            <label>Vuelto de</label>
            <span>S/ 8.50</span>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Sell
