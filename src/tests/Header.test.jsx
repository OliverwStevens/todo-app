// src/tests/App.test.jsx
import { render, screen } from '@testing-library/react';
import Header from '../Header';
import '@testing-library/jest-dom';
describe('Header', () => {
  it('shows the category Workplace', () => {
    const title = "Workplace"
    render(<Header  title={title}/>)
    expect(screen.getByText(title)).toBeInTheDocument()
  })

  it('shows the category Home', () => {
    const title = "Home"
    render(<Header  title={title}/>)
    expect(screen.getByText(title)).toBeInTheDocument()
  })

  it('shows the clear button', () => {
    render(<Header title="Workplace"/>)
    expect(screen.getByText('Clear Complete')).toBeInTheDocument()
  })
})