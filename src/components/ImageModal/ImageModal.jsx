import Modal from "react-modal";
import css from './ImageModal.module.css';

Modal.setAppElement("#root");

const ImageModal = ({ isOpen, onClose, image }) => {
    // const { largeImageURL, alt_description, user, likes } = image;
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <div>
        <img
          src={image?.urls.full}
          alt={image?.alt_description}
          width="100%"
        />
        <p>Author: {image?.user.name}</p>
        <p>Likes: {image?.likes}</p>
        <button onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ImageModal;