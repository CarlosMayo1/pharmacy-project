import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { productSliceAction } from '../../../../store/productStore/product-redux'
import Modal from '../../../../UI/Modal'

import classes from './EditAmountModal.module.css'

const EditAmountModal = ({ close }) => {
  const updateProductAmount = useSelector(state => state.productReducer.updateProductAmount)
  const dispatch = useDispatch()
  const [disable, setDisable] = useState(true)
  const [editedAmount, setEditedAmount] = useState('')

  const onChangeAmountHandler = (e) => {
    setEditedAmount(e.target.value)

    if (e.target.value === '') {
      setDisable(true)
    } else {
      setDisable(false)
    }
  }

  const onSubmitFormHandler = e => {
    e.preventDefault()

    // dispatch action to update product based on the id of the product
    dispatch(productSliceAction.handleUpdateAmount({ id: updateProductAmount.id, amount: editedAmount }))
    dispatch(productSliceAction.handleSuccessfullBanner('El producto se ha editado correctamente'))
    // close the modal
    close()
  }

  return (
    <Modal onClose={close}>
      <div className={classes.content}>
        <div className={classes['modal-header']}>
          <h2>Editar Cantidad del producto</h2>
        </div>
        <div className={classes['modal-body']}>
          <span>Producto: {updateProductAmount.name}</span>
          <span>cantidad: {updateProductAmount.amount}</span>
          <span>Tipo: {updateProductAmount.type}</span>
          <form className={classes.form}>
            <div className={classes['form-group']}>
              <label>Ingresar la cantidad: </label>
              <input type='number' placeholder='ingrese la nueva cantidad' onChange={onChangeAmountHandler} />
            </div>
          </form>
        </div>
        <div className={classes['modal-footer']}>
          <button type='button' className={classes.cancelar} onClick={close}>Cancelar</button>
          <button type='submit' className={disable ? classes.disable : classes.submit} onClick={onSubmitFormHandler} disabled={disable}>Editar cantidad</button>
        </div>
      </div>
    </Modal>
  )
}

export default EditAmountModal
