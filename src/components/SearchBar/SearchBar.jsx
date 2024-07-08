import { Formik, Form, Field } from "formik";
import toast, { Toaster } from "react-hot-toast";
import styles from "./SearchBar.module.css"; // Импорт стилей

export default function SearchBar({ onSearch }) {
  return (
    <>
      <Toaster position={"bottom-center"} />
      <Formik
        initialValues={{ topic: "" }}
        onSubmit={(values, actions) => {
          if (!values.topic.trim()) {
            toast.error("Please enter text to search for images.");
            return;
          }
          onSearch(values.topic);
          actions.resetForm();
        }}
      >
        <header>
          <Form className={styles.searchForm}>
            <Field
              name="topic"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              Search
            </button>
          </Form>
        </header>
      </Formik>
    </>
  );
}
