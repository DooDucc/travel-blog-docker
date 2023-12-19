import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  COMMENT,
  GET_LIKES,
  GET_COMMENTS,
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);
    history.push(`/posts/${data._id}`);
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (dataLike, id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(dataLike, id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getLikes = (id) => async (dispatch) => {
  try {
    const { data } = await api.getLikesPost(id);
    dispatch({ type: GET_LIKES, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const searchPost = (query) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.searchPosts(query);
    dispatch({ type: SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const commentPost = (dataComment, id) => async (dispatch) => {
  try {
    const { data } = await api.commentPost(dataComment, id);
    const comments = data?.comments?.map((comment) => comment.comment);
    dispatch({ type: COMMENT, payload: data });
    return comments;
  } catch (error) {
    console.log(error.message);
  }
};

export const getComments = (id) => async (dispatch) => {
  try {
    const { data } = await api.getCommentsPost(id);
    dispatch({ type: GET_COMMENTS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
