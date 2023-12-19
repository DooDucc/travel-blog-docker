import React, { useEffect } from "react";
import { Pagination as PaginationComponent, PaginationItem } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts } from "../../actions/posts";
import useStyles from "./styles";

const Pagination = ({ page }) => {
  const dispatch = useDispatch();

  const { totalPage } = useSelector((state) => state.posts);

  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts(page));
  }, [page, dispatch]);

  return (
    <PaginationComponent
      classes={{ ul: classes.ul }}
      count={totalPage}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />}
    />
  );
};

export default Pagination;
