import { useRef } from 'react'
import { useDispatch } from 'react-redux'

import { productSliceAction } from '../../../../store/productStore/product-redux'

import classes from './ProductForm.module.css'

const ProductForm = ({ product }) => {
  const amountInputRef = useRef()
  const dispatch = useDispatch()

  const addProductHandler = (e) => {
    e.preventDefault()

    const enteredAmount = amountInputRef.current.value
    const enteredAmountNumber = +enteredAmount

    dispatch(productSliceAction.handleAddProduct({
      id: product.product_id,
      name: product.name,
      type: product.type,
      price: product.price,
      amount: enteredAmountNumber,
      total: enteredAmountNumber * product.price
    }))
  }

  return (
    <form className={classes['product-form']} onSubmit={addProductHandler}>
      <input
        type='numer'
        id='amount'
        defaultValue='1'
        ref={amountInputRef}
      />
      <button type='submit'>+ Agregar</button>
    </form>
  )
}

export default ProductForm
