/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { commentPost, getComments } from "../../actions/posts";

const Comment = ({ post }) => {
  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state.posts);

  const user = JSON.parse(localStorage.getItem("profile"));

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const commentsRef = useRef();

  const classes = useStyles();

  useEffect(() => {
    dispatch(getComments(post?._id));
  }, []);

  useEffect(() => {
    const commentsPost = posts?.find(
      (postItem) => postItem?._id === post?._id
    )?.comments;
    if (commentsPost) {
      setComments(() => commentsPost?.map((comment) => comment?.comment));
    }
  }, [posts, post]);

  const handleComment = async () => {
    const data = {
      username: user?.name,
      email: user?.email,
      time: new Date(),
      comment: `${user?.name}: ${comment}`,
    };
    const response = await dispatch(commentPost(data, post?._id));
    if (response) {
      const newComments = response?.comments?.map(
        (comment) => comment?.comment
      );
      setComments(newComments);
    }
    setComment("");
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Bình luận
          </Typography>
          {comments?.map((comment, index) => (
            <Typography key={index} gutterBottom variant="subtitle1">
              <strong>{comment.split(": ")[0]}</strong>:{comment.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Viết bình luận
            </Typography>
            <TextField
              fullWidth
              minRows={4}
              variant="outlined"
              label="Nội dung..."
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              onClick={handleComment}
              color="primary"
            >
              Đăng
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
