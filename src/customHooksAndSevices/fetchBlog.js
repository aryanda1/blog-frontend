import { useAxiosPrivateServiceWithInterceptors } from "./useAxiosPrivateHook";

export default function useFetchBlog() {
  const axiosPrivateService = useAxiosPrivateServiceWithInterceptors();
  const fetchBlog = async ({ id }) => {
    return axiosPrivateService(`/api/blog/${id}`, {
      method: "GET",
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  };

  return { fetchBlog };
}
