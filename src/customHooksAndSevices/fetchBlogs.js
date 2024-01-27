import { useAxiosPrivateServiceWithInterceptors } from "./useAxiosPrivateHook";

export default function useFetchBlogs() {
  const axiosPrivateService = useAxiosPrivateServiceWithInterceptors();
  const fetchBlogs = async () => {
    return axiosPrivateService("/api/blog", {
      method: "GET",
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  };

  return { fetchBlogs };
}
