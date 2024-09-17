import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosRequestHeaders,
} from "axios";

// Create Axios instance with baseURL from environment variable
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
});

// Request interceptor to add Authorization header
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("AccessToken");

    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// Utility function for fetching data with specific typing for response
export const fetchData = async <T>(
  url: string,
  options: Omit<InternalAxiosRequestConfig, "headers"> & {
    headers?: AxiosRequestHeaders;
  } = {},
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance(url, options);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error retrieving data:",
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || "Could not get data");
  }
};

export default axiosInstance;
