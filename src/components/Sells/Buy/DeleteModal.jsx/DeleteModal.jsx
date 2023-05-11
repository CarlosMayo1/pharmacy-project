import { useSelector, useDispatch } from 'react-redux'

import { productSliceAction } from '../../../../store/productStore/product-redux'

import Modal from '../../../../UI/Modal'

import classes from './DeleteModal.module.css'

const DeleteModal = ({ onClose }) => {
  const dispatch = useDispatch()
  const deleteProductId = useSelector(state => state.productReducer.deleteProductId)

  // delete product from the selected list
  const deleteProduct = () => {
    console.log(deleteProductId)
    dispatch(productSliceAction.handlerRemoveProductFromList(deleteProductId))
    dispatch(productSliceAction.handleSuccessfullBanner('El producto ha sido eliminado de la lista'))
    onClose()
  }

  return (
    <Modal onClose={onClose}>
      <div className={classes.header}><i className='fa fa-triangle-exclamation' /></div>
      <h2 className={classes.title}>Eliminar Producto</h2>
      <div className={classes.body}>
        <p>¿Está seguro de eliminar el producto de la lista de compras?</p>
      </div>
      <div className={classes.actions}>
        <button className={classes.cancel} onClick={onClose}>Cancelar</button>
        <button className={classes.submit} onClick={deleteProduct}>Aceptar</button>
      </div>
    </Modal>
  )
}

export default DeleteModal
