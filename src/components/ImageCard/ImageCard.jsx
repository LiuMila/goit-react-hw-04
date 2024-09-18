import PropTypes from 'prop-types';
import { ImageItem, Image } from "./ImageCard.style"

export const ImageCard = ({ id, webformatURL, largeImageURL, tags, onClick }) => {
    
    return (
        <ImageItem key={id} onClick={() => {
            onClick({largeImageURL, tags})
       }}>
      <Image src={webformatURL} alt={tags} />
      </ImageItem>
 )
}

ImageCard.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
