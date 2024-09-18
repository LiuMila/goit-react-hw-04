import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './ImageModal.style';

const modalRoot = document.querySelector('#modal-root');

export const ImageModal = ({ data, onClose }) => {
  // Закриття модального вікна при натисканні клавіші Escape
  useEffect(() => {
    const handleOnClose = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleOnClose);

    // Видалення слухача подій після закриття модального вікна
    return () => window.removeEventListener('keydown', handleOnClose);
  }, [onClose]);

  // Закриття модального вікна при кліку за межами модального вікна
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const { largeImg, alt } = data;

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>
        <img src={largeImg} alt={alt} />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

ImageModal.propTypes = {
  data: PropTypes.shape({
    largeImg: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};
