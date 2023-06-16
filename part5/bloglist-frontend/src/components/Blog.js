import React, { useState } from 'react'

const Blog = ({ blog, handleLikeBlog, handleDeleteBlog }) => {
  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        <span data-testid="blog-title" className="title">{blog.title} - </span>
        <span data-testid="blog-author" className="author">{blog.author}</span>
      </div>
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? 'hide' : 'view'}
      </button>
      {expanded && (
        <div className="blog-details">
          <div data-testid="blog-url">{blog.url}</div>
          <div data-testid="blog-likes">
            likes {blog.likes}
            <button onClick={() => handleLikeBlog(blog)}>like</button>
          </div>
          <div data-testid="blog-author">{blog.author}</div>
          <button onClick={() => handleDeleteBlog(blog)}>delete</button>
        </div>
      )}
    </div>
  )
}

export default Blog
