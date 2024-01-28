import React, { useEffect, useRef, useState } from "react";
import Blog from "./Blog";
import Fallback from "./Fallback";
import useFetchBlogs from "../customHooksAndSevices/fetchBlogs";
import InfinityScroll from "./GlobalComponents/InfinityScroll";

const Blogs = () => {
  const { fetchBlogs } = useFetchBlogs();
  const [blogs, setBlogs] = useState([]);
  const [lastTime, setLastTime] = useState();
  const [fallbackText, setFallBackText] = useState("Loading...");
  const [reachedEnd, setReachedEnd] = useState(false);
  const lastBlogRef = useRef(null);

  const fetchNextBlogs = (lastTime, init) => {
    fetchBlogs({ lastTime })
      .then(({ data }) => {
        if (data.blogs.length === 0) setReachedEnd(true);
        else {
          if (init) setBlogs(data.blogs);
          else setBlogs((prev) => [...prev, ...data.blogs]);
          lastBlogRef.current = data.blogs[data.blogs.length - 1];
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert(
          (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            "Something went wrong!"
        );
      });
  };

  const lastTimeChanger = () => {
    setLastTime(lastBlogRef.current.date.created);
  };

  useEffect(() => {
    fetchNextBlogs(lastTime, true);
  }, []);
  return (
    <div style={{ marginBottom: "3rem" }}>
      {blogs && blogs.length > 0 ? (
        <InfinityScroll
          lastValue={lastTime}
          setLastValue={lastTimeChanger}
          reachedEnd={reachedEnd}
          fetchFunction={fetchNextBlogs}
        >
          {blogs.map((blog, index) => (
            <Blog
              key={blog._id}
              id={blog._id}
              isUser={localStorage.getItem("userId") === blog.user._id}
              title={blog.title}
              description={blog.description}
              imageURL={blog.image}
              userName={blog.user.name}
            />
          ))}
        </InfinityScroll>
      ) : (
        <Fallback message={fallbackText} />
      )}
    </div>
  );
};

export default Blogs;
