import { useAxiosPrivateServiceWithInterceptors } from "./useAxiosPrivateHook";

export default function useFetchBlogs() {
  const axiosPrivateService = useAxiosPrivateServiceWithInterceptors();
  const fetchBlogs = async ({ lastTime }) => {
    return axiosPrivateService(
      `/api/blog?lastTime=${lastTime ? lastTime : new Date().toISOString()}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  };

  return { fetchBlogs };
}
