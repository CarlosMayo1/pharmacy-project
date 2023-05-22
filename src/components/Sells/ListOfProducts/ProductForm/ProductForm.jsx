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
      total: enteredAmountNumber * product.price,
      updatedStock: product.stock - enteredAmountNumber
    }))

    amountInputRef.current.value = product.stock === 0 ? '0' : '1'
  }

  return (
    <form className={classes['product-form']} onSubmit={addProductHandler}>
      <input
        type='numer'
        id='amount'
        defaultValue={product.stock === 0 ? '0' : '1'}
        ref={amountInputRef}
      />
      <button type='submit' className={product.stock === 0 ? classes.disabled : classes['submit-button']} disabled={product.stock === 0}>+ Agregar</button>
    </form>
  )
}

export default ProductForm
