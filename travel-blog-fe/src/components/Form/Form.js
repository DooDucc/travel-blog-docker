import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const post = useSelector((state) => (currentId ? state.posts.posts.find((post) => post._id === currentId) : null));

  const [postData, setPostData] = useState({ title: "", message: "", tags: "", thumb: "" });

  const user = JSON.parse(localStorage.getItem("profile"));

  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: "", message: "", tags: "", thumb: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      dispatch(createPost({ ...postData, author: user?.name }, history));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, author: user?.name }));
      clear();
    }
  };

  if (!user?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Vui lòng đăng nhập để tạo các bài viết và tương tác với các bài viết khác!!!
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Chỉnh sửa "${post.title}"` : "Tạo bài viết"}</Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Địa điểm"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Mô tả"
          fullWidth
          multiline
          minRows={4}
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Hashtag"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })}
        />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, thumb: base64 })} />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Đăng
        </Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
          Làm mới
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
