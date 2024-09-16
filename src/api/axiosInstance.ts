import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001",
});

const fetchData = async (url: string, options = {}) => {
  try {
    const response = await axiosInstance(url, options);
    return response.data;
  } catch (error) {
    console.error("Error retrieving data:", error);
    throw new Error("Could not get data");
  }
};

export default axiosInstance;
