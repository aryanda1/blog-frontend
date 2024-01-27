import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/material";
import axiosPrivateService from "../axios/axiosPrivate";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { blogActions } from "../store/blogSlice";
import { authActions } from "../store/authSlice";
import useFetchUserBlogs from "../customHooksAndSevices/fetchUserBlogs";
import useFetchBlog from "../customHooksAndSevices/fetchBlog";
import FileUpload from "./GlobalComponents/file-upload";
const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const BlogDetail = () => {
  const blogs = useSelector((state) => state.blog.userBlogs);
  const { fetchUserBlogs } = useFetchUserBlogs();
  const { fetchBlog } = useFetchBlog();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const [requestInProgress, setRequestInProgress] = useState(false);
  const id = useParams().id;
  // console.log(id);
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    fetchBlog({ id })
      .then(({ data }) => {
        setBlog(data.blog);
        setInputs({
          title: data.blog.title,
          description: data.blog.description,
        });
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.message || "Something went wrong!");
      });
  }, [id]);

  //if user directly reloaded the edit page, the userblogs will be undefined
  useEffect(() => {
    if (blogs !== null) {
      return;
    }
    fetchUserBlogs()
      .then(({ data }) => {
        if (data.blogs.length === 0) setFallBackText("No blogs found");
        dispatch(blogActions.setUserBlogs({ blogs: data.blogs }));
        dispatch(authActions.setUserName({ name: data.name }));
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.message || "Something went wrong!");
      });
  }, [blogs]);
  const sendRequest = async () => {
    let formData = new FormData();
    Object.keys(inputs).forEach((key) => formData.set(key, inputs[key]));
    const res = await axiosPrivateService(`api/blog/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
    const data = await res.data;
    return data;
  };
  // console.log(blog);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputs);
    if (inputs.title.length < 3 || inputs.description.length < 3) {
      window.alert("Please fill all the fields correctly");
      return;
    }
    // console.log(inputs);
    setRequestInProgress(true);
    sendRequest()
      .then((data) => {
        // console.log(data);
        dispatch(blogActions.updateUserBlogs({ id, blog: data.blog }));
        window.alert("Blog Updated successfully!");
      })
      .then(() => navigate("/myBlogs"))
      .catch((err) => {
        console.log(err);
        window.alert(err.message || "Something went wrong!");
      })
      .finally(() => setRequestInProgress(false));
  };

  //callback function when image is changed by user
  const updateUploadedFiles = (files) => {
    const prevState = { ...inputs };
    if (files.length === 0) delete prevState.file;
    else prevState.file = files[files.length - 1];
    setInputs(prevState);
  };

  return (
    <div>
      {inputs && (
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
            >
              Post Your Blog
            </Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField
              name="title"
              onChange={handleChange}
              value={inputs.title}
              margin="auto"
              variant="outlined"
            />
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField
              name="description"
              onChange={handleChange}
              value={inputs.description}
              margin="auto"
              variant="outlined"
            />
            <FileUpload
              accept=".jpg,.png,.jpeg"
              label="Image"
              updateFilesCb={updateUploadedFiles}
              originalImgUrl={blog ? blog.image : undefined}
            />

            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant="contained"
              color="warning"
              type="submit"
              disabled={requestInProgress}
            >
              {requestInProgress ? "Submitting.." : "Submit"}
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BlogDetail;
