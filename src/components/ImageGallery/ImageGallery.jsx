import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";
export default function ImageGallery({ images, openModal }) {
  return (
    <ul className={styles.gallery}>
      {images.map((image) => (
        <li key={image.id} className={styles.galleryItem}>
          <ImageCard
            src={image.urls.small}
            alt={image.alt_description}
            onClick={() => openModal(image.urls.regular)}
          />
        </li>
      ))}
    </ul>
  );
}
