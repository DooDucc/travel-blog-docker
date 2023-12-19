import React, { useState } from "react";
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchPost } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination/Pagination";
import useStyles from "./styles";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();

  const { posts } = useSelector((state) => state.posts);

  const [currentId, setCurrentId] = useState(0);
  const [searchKeyword, setSearch] = useState("");

  const classes = useStyles();

  const page = query.get("page") || 1;
  
  const handleSearchPost = () => {
    if (searchKeyword.trim()) {
      dispatch(
        searchPost({
          keyword: searchKeyword,
        })
      );
      history.push(`/posts/search?keyword=${searchKeyword || "none"}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField
                autoComplete={false}
                name="searchKeyword"
                variant="outlined"
                label="Tìm kiếm"
                fullWidth
                value={searchKeyword}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearchPost} className={classes.searchBtn} variant="contained" color="primary">
                Tìm kiếm
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchKeyword && posts?.length > 0 && (
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
