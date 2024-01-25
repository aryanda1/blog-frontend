import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const labelStyles = {
  mb: 1,
  mt: 2,
  fontSize: "clamp(1rem,2vw,1.5rem)",
  fontWeight: "bold",
};
const AddBlog = () => {
  const [requestInProgress, setRequestInProgress] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post(`${import.meta.env.VITE_BACKEND_API}/api/blog/add`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      inputs.title.length < 3 ||
      inputs.description.length < 3 ||
      inputs.imageURL.length < 3
    ) {
      window.alert("Please fill all the fields correctly");
      return;
    }
    setRequestInProgress(true);
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => window.alert("Blog added successfully"))
      .catch((err) => {
        window.alert(err.message || "Something went wrong!");
      })
      .finally(() => setRequestInProgress(false));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={3}
          display="flex"
          flexDirection={"column"}
          width={"80%"}
        >
          <Typography
            fontWeight={"bold"}
            padding={3}
            color="grey"
            variant="h2"
            textAlign={"center"}
            fontSize={"clamp(1.5rem,3vw,3.75rem)"}
          >
            Post Your Blog
          </Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField
            required
            name="title"
            onChange={handleChange}
            value={inputs.title}
            // margin="auto"
            variant="outlined"
          />
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField
            required
            name="description"
            onChange={handleChange}
            value={inputs.description}
            // margin="auto"
            variant="outlined"
          />
          <InputLabel sx={labelStyles}>ImageURL</InputLabel>
          <TextField
            required
            name="imageURL"
            onChange={handleChange}
            value={inputs.imageURL}
            // margin="auto"
            variant="outlined"
          />
          <Button
            sx={{ mt: 2, borderRadius: 4, fontSize: "clamp(1rem,2vw,1.5rem)" }}
            variant="contained"
            color="warning"
            type="submit"
            disabled={requestInProgress}
          >
            {requestInProgress ? "Adding..." : "Add Blog"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
