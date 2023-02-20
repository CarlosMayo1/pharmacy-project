import Modal from '../UI/Modal'

const ClientsModal = ({ setShowModal, updateClient }) => {
  console.log(updateClient)
  return (
    <Modal onClick={() => { setShowModal(prevState => !prevState) }}>
      <form>
        <h3>Editar cliente</h3>
        <input type='number' name='dni' value='' />
        <input type='text' name='name' value='' />
        <input type='text' name='lastName' value='' />
        <input type='number' name='phoneNumber' value='' />
      </form>
    </Modal>
  )
}

export default ClientsModal
