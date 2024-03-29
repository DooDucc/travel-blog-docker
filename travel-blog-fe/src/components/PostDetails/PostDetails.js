/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getPost, searchPost } from "../../actions/posts";
import Comment from "./Comment";
import useStyles from "./styles";

const PostDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const { post, posts, isLoading } = useSelector((state) => state.posts);

  const classes = useStyles();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(searchPost({ keyword: post?.tags.join(",") }));
    }
  }, [post]);

  if (!post) {
    return null;
  }

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  const handleOpenPost = (id) => {
    history.push(`/posts/${id}`);
  };

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag, index) => (
              <span
                key={index}
                style={{ marginRight: "10px" }}
              >{`#${tag.trim()}`}</span>
            ))}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Tác giả: {post.author}</Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Comment post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.thumb ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>
      {recommendedPosts?.length ? (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            Bạn cũng có thể thích:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, message, author, thumb, _id }) => (
              <div
                key={_id}
                style={{ margin: "20px", cursor: "pointer" }}
                onClick={() => handleOpenPost(_id)}
              >
                <Typography gutterBottom variant="h6">
                  {title}
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                  {author}
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                  {message}
                </Typography>
                <img src={thumb} width="200px" alt="thumb" />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </Paper>
  );
};

export default PostDetails;
