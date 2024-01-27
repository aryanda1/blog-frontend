import { useAxiosPrivateServiceWithInterceptors } from "./useAxiosPrivateHook";

export default function useFetchUserBlogs() {
  const axiosPrivateService = useAxiosPrivateServiceWithInterceptors();
  const fetchUserBlogs = async () => {
    return axiosPrivateService("/api/blog/user", {
      method: "GET",
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  };

  return { fetchUserBlogs };
}
