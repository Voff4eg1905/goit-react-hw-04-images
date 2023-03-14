// import css from '../styles.module.css';
import Modal from 'react-modal';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');

export const ModalWindow = ({ isOpen, image, tags, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      contentLabel="Example Modal"
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
    >
      <img src={image} alt={tags} width={500} />
    </Modal>
  );
};
