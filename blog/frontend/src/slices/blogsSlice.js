import { createSlice } from '@reduxjs/toolkit';
import blogsService from '../services/blogs';
import { notify } from '../slices/notificationSlice';
const initialState = [];

const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1);

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    addBlog(state, action) {
      state.push(action.payload);
    },
    getBlogs(state, action) {
      return action.payload.sort(byLikes);
    },
    updateBlog(state, action) {
      const index = state.findIndex((blog) => blog.id === action.payload.id);
      state[index] = action.payload;
      return state.sort(byLikes);
    },
    removeBlog(state, action) {
      state = state.filter((blog) => blog.id !== action.payload);
      return state;
    },
    addComment(state, action) {
      const b = state.find((blog) => blog.id === action.payload.id);
      b.comments.push(action.payload.comment);
      return state;
    },
  },
});

export const { getBlogs, addBlog, updateBlog, removeBlog, addComment } =
  blogsSlice.actions;

export const createBlog = (blog) => {
  return async (dispatch) => {
    blogsService
      .create(blog)
      .then((createdBlog) => {
        dispatch(
          notify(
            `a new blog '${createdBlog.title}' by ${createdBlog.author} added`
          )
        );
        return dispatch(addBlog(createdBlog));
        //blogsFormRef.current.toggleVisibility();
      })
      .catch((error) => {
        dispatch(
          notify(
            'creating a blog failed: ' + error.response.data.error,
            'error'
          )
        );
      });
  };
};

export const getAllBlogs = () => {
  return async (dispatch) => {
    blogsService.getAll().then((blogs) => dispatch(getBlogs(blogs)));
  };
};

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    const toLike = getState()?.blogs?.find((b) => b.id === id);
    const liked = {
      ...toLike,
      likes: (toLike.likes || 0) + 1,
    };

    blogsService.update(id, liked).then((updatedBlog) => {
      dispatch(
        notify(`you liked '${updatedBlog.title}' by ${updatedBlog.author}`)
      );
      dispatch(updateBlog(updatedBlog));
    });
  };
};

export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    const toRemove = getState().blogs.find((b) => b.id === id);

    const ok = window.confirm(
      `remove '${toRemove.title}' by ${toRemove.author}?`
    );

    if (!ok) {
      return;
    }

    blogsService.remove(id).then(() => {
      dispatch(notify(`'${toRemove.title}' by ${toRemove.author} removed`));
      return dispatch(removeBlog(id));
    });
  };
};

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    blogsService.comment(id, comment).then(() => {
      return dispatch(addComment({ id, comment }));
    });
  };
};

export default blogsSlice.reducer;
