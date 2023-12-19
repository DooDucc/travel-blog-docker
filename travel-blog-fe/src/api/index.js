import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL });

console.log(process.env);

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const searchPosts = (query) =>
  API.get(`/posts/search?keyword=${query?.keyword || "none"}`);
export const createPost = (newPost) => API.post("/posts", newPost);
export const likePost = (data, id) => API.patch(`/posts/${id}/like-post`, data);
export const commentPost = (data, id) =>
  API.post(`/posts/${id}/comment-post`, data);
export const getLikesPost = (id) => API.get(`/posts/likes/${id}`);
export const getCommentsPost = (id) => API.get(`/posts/comments/${id}`);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const signin = (formData) => API.post("/auth/login", formData);
export const signup = (formData) => API.post("/auth/register", formData);
