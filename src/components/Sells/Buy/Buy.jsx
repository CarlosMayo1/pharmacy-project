import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Card from '../../../UI/Card'

import classes from './Buy.module.css'
// import BuyForm from './BuyForm/BuyForm'
import Payment from './Payment/Payment'
import Banner from '../../../UI/Banner'
import EditAmountModal from './EditAmountModal/EditAmountModal'
import DeleteModal from './DeleteModal.jsx/DeleteModal'

import { productSliceAction } from '../../../store/productStore/product-redux.js'

const Buy = () => {
  const selectedProducts = useSelector(state => state.productReducer.selectedProducts)
  const showBanner = useSelector(state => state.productReducer.banner)
  const dispatch = useDispatch()
  const [payment, setPayment] = useState(0)
  const [showEditModal, setShowEditModal] = useState(false)
  // delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const onGetCashHandler = (e) => {
    setPayment(e.target.value)
  }

  // shows modal to edit amount
  const onShowEditModalHandler = (product) => {
    dispatch(productSliceAction.handleUpdateProductAmount(product))
    setShowEditModal(true)
  }

  // hides edit modal
  const onCloseShowEditModalHandler = () => {
    setShowEditModal(false)
  }

  // show delete product modal
  const onShowDeleteModal = (id) => {
    setShowDeleteModal(true)
    dispatch(productSliceAction.handleDeleteProductId(id))
  }

  // hides delete product modal
  const onCloseDeleteModal = () => {
    setShowDeleteModal(false)
  }

  const total = selectedProducts.reduce((accumulator, object) => {
    return accumulator + object.total
  }, 0)

  const change = payment - total

  useEffect(() => {
    setTimeout(() => {
      dispatch(productSliceAction.resetToInitialState())
    }, 3000)
  }, [showBanner.show])

  return (
    <Card>
      {showBanner.show ? <Banner style={showBanner.style}>{showBanner.message}</Banner> : null}
      {showEditModal ? <EditAmountModal close={onCloseShowEditModalHandler} /> : null}
      {showDeleteModal ? <DeleteModal onClose={onCloseDeleteModal} /> : null}
      <div className='buy-section'>
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
      </div>
      {selectedProducts.length > 0
        ? <Payment
            total={total}
            payment={payment}
            onGetCashHandler={onGetCashHandler}
            change={change}
            selectedProducts={selectedProducts}
          />
        : null}
    </Card>
  )
}

export default Buy
