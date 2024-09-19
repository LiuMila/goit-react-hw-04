import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchImg } from "../components/ErrorMessage/ErrorMessage";
import { SearchBar } from '../components/SearchBar/SearchBar';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { ButtonLoadMore } from "./LoadMoreBtn/LoadMoreBtn";
import { Loader } from "./Loader/Loader";
import { ImageModal } from "./ImageModal/ImageModal";

export const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [page, setPage] = useState(1);
  const [imageName, setImageName] = useState('');
  const [loadMore, setLoadMore] = useState(false);

  // Запит зображень при зміні `imageName` або `page`
  useEffect(() => {
    if (imageName !== '') {
      fetchImgData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageName, page]);

  // Функція для запиту зображень
  const fetchImgData = async () => {
    setLoading(true);

    try {
      const { hits, total } = await fetchImg(imageName, page);

      if (!total) {
        setImages([]);
        setLoading(false);
        toast.error('На жаль, за вашим запитом нічого не знайдено');
        return;
      }

      setImages(prevImages => [...prevImages, ...hits]);
      setLoading(false);
      setLoadMore(hits.length > 0 && hits.length >= 12); // Використовуємо 12, тому що це стандартна кількість зображень, яку повертає API

    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error('Щось пішло не так! Спробуйте ще раз.');
    }
  };

  // Обробка пошуку зображень
  const handleSearch = (imageName) => {
    if (imageName.trim() === '') {
      toast.warning('Введіть назву зображення для пошуку');
      return;
    }
    setImageName(imageName);
    setImages([]);
    setPage(1);
    setLoadMore(false);
  };

  // Підвантаження нової сторінки зображень
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  // Відкриття та закриття модального вікна
  const toggleModal = (imageData = null) => {
    setShowModal(prevState => {
      if (prevState) {
        // Якщо модальне вікно вже відкрите, просто закрийте його
        setModalData(null);
        return false;
      } else {
        // Інакше, відкрийте нове модальне вікно
        setModalData(imageData);
        return true;
      }
    });
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      {images.length > 0 && (
        <ImageGallery
          images={images}
          onClick={toggleModal}
        />
      )}

      {loading && <Loader />}

      {loadMore && !loading && (
        <ButtonLoadMore onClick={handleLoadMore} />
      )}

      {/* Модальне вікно рендериться тільки якщо showModal = true */}
      {showModal && createPortal(
        <ImageModal
          isOpen={showModal}
          data={modalData}
          onRequestClose={() => toggleModal()} // Закриття модального вікна
        />,
        document.body // Модальне вікно рендериться в body
      )}

      <ToastContainer autoClose={3000} />
    </>
  );
};
