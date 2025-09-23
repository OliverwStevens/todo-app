// src/tests/App.test.jsx
// import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react'; // npm i -D @testing-library/react
import App from '../App';
import '@testing-library/jest-dom';
describe('App', () => {
  it('show the welcome text', () => {
    render(<App/>)
    expect(screen.getByText('Welcome to Tauri + React')).toBeInTheDocument()
  })
})