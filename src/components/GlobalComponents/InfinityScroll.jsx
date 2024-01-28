import { Typography } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { VirtualWindow } from "virtual-window";

function InfinityScroll({
  children,
  fetchFunction,
  lastValue,
  setLastValue,
  reachedEnd,
}) {
  const [loading, setLoading] = useState(false);
  const lastElement = useRef();

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setLastValue();
        }
      },
      { rootMargin: "500px" }
    )
  );

  const callUser = async () => {
    setLoading(true);
    await fetchFunction(lastValue);
    setLoading(false);
  };
  useEffect(() => {
    if (reachedEnd || !lastValue) return;
    callUser();
  }, [lastValue]);

  useEffect(() => {
    const currentElement = lastElement.current;
    const currentObserver = observer.current;
    // console.log(currentElement);

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);
  return (
    <>
      <VirtualWindow>{children}</VirtualWindow>
      <br />
      {loading && <Typography textAlign={"center"}>Loading...</Typography>}
      {reachedEnd && (
        <Typography textAlign={"center"}>You reached the end!</Typography>
      )}
      <div id="lastElement" ref={lastElement}></div>
      <br />
    </>
  );
}

export default InfinityScroll;
