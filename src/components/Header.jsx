import React, { useState, useEffect } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import Hamburger from "./GlobalComponents/Hamburger";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { authActions } from "../store";
import { useStyles } from "./utils";
import { useStyles as useStyle } from "../componentSpecificStyles/Header";
const Header = () => {
  const classes = useStyles();
  const classes2 = useStyle();
  const dispath = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const { pathname } = useLocation();
  const [value, setValue] = useState(false);
  const [hidden, setHidden] = useState(true);
  const isMobile = useMediaQuery("(max-width: 678px)");

  // Use the appropriate endpoint based on the screen siz);
  useEffect(() => {
    // Update the value based on the initial pathname
    setValue(
      pathname === "/myBlogs"
        ? 1
        : pathname === "/blogs/add"
        ? 2
        : pathname === "/blogs"
        ? 0
        : false
    );
  }, [pathname]);
  // console.log(pathname, value);
  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)",
      }}
    >
      <Toolbar className={classes2.toolBar}>
        <Typography className={classes.font} variant="h4">
          BlogsApp
        </Typography>
        <Hamburger
          menuClickHandler={() => setHidden(!hidden)}
          closed={hidden}
        ></Hamburger>
        <div
          className={`${classes2.HeaderTabsContainer} ${
            hidden ? "hidden" : ""
          }`}
        >
          {isLoggedIn && (
            <Box className={classes2.navTabsContainer}>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
                className={classes2.navTabs}
                orientation={isMobile ? "vertical" : "horizontal"}
                TabIndicatorProps={{
                  sx: {
                    // left: 0,
                  },
                }}
              >
                <Tab
                  className={classes.font}
                  LinkComponent={Link}
                  to="/blogs"
                  label="All Blogs"
                  onClick={() => setHidden(!hidden)}
                />
                <Tab
                  className={classes.font}
                  LinkComponent={Link}
                  to="/myBlogs"
                  label="My Blogs"
                  onClick={() => setHidden(!hidden)}
                />
                <Tab
                  className={classes.font}
                  LinkComponent={Link}
                  to="/blogs/add"
                  label="Add Blog"
                  onClick={() => setHidden(!hidden)}
                />
              </Tabs>
            </Box>
          )}
          <Box className={classes2.authActions}>
            {!isLoggedIn && (
              <>
                {" "}
                <Button
                  LinkComponent={Link}
                  to="/auth"
                  variant="contained"
                  sx={{ margin: 1, borderRadius: 10 }}
                  color="warning"
                  onClick={() => setHidden(!hidden)}
                >
                  Login
                </Button>
                <Button
                  LinkComponent={Link}
                  to="/auth?mode=signup"
                  variant="contained"
                  sx={{ margin: 1, borderRadius: 10, width: "auto" }}
                  color="warning"
                  onClick={() => setHidden(!hidden)}
                >
                  Signup
                </Button>
              </>
            )}
            {isLoggedIn && (
              <Button
                onClick={() => {
                  dispath(authActions.logout());
                  setHidden(!hidden);
                }}
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
              >
                Logout
              </Button>
            )}
          </Box>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
