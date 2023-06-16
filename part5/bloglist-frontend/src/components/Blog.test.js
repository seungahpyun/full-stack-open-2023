import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { act, render, screen } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'Test Title',
  author: 'Test Author',
  url: 'http://testurl.com',
  likes: 0,
  user: {
    username: 'testuser',
    name: 'Test User'
  }
}

beforeEach(() => {
  render(<Blog blog={blog} />)
})

test('renders title and author, but not url or likes by default', () => {
  expect(screen.getByTestId('blog-title')).toBeInTheDocument()
  expect(screen.getByTestId('blog-author')).toBeInTheDocument()
  expect(screen.queryByTestId('blog-url')).toBeNull()
  expect(screen.queryByTestId('blog-likes')).toBeNull()
})

test('renders url and likes when view button is clicked', () => {
  const button = screen.getByText('view')
  act(() => {
    button.click()
  })

  expect(screen.getByTestId('blog-url')).toBeInTheDocument()
  expect(screen.getByTestId('blog-likes')).toBeInTheDocument()
})
