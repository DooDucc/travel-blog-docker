/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import Post from "./Post/Post";
import useStyles from "./styles";
import { getPosts } from "../../actions/posts";

const Posts = ({ setCurrentId }) => {
  const dispatch = useDispatch();

  const { posts, isLoading } = useSelector((state) => state.posts);

  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts(1));
  }, []);

  if (!posts.length && !isLoading) {
    return <h1 style={{ textAlign: "center" }}>Không có bài viết!!!</h1>;
  }

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
