import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axiosPrivateService from "../axios/axiosPrivate";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { blogActions } from "../store/blogSlice";
import FileUpload from "./GlobalComponents/file-upload";
const labelStyles = {
  mb: 1,
  mt: 2,
  fontSize: "clamp(1rem,2vw,1.5rem)",
  fontWeight: "bold",
};
const AddBlog = () => {
  const dispatch = useDispatch();
  const [requestInProgress, setRequestInProgress] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const formData = new FormData();
    formData.append("title", inputs.title);
    formData.append("description", inputs.description);
    formData.append("file", images[0]);
    const res = await axiosPrivateService("/api/blog/add", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      inputs.title.length < 3 ||
      inputs.description.length < 3 ||
      !images.length === 0
    ) {
      window.alert("Please fill all the fields correctly");
      return;
    }
    setRequestInProgress(true);
    console.log(inputs);
    sendRequest()
      .then((data) => {
        // console.log(data);
        dispatch(blogActions.addUserBlogs({ blog: data.blog }));
      })
      .then(() => window.alert("Blog added successfully"))
      .catch((err) => {
        window.alert(
          (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            "Something went wrong!"
        );
      })
      .finally(() => setRequestInProgress(false));
  };
  const [images, setImages] = useState([]);
  const updateUploadedFiles = (files) => setImages(files);
  // console.log(images);
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
          <FileUpload
            accept=".jpg,.png,.jpeg"
            label="Image"
            updateFilesCb={updateUploadedFiles}
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
