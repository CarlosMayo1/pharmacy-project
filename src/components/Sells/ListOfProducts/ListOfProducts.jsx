import classes from './ListOfProducts.module.css'

import ProductForm from './ProductForm/ProductForm'

const ListOfProducts = ({ listOfProducts, searchedProducts }) => {
  const productsArr = searchedProducts.length > 0 ? searchedProducts : listOfProducts

  // color of the stock depending on the number
  const productColor = (stock) => {
    if (stock <= 9 && stock >= 0) {
      return classes.danger
    } else if (stock <= 23 && stock >= 10) {
      return classes.warning
    } else {
      return classes.full
    }
  }

  // const stockColor = product.stock >= 24 ? classes.full ? product.stock >= 10 || product.stock <= 23 ? classes.warning : classes.danger
  // product.stock >= 0 && product.stock <= 9 ? classes.danger : product.sotck >= 10 && product.stock <= 23 ? classes.warning : classes.full

  return (
    productsArr.map((product, index) => (
      <li key={index} className={classes['product-wrapper']}>
        <div className={classes.product}>
          <h2>{product.name}</h2>
          <div className={classes['product-info']}>
            <p>stock: <span className={`${classes.stock} ${productColor(product.stock)}`}>{product.stock}</span></p>
            <p>Nombre común: <span className={classes.italic}>{product.common_name}</span></p>
            <p>Componente activo: {product.active_component}</p>
          </div>
          <div className={classes['price-wrapper']}>
            Precio: <span>S/ {product.price}</span>
          </div>
        </div>
        <ProductForm product={product} />
      </li>
    ))
  )
}

export default ListOfProducts
