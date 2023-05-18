import classes from './ListOfProducts.module.css'

import ProductForm from './ProductForm/ProductForm'

const ListOfProducts = ({ listOfProducts, searchedProducts }) => {
  const productsArr = searchedProducts.length > 0 ? searchedProducts : listOfProducts

  // const sortedProductsArr = productsArr.sort()

  // console.log(sortedProductsArr)

  return (
    productsArr.map((product, index) => (
      <li key={index} className={classes['product-wrapper']}>
        <div className={classes.product}>
          <h2>{product.name}</h2>
          <div className={classes['product-info']}>
            <p>stock: {product.stock}</p>
            <p>Nombre común: <span className={classes.italic}>{product.common_name}</span></p>
            <p>Componente activo: {product.active_component}</p>
          </div>
          <div className={classes['price-wrapper']}>
            Precio: <span className={classes.bold}>S/ {product.price}</span>
          </div>
        </div>
        <ProductForm product={product} />
      </li>
    ))
  )
}

export default ListOfProducts
