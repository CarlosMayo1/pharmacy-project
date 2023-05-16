import classes from './NoSell.module.css'

import buyImg from '../../../assets/buy.png'

const NoSell = () => {
  return (
    <div className={classes.wrapper}>
      <div>
        <h3 className={classes.title}>¿List@ para realizar una nueva venta?</h3>
        <img src={buyImg} className={classes.img} alt='' />
      </div>
    </div>
  )
}

export default NoSell
