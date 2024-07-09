import { useEffect, useState } from "react";
import { getImages } from "../../images-api";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import styles from "./App.module.css";

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const message = "Try reloading the page";
  const [topic, setTopic] = useState("");
  const [totalPages, setTotalPages] = useState(999);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (newTopic) => {
    setImages([]);
    setPage(1);
    setTopic(newTopic);
  };
  const handleLoadMore = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    if (topic === "") {
      return;
    }

    async function fetchImages() {
      try {
        setLoading(true);
        setError(false);
        const { results, total_pages } = await getImages(topic, page);
        setTotalPages(total_pages);
        setImages((prevImages) => {
          return [...prevImages, ...results];
        });
      } catch (fetchError) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, [page, topic]);

  return (
    <div>
      <SearchBar onSearch={handleSubmit} />
      {page >= totalPages && (
        <p className={styles.endOfCollection}>End of collection</p>
      )}
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {loading && <Loader />}
      <ImageModal
        isOpen={modalIsOpen}
        image={selectedImage}
        onRequestClose={closeModal}
      />
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {error && <ErrorMessage message={message} />}
    </div>
  );
}
