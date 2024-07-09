import axios from "axios";

const CLIENT_ID = "tiR7c1nvRH3EIxLNJ8YPEWwghK5Bhchl0W_sRDL9GNI";

axios.defaults.baseURL = "https://api.unsplash.com/";

export const getImages = async (topic, currentPage) => {
  const response = await axios.get("search/photos?", {
    params: {
      client_id: CLIENT_ID,
      query: topic,
      orientation: "landscape",
      page: currentPage,
      per_page: 12,
    },
  });

  return {
    results: response.data.results,
    total_pages: response.data.total_pages,
  };
};
