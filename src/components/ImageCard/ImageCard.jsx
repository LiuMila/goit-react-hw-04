export default function ImageCard({ image, onImageClick }) {
//    const image={image.urls.full};
    return (
        <div onClick={() => onImageClick(image)}>
            <img src={image.urls.small} alt={image.alt_description} />
        </div>
    );
}