import axiosPrivateService from "../axios/axiosBase";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useAxiosPrivateServiceWithInterceptors = () => {
  const token = useSelector((state) => state.auth.user.accessToken);
  useEffect(() => {
    const reqInt = axiosPrivateService.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivateService.interceptors.request.eject(reqInt);
    };
  });

  return axiosPrivateService;
};
