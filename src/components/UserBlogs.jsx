import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import axiosPrivateService from "../axios/axiosPrivate";
import Fallback from "./Fallback";

const UserBlogs = () => {
  const [user, setUser] = useState();
  const [fallbackText, setFallBackText] = useState("Loading...");

  const sendRequest = async () => {
    const res = await axiosPrivateService(`/api/blog/user`);
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest()
      .then((data) => {
        if (data.user.blogs.length === 0) setFallBackText("No blogs found");
        setUser(data.user);
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.message || "Something went wrong!");
      });
  }, []);
  return (
    <div>
      {" "}
      {user && user.blogs.length ? (
        user.blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            key={index}
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={user.name}
          />
        ))
      ) : (
        <Fallback message={fallbackText} />
      )}
    </div>
  );
};

export default UserBlogs;
