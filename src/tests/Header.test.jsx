// src/tests/App.test.jsx
import { render, screen } from '@testing-library/react';
import Header from '../Header';
import '@testing-library/jest-dom';
describe('Header', () => {
  it('shows the category', () => {
    render(<Header/>)
    expect(screen.getByText('Workplace')).toBeInTheDocument()
  })
})