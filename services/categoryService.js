import axios from "axios";

const categoryServices = {
  categoryData: async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      return response.data;
    } catch (error) {
      console.error("ERROR ::", error);
      return null;
    }
  },

  categoryDataByFilter: async (category) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      return response.data;
    } catch (error) {
      console.error("ERROR ::", error);
      return null;
    }
  },

  recipeById: async (id) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      return response.data;
    } catch (error) {
      console.error("ERROR ::", error);
      return null;
    }
  },
};

export default categoryServices;
