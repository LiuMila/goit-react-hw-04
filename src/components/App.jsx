
import {  useState, useEffect} from "react"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchImg } from "../components/ErrorMessage/ErrorMessage";

import { SearchBar } from '../components/SearchBar/SearchBar'
import { ImageGallery }  from '../components/ImageGallery/ImageGallery'

import { ButtonLoadMore } from "./LoadMoreBtn/LoadMoreBtn";
import { Loader } from "./Loader/Loader";
import { Modal } from "./ImageModal/ImageModal";


export const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalValue, setModalValue] = useState({});
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  // const [totalImages, setTotalImages] = useState(0);
  const [imageName, setImageName] = useState('');

  useEffect(() => {
    
    fetchImgData()
 // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, imageName])

  async function fetchImgData() {
    if (!imageName) {
      return;
    }

    if (page === 1) {
      onLoadMore(false);
      setImages([]);
    }

    setLoading(true);

    try {
      const { hits, total } = await fetchImg(imageName, page);
  
      
      if (!total) {
        setLoading(false);
        
        return alert('На жаль, за вашим запитом нічого не знайдено');
      };
      setImages([...images, ...hits]);
      setLoading(false);
      
    } catch (error) {
      console.log(error)
    } 
  }

  const onLoadMore = async () => {
    setPage(prevPage => 
      prevPage + 1
    )
  }

  const toggleModal = (data) => {
    setShowModal(!showModal)
     if (data) {
      setModalValue(data);
    } else {
      setModalValue({});
    }
  }

  const handleSearch = async (imageName) => {
    setImageName(imageName)
    setImages([])
    setLoadMore(true)
    setPage(1)
  };

  return <>
      {showModal && <Modal onClick={toggleModal} data={modalValue} onClose={ toggleModal} />}
      {loading && <Loader/>}
      <SearchBar onSubmit={handleSearch} />
      <ImageGallery images={images} loading={loading} onClick={toggleModal} loadMore={onLoadMore} />
      {loadMore && <ButtonLoadMore onClick={onLoadMore} />}
      <ToastContainer autoClose={3000} />
    </>
}