// src/tests/App.test.jsx
import { render, screen } from '@testing-library/react';
import TodoForm from '../TodoForm';
import '@testing-library/jest-dom';
describe('TodoForm', () => {
  it('shows the todo form', () => {
    render(<TodoForm/>)
    expect(screen.getByTestId('todo-form')).toBeInTheDocument()
  })
})