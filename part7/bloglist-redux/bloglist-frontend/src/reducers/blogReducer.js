import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlog(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      const { id } = updatedBlog
      return state.map((blog) => (blog.id !== id ? blog : updatedBlog))
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
  },
})

const { setBlog, appendBlog,updateBlog, removeBlog } = blogSlice.actions

export const addBlog = (blog) => {
  return dispatch => {
    try {
      dispatch(appendBlog(blog))
    } catch (error) {
      dispatch(showNotification(error.message, 'error'))
    }
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id)
      dispatch(removeBlog(blog.id))
    } catch (error) {
      dispatch(showNotification(error.message, 'error'))
    }
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.update(blog.id, { likes: blog.likes + 1 })
      const mergedBlog = { ...blog, likes: blog.likes + 1 }
      dispatch(updateBlog(mergedBlog))
    } catch (error) {
      dispatch(showNotification(error.message, 'error'))
    }
  }
}

export const addComment = (blog, comment) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.comment(blog.id, { comment })
      dispatch(updateBlog(updatedBlog))
    } catch (error) {
      dispatch(showNotification(error.message, 'error'))
    }
  }
}


export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlog(blogs))
  }
}

export default blogSlice.reducer
