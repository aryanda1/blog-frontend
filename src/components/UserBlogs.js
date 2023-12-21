import React, { useEffect, useState } from "react";
import { experimental_useEffectEvent as useEffectEvent } from "react";
import axios from "axios";
import Blog from "./Blog";

import Fallback from "./Fallback";

const UserBlogs = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  const [fallbackText, setFallBackText] = useState("Loading...");
  const sendRequest = useEffectEvent(() => {
    return (async () => {
      const res = await axios
        .get(`${process.env.REACT_APP_BACKEND_API}/api/blog/user/${id}`)
        .catch((err) => console.log(err));
      const data = await res.data;
      return data;
    })();
  });
  useEffect(() => {
    sendRequest().then((data) => {
      if (data.user.blogs.length === 0) setFallBackText("No blogs found");
      setUser(data.user);
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
