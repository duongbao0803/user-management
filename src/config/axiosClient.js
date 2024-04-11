import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://65dc40aee7edadead7eb6bf3.mockapi.io",
});

export default axiosClient;
