import { useAxiosPrivateServiceWithInterceptors } from "./useAxiosPrivateHook";

export default function useDeleteBlog() {
  const axiosPrivateService = useAxiosPrivateServiceWithInterceptors();
  const deleteBlog = async ({ id }) => {
    return axiosPrivateService(`/api/blog/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  };

  return { deleteBlog };
}
