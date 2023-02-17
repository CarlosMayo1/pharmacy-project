import classes from './Backdrop.module.css'

const Backdrop = ({ onClick }) => {
  return <div className={classes.backdrop} onClick={onClick} />
}

export default Backdrop
