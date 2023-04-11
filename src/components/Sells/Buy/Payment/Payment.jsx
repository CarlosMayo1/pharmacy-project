import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { productSliceAction } from '../../../../store/productStore/product-redux'

import classes from './Payment.module.css'

const Payment = ({ payment, total, onGetCashHandler, change, selectedProducts }) => {
  const [wayOfPayment, setWayOfPayment] = useState('cash')
  const dispatch = useDispatch()

  const onSubmitHandler = (e) => {
    e.preventDefault()

    if (wayOfPayment === 'cash' && change < 0) {
      console.log('error')
      dispatch(productSliceAction.handleErrorBanner('Debe ingresar el monto a pagar'))
      return
    }

    if (wayOfPayment !== 'cash') {
      change = 0
    }

    const data = {
      date: new Date(),
      listOfProducts: selectedProducts,
      total,
      wayOfPayment,
      payment,
      change
    }

    console.log(data)
  }

  const onSelectWayOfPaymentHander = (e) => {
    console.log(e.target.value)
    setWayOfPayment(e.target.value)
  }

  const changeSection = (
    <>
      <div className={classes['form-group']}>
        <label>Total</label>
        <span>S/ {total}
        </span>
      </div>
      <div className={classes.cash}>
        <label>Paga con:</label>
        <input type='number' placeholder='0' onChange={onGetCashHandler} />
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
      {wayOfPayment === 'cash' ? changeSection : null}
      <button type='submit' className={classes['new-sell']}>Nueva venta</button>
    </form>
  )
}

export default Payment
