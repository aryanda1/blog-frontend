import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import Fallback from "./Fallback";
import axiosPrivateService from "../axios/axiosPrivate";
import useFetchBlogs from "../customHooksAndSevices/fetchBlogs";

const Blogs = () => {
  const { fetchBlogs } = useFetchBlogs();
  const [blogs, setBlogs] = useState();
  const [fallbackText, setFallBackText] = useState("Loading...");
  useEffect(() => {
    fetchBlogs()
      .then(({ data }) => {
        if (data.blogs.length === 0) setFallBackText("No blogs found");
        setBlogs(data.blogs);
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.message || "Something went wrong!");
      });
  }, []);
  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog, index) => (
          <Blog
            key={blog._id}
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={blog.user.name}
          />
        ))
      ) : (
        <Fallback message={fallbackText} />
      )}
    </div>
  );
};

export default Blogs;
