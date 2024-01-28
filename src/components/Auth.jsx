import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useLogin from "../customHooksAndSevices/loginHook";
import useRegister from "../customHooksAndSevices/registerHook";
const Auth = () => {
  const { login } = useLogin();
  const { register } = useRegister();
  const naviagte = useNavigate();
  const dispatch = useDispatch();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (isSignup) data = await register(inputs);
      else data = await login(inputs);

      localStorage.setItem("userId", data.data.accessToken);
      dispatch(authActions.login(data.data));
      naviagte("/blogs");
    } catch (err) {
      console.log(err);
      alert(
        (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          "Something went wrong!"
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
