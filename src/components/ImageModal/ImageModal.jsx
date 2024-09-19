import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { ReactModal } from 'react-modal';
import { Overlay, ModalWindow } from './ImageModal.style';



export const ImageModal = ({ data, onClose }) => {
  // Закриття модального вікна при натисканні клавіші Escape
    useEffect(() => {
      if (typeof document !== 'undefined') {
      ReactModal.setAppElement('#modal-root');
        }
        
       const handleOnClose = e => {
         if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleOnClose);

    // Видалення слухача подій після закриття модального вікна
    return () => window.removeEventListener('keydown', handleOnClose);
  }, [onClose]);


  const { largeImg, alt } = data;

   return (
    <ReactModal
      isOpen={true}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: 'transparent', // Вимикаємо стилі overlay від ReactModal, щоб використовувати наш стиль
          zIndex: 1200,
        },
        content: {
          position: 'relative',
          background: 'transparent',
          border: 'none',
          padding: '0',
          inset: '0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <Overlay onClick={onClose}>
        <ModalWindow>
          <img src={largeImg} alt={alt} />
        </ModalWindow>
      </Overlay>
    </ReactModal>
  );
};


ImageModal.propTypes = {
  data: PropTypes.shape({
    largeImg: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};
