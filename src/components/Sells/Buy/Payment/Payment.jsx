import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { productSliceAction } from '../../../../store/productStore/product-redux'

import { insertNewSellIntoSupabse, updateAmountOfStoreInSupabase } from '../../../../utils/products'

import classes from './Payment.module.css'

const Payment = ({ payment, total, onGetCashHandler, change, selectedProducts, setPayment }) => {
  const [wayOfPayment, setWayOfPayment] = useState('cash')
  const dispatch = useDispatch()

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (wayOfPayment === 'cash' && change < 0) {
      dispatch(productSliceAction.handleErrorBanner('Debe ingresar el monto a pagar'))
      return
    }

    if (wayOfPayment !== 'cash') {
      payment = 0
      change = 0
    }

    const data = {
      date: new Date(),
      list_of_products: selectedProducts,
      total,
      way_of_payment: wayOfPayment,
      payment,
      change
    }

    // inserting a new sell into the table
    const response = await insertNewSellIntoSupabse(data)
    if (response.error) {
      dispatch(productSliceAction.handleErrorBanner('Oops! Ocurrió un error al registrar la venta'))
      throw new Error(response.error.message)
    }

    // update amount in supabase
    const res = updateProductAmountInSupabase(data.list_of_products)
    if (res.error) {
      dispatch(productSliceAction.handleErrorBanner('Oops! Ocurrió un error al actualizar el inventario'))
      throw new Error(response.error.message)
    }

    dispatch(productSliceAction.handleSuccessfullBanner('Se ha registrado la venta exitosamente'))
    dispatch(productSliceAction.handleCleanSelectedProducts())

    setWayOfPayment('cash')
    setPayment('')
  }

  const updateProductAmountInSupabase = (arr) => {
    return arr.map(product => updateAmountOfStoreInSupabase(product.updatedStock, product.id))
  }

  const onSelectWayOfPaymentHander = (e) => {
    console.log(e.target.value)
    setWayOfPayment(e.target.value)
  }

  const changeSection = (
    <>
      <div className={classes.cash}>
        <label>Paga con:</label>
        <input type='number' placeholder='0' value={payment} onChange={onGetCashHandler} />
      </div>
      <div className={classes['form-group']}>
        <label>Vuelto de</label>
        <span>S/ {change > 0 ? change : 0}</span>
      </div>
    </>
  )

  return (
    <form className={classes.payment} onSubmit={onSubmitHandler}>
      <div className={classes['form-group']}>
        <label>Forma de pago</label>
        <select defaultValue={wayOfPayment} onChange={onSelectWayOfPaymentHander}>
          <option value='cash'>Cash</option>
          <option value='plin'>Plin</option>
          <option value='yape'>Yape</option>
          <option value='transferencia'>Trasnferencia</option>
        </select>
      </div>
      <div className={classes['form-group']}>
        <label>Total</label>
        <span>S/ {total}
        </span>
      </div>
      {wayOfPayment === 'cash' ? changeSection : null}
      <button type='submit' className={classes['new-sell']}>Nueva venta</button>
    </form>
  )
}

export default Payment
