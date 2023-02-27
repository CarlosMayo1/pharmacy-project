import classes from './Modal.module.css'

import Backdrop from './Backdrop'

const Modal = ({ children, onClose }) => {
  return (
    <>
      <Backdrop onClick={onClose} />
      <div className={classes.modal}>
        {children}
      </div>
    </>
  )
}

export default Modal
