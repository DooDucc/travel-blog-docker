/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import decode from "jwt-decode";
import { AppBar, Typography, Avatar, Toolbar, Button } from "@material-ui/core";
import useStyles from "./styles";
import memories from "../../images/memories.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const classes = useStyles();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.href = "/";
    setUser(null);
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <Typography className={classes.heading} variant="h2" align="center">
          Du lịch Việt Nam
        </Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.name}
              src={user.imageUrl}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={handleLogout}
            >
              Đăng xuất
            </Button>
          </div>
        ) : (
          <Button variant="contained" color="primary">
            <Link className={classes.loginText} to="/auth">
              Đăng nhập
            </Link>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
