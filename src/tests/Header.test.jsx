// src/tests/App.test.jsx
import { render, screen } from '@testing-library/react';
import Header from '../Header';
import '@testing-library/jest-dom';
describe('Header', () => {
  it('shows the category Workplace', () => {
    const category = "Workplace"
    render(<Header  category={category}/>)
    expect(screen.getByText(category)).toBeInTheDocument()
  })

  it('shows the category Home', () => {
    const category = "Home"
    render(<Header  category={category}/>)
    expect(screen.getByText(category)).toBeInTheDocument()
  })

  it('shows the clear button', () => {
    render(<Header category="Workplace"/>)
    expect(screen.getByText('Clear Complete')).toBeInTheDocument()
  })
})