import classes from './SellProducts.module.css'

const SellProducts = ({ listOfProducts, searchedProducts }) => {
  const products = listOfProducts.map((product, index) => (
    <tr key={index}>
      <td>{product.name}</td>
      <td>{product.type}</td>
      <td>{product.stock}</td>
      <td>S/ {product.price}</td>
      <td>
        <div className={classes.actions}>
          <button className={classes.info}><i className='fa-sharp fa-solid fa-question' /></button>
          <button className={classes.add}><i className='fa-solid fa-check' /></button>
        </div>
      </td>
    </tr>
  ))

  const filteredProducts = searchedProducts.map((product, index) => (
    <tr key={index}>
      <td>{product.name}</td>
      <td>{product.type}</td>
      <td>{product.stock}</td>
      <td>S/ {product.price}</td>
      <td>
        <div className={classes.actions}>
          <button className={classes.info}><i className='fa-sharp fa-solid fa-question' /></button>
          <button className={classes.add}><i className='fa-solid fa-check' /></button>
        </div>
      </td>
    </tr>
  ))

  return (
    <div className={classes.products}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchedProducts.length > 0 ? filteredProducts : products}
        </tbody>
      </table>
    </div>
  )
}

export default SellProducts
