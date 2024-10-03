import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

export default function ImageGallery({ images, handleImageClick, openModal }) {
    return (
        <ul className={css.images}>
            {images.map(image => (
                <li key={image.id}>
                    <ImageCard image={image} onImageClick={handleImageClick} openModal={openModal}/>
                </li>
            ))}
        </ul>
    );
}