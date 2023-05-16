import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Card from '../../../UI/Card'
import NoSell from '../NoSell/NoSell'
import BuyTable from './BuyTable/BuyTable'

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
  const [payment, setPayment] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  // delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const onGetCashHandler = (e) => {
    setPayment(e.target.value)
  }

  // hides edit modal
  const onCloseShowEditModalHandler = () => {
    setShowEditModal(false)
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
      {/* BANNER */}
      {showBanner.show ? <Banner style={showBanner.style}>{showBanner.message}</Banner> : null}
      {showEditModal ? <EditAmountModal close={onCloseShowEditModalHandler} /> : null}
      {showDeleteModal ? <DeleteModal onClose={onCloseDeleteModal} /> : null}
      <div className={classes['buy-section']}>
        {
          selectedProducts.length > 0
            ? <BuyTable
                setShowEditModal={setShowEditModal}
                setShowDeleteModal={setShowDeleteModal}
              />
            : <NoSell />
        }

        {selectedProducts.length > 0
          ? <Payment
              total={total}
              payment={payment}
              onGetCashHandler={onGetCashHandler}
              change={change}
              selectedProducts={selectedProducts}
              setPayment={setPayment}
            />
          : null}

      </div>
    </Card>
  )
}

export default Buy
