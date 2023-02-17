import classes from './Modal.module.css'

import Backdrop from './Backdrop'

const Modal = ({ children, onClick }) => {
  return (
    <>
      <Backdrop />
      <div className={classes.modal} onClick={onClick}>
        {children}
      </div>
    </>
  )
}

export default Modal
