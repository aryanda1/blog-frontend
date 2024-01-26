import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axiosPrivateService from "../axios/axiosPrivate";
import { useDispatch } from "react-redux";
import { blogActions } from "../store/blogSlice";

const Blog = ({ title, description, imageURL, userName, isUser, id }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };
  const deleteRequest = async () => {
    const res = await axiosPrivateService(`/api/blog/${id}`, {
      method: "DELETE",
    });
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest()
      .then(() => window.alert("Blog deleted successfully"))
      .then(() => dispatch(blogActions.deleteUserBlogs({ id })))
      .then(() => navigate("/myBlogs"))
      .catch((err) => {
        console.log(err);
        window.alert(err.message || "Something went wrong!");
      });
  };
  return (
    <div>
      {" "}
      <Card
        sx={{
          width: "80%",
          maxWidth: "550px",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditOutlineIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {userName ? userName.charAt(0) : ""}
            </Avatar>
          }
          title={title}
        />
        <CardMedia
          component="img"
          height="194"
          image={imageURL}
          alt="Paella dish"
        />

        <CardContent>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary">
            <b>{userName}</b> {": "} {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
