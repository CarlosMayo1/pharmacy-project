import { useSelector, useDispatch } from 'react-redux'

import { productSliceAction } from '../../../../store/productStore/product-redux'
import classes from './BuyTable.module.css'

const BuyTable = ({ setShowEditModal, setShowDeleteModal }) => {
  const dispatch = useDispatch()
  const selectedProducts = useSelector(state => state.productReducer.selectedProducts)

  // shows modal to edit amount
  const onShowEditModalHandler = (product) => {
    dispatch(productSliceAction.handleUpdateProductAmount(product))
    setShowEditModal(true)
  }

  // show delete product modal
  const onShowDeleteModal = (id) => {
    setShowDeleteModal(true)
    dispatch(productSliceAction.handleDeleteProductId(id))
  }

  return (
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
          {selectedProducts.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.type}</td>
              <td>
                <div className={classes.amount}>
                  <span>{product.amount}</span>
                  <button type='button' onClick={() => onShowEditModalHandler(product)}><i className='fa-sharp fa-regular fa-pen-to-square' /></button>
                </div>
              </td>
              <td>{product.price}</td>
              <td>{product.total}</td>
              <td>
                <button className={classes.delete} onClick={() => onShowDeleteModal(product.id)}>
                  <i className='fa-solid fa-trash' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BuyTable
