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
import { authActions } from "./store";
function App() {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  // console.log(isLoggedIn);
  useEffect(() => {
    const token = localStorage.getItem("userId");
    const decodedToken = token ? jwtDecode(token) : null;
    const currentTime = Date.now() / 1000;
    if (!decodedToken || decodedToken.exp < currentTime) {
      // Redirect to "/auth" if the current route is not "/auth"
      if (location.pathname !== "/auth") {
        navigate("/auth");
      }
      return;
    }
    dispath(authActions.login());
    setTimeout(() => {
      dispath(authActions.logout());
    }, (exp - currentTime) * 1000);
  }, [dispath, location.pathname, navigate]);
  // console.log(isLoggedIn);
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
