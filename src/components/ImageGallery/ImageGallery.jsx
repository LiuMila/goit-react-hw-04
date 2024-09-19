import { ImageCard }  from '../ImageCard/ImageCard';
import { ImageList } from './ImageGallery.style';
import PropTypes from 'prop-types';


export const ImageGallery = ({ images, onClick }) => {

  if (!images || images.length === 0) {
    return <p>Start searching for images</p>;
  }

  return  (
      <div>

          <ImageList>
            {images.map(({ id, webformatURL, largeImageURL, tags,}) => (
              <ImageCard
                key={id}
                id={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
                onClick={onClick}
              />
            ))}
          </ImageList>
        
      </div>
    );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};