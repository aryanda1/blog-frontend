import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import Fallback from "./Fallback";
import { blogActions } from "../store/blogSlice";
import { authActions } from "../store/authSlice";
import useFetchUserBlogs from "../customHooksAndSevices/fetchUserBlogs";
const UserBlogs = () => {
  const dispatch = useDispatch();
  const { fetchUserBlogs } = useFetchUserBlogs();
  const [fallbackText, setFallBackText] = useState("Loading...");
  const blogs = useSelector((state) => state.blog.userBlogs);
  const userName = useSelector((state) => state.auth.user.name);

  useEffect(() => {
    if (blogs !== null) {
      if (blogs.length === 0) setFallBackText("No blogs found");
      else setFallBackText("");
      return;
    }
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
