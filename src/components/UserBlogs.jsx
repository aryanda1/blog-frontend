import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import axiosPrivateService from "../axios/axiosPrivate";
import Fallback from "./Fallback";
import { blogActions } from "../store/blogSlice";
import { authActions } from "../store/authSlice";
const UserBlogs = () => {
  const dispatch = useDispatch();

  const [fallbackText, setFallBackText] = useState("Loading...");
  const blogs = useSelector((state) => state.blog.userBlogs);
  const userName = useSelector((state) => state.auth.user.name);
  const sendRequest = async () => {
    const res = await axiosPrivateService(`/api/blog/user`);
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    if (blogs !== null) return;
    sendRequest()
      .then((data) => {
        if (data.blogs.length === 0) setFallBackText("No blogs found");
        dispatch(blogActions.setUserBlogs({ blogs: data.blogs }));
        dispatch(authActions.setUserName({ name: data.name }));
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.message || "Something went wrong!");
      });
  }, [blogs]);
  return (
    <div>
      {" "}
      {blogs && blogs.length ? (
        blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            key={index}
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={userName}
          />
        ))
      ) : (
        <Fallback message={fallbackText} />
      )}
    </div>
  );
};

export default UserBlogs;
