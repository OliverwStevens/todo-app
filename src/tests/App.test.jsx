// src/tests/App.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import '@testing-library/jest-dom';
import { expect } from 'vitest';
describe('App', () => {
  it('show the welcome text', () => {
    render(<App/>)
    expect(screen.getByText('Workplace')).toBeInTheDocument()
  })

  it('changes the category', async () => {
    const user = userEvent.setup()

    render(<App/>)
    expect(screen.getByText('Workplace')).toBeInTheDocument()
    const btn = screen.getAllByTestId('category-btn')[0]
    await user.click(btn)
    expect(screen.getByText('Home')).toBeInTheDocument()

  })
})