import axiosService from "./axiosBase";

axiosService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userId"); // Assuming you store the token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosService;
