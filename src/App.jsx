import Header from "./components/Header";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import Error from "./components/Error404";

import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Auth from "./components/Auth";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/authSlice";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // console.log(isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) return;
    const token = localStorage.getItem("userId");
    if (token === "undefined" || !token) {
      navigate("/auth");
      return;
    }
    const decodedToken =
      token && token !== "undefined" ? jwtDecode(token) : null;
    const currentTime = Date.now() / 1000;
    if (!decodedToken || decodedToken.exp < currentTime) {
      console.log("token expired");
      // Redirect to "/auth" if the current route is not "/auth"
      dispatch(authActions.logout());
      if (location.pathname !== "/auth") {
        navigate("/auth");
      }
      return;
    }
    const id = setTimeout(() => {
      navigate("/auth");
      dispatch(authActions.logout());
    }, (decodedToken.exp - currentTime) * 1000);

    dispatch(authActions.login({ accessToken: token }));
    return () => {
      clearTimeout(id);
    };
  }, [isLoggedIn]);

  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <Route path="/auth" element={<Auth />} />
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/myBlogs/:id" element={<BlogDetail />} />
              <Route path="*" element={<Error />} />
            </>
          )}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
