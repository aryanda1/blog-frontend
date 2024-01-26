import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axiosService from "../axios/axiosBase";
const Auth = () => {
  const naviagte = useNavigate();
  const dispath = useDispatch();
  const [searchParams] = useSearchParams();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  // const [isSignup, setIsSignup] = useState(false);
  const isSignup = searchParams.get("mode") === "signup";
  const [requestInProgress, setRequestInProgress] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async (type = "login") => {
    try {
      setRequestInProgress(true);
      const res = await axiosService(`/api/user/${type}`, {
        method: "POST",
        data: JSON.stringify(inputs),
      });

      const data = await res.data;
      setRequestInProgress(false);
      // Check if the request was unsuccessful
      if (data === undefined) {
        throw new Error("Request was unsuccessful");
      }

      return data;
    } catch (error) {
      // Log the error or handle it as needed
      console.error("Error in sendRequest:", error);

      // Re-throw the error to propagate it to the calling function
      setRequestInProgress(false);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = await sendRequest(isSignup ? "signup" : "login");
      localStorage.setItem("userId", data.accessToken);
      console.log(data.accessToken);
      await dispath(authActions.login(data));
      naviagte("/blogs");
    } catch (err) {
      alert(
        (err.response && err.response.data && err.response.data.message) ||
          err.message
      );
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="Name"
              margin="normal"
              required
            />
          )}{" "}
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type={"email"}
            placeholder="Email"
            margin="normal"
            required
          />
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type={"password"}
            placeholder="Password"
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
            disabled={requestInProgress}
          >
            Submit
          </Button>
          <Button
            // onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 3 }}
            disabled={requestInProgress}
            LinkComponent={Link}
            to={`/auth?mode=${isSignup ? "login" : "signup"}`}
          >
            Change To {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
