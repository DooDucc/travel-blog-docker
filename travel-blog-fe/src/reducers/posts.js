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

export default (state = { posts: [], isLoading: false }, action) => {
  switch (action.type) {
    case FETCH_ALL: {
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        totalPage: action.payload.totalPage,
      };
    }
    case FETCH_POST: {
      return { ...state, post: action.payload };
    }
    case GET_LIKES:
    case LIKE: {
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload.postId) {
            return {
              ...post,
              likes: action.payload.likes,
            };
          }
          return post;
        }),
      };
    }
    case GET_COMMENTS:
    case COMMENT: {
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload.postId) {
            return {
              ...post,
              comments: action.payload.comments,
            };
          }
          return post;
        }),
      };
    }
    case CREATE: {
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    }
    case UPDATE: {
      return {
        ...state,
        posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)),
      };
    }
    case DELETE: {
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    }
    case SEARCH: {
      return { ...state, posts: action.payload };
    }
    case START_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case END_LOADING: {
      return {
        ...state,
        isLoading: false,
      };
    }

    default:
      return state;
  }
};
