import  { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Overlay, ModalWindow } from "./ImageModal.style";

// Встановлюємо кореневий елемент для бібліотеки react-modal
Modal.setAppElement('#root');

// Стилі для модального вікна
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    border: 'none',
    background: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

export const ImageModal = ({ data, isOpen, onRequestClose }) => {
  const { largeImageURL, tags } = data || {};

  const handleOnClose = useCallback((e) => {
    if (e.code === 'Escape' || e.currentTarget === e.target) {
      onRequestClose();
    }
  }, [onRequestClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleOnClose);
    return () => window.removeEventListener('keydown', handleOnClose);
  }, [handleOnClose]); // Включаємо handleOnClose як залежність


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Image Modal"
      shouldCloseOnOverlayClick={true}
    >
      <Overlay onClick={handleOnClose}>
        <ModalWindow onClick={(e) => e.stopPropagation()}>
          <img src={largeImageURL} alt={tags} style={{ width: '100%', height: 'auto' }} />
        </ModalWindow>
      </Overlay>
    </Modal>
  );
};

ImageModal.propTypes = {
  data: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};
