// src/tests/App.test.jsx
import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';
describe('App', () => {
  it('show the welcome text', () => {
    render(<App/>)
    expect(screen.getByText('Welcome to Tauri + React')).toBeInTheDocument()
  })
})