import { useRef } from 'react'
import { useDispatch } from 'react-redux'

import { productSliceAction } from '../../store/productStore/product-redux'

import classes from './Amount.module.css'

const Amount = ({ product }) => {
  const dispatch = useDispatch()
  const amountInputRef = useRef()

  const onSubmitFormHandler = event => {
    event.preventDefault()

    const enteredNumber = amountInputRef.current.value
    const enteredAmountNumber = +enteredNumber

    dispatch(productSliceAction.handleAddProduct({
      id: product.product_id,
      type: product.type,
      name: product.name,
      price: product.price,
      function: product.function,
      amount: enteredAmountNumber
    }))
  }

  return (
    <form className={classes.actions} onSubmit={onSubmitFormHandler}>
      {/* <button type='button' className={classes.decrement}>-</button> */}
      <input className={classes.amount} type='number' defaultValue='1' ref={amountInputRef} />
      <button className={classes.add}><i className='fa-solid fa-check' /></button>
      {/* <button type='button' className={classes.increment}>+</button> */}
    </form>
  )
}

export default Amount
