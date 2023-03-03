import Modal from '../../UI/Modal'

import classes from './DeleteClientModal.module.css'

const DeleteClientModal = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div className={classes.header}><i className='fa fa-triangle-exclamation' /></div>
      <h2 className={classes.title}>Eliminar Cliente</h2>
      <div className={classes.body}>
        <p>¿Está seguro de eliminar el usuario?</p>
      </div>
      <div className={classes.actions}>
        <button onClick={onClose}>Cancelar</button>
        <button>Aceptar</button>
      </div>
    </Modal>
  )
}

export default DeleteClientModal
