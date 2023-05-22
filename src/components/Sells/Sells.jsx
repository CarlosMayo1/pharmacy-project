import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import { productSliceAction } from '../../store/productStore/product-redux'
import { fetchProductsFromSupabase } from '../../utils/products'

// components
import ListOfProducts from './ListOfProducts/ListOfProducts'
import Buy from './Buy/Buy'
// import Banner from '../../UI/Banner'

import classes from './Sells.module.css'

import Card from '../../UI/Card'

const Sell = () => {
  // redux
  const listOfProducts = useSelector(
    (state) => state.productReducer.listOfProducts
  )
  // banner
  const showBanner = useSelector(state => state.productReducer.banner)

  // const showBanner = useSelector(state => state.productReducer.banner)
  const dispatch = useDispatch()

  // state of the app
  const [searchedProducts, setSearchedProducts] = useState([])

  const onSearchProductHandler = (e) => {
    const searchWord = e.target.value

    if (e.target.value !== '') {
      // getting the input from the user
      const filteredProducts = listOfProducts.filter((product) => {
        return product.name
          .toLowerCase()
          .includes(searchWord.toLocaleLowerCase())
      })
      setSearchedProducts(filteredProducts)
    } else {
      setSearchedProducts([])
    }
  }

  useEffect(() => {
    // getting products from database
    const products = fetchProductsFromSupabase()
    products.then((response) => {
      const { data } = response

      // order alphabetically
      data.sort((a, b) => {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
          return 1
        }
        return 0
      })

      dispatch(productSliceAction.getProducts(data))
    })
  }, [showBanner.show])

  return (
    <div className={classes.container}>
      <Card>
        <h3>Selección de productos</h3>
        <div className={classes['search-bar']}>
          <div className={classes['search-input']}>
            <input
              type='text'
              id='search'
              name='search'
              placeholder='Buscar producto'
              onChange={onSearchProductHandler}
            />
          </div>
        </div>
        <ul className={classes['list-products']}>
          <ListOfProducts listOfProducts={listOfProducts} searchedProducts={searchedProducts} />
        </ul>
      </Card>
      <Buy />
    </div>
  )
}

export default Sell
