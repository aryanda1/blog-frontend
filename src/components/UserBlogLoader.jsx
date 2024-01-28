import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { blogActions } from "../store/blogSlice";
import { authActions } from "../store/authSlice";
import useFetchUserBlogs from "../customHooksAndSevices/fetchUserBlogs";
function UserBlogloader() {
  const dispatch = useDispatch();
  const { fetchUserBlogs } = useFetchUserBlogs();
  useEffect(() => {
    fetchUserBlogs()
      .then(({ data }) => {
        dispatch(blogActions.setUserBlogs({ blogs: data.blogs }));
        dispatch(authActions.setUserName({ name: data.name }));
      })
      .catch((err) => {
        console.log(err);
        window.alert(
          (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            "Something went wrong!"
        );
      });
  }, []);
  return <Outlet />;
}

export default UserBlogloader;
