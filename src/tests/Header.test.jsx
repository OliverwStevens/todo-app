// src/tests/App.test.jsx
import { render, screen } from '@testing-library/react';
import Header from '../Header';
import GlobalContext from '../GlobalContext';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

describe('Header', () => {
  it('shows the category Workplace via context', () => {
    render(
      <GlobalContext.Provider value={{ category: "Workplace", toggleGlobalState: vi.fn() }}>
        <Header />
      </GlobalContext.Provider>
    );
    expect(screen.getByText("Workplace")).toBeInTheDocument();
  });

  it('shows the category Home via context', () => {
    render(
      <GlobalContext.Provider value={{ category: "Home", toggleGlobalState: vi.fn() }}>
        <Header />
      </GlobalContext.Provider>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it('shows the clear button', () => {
    render(
      <GlobalContext.Provider value={{ category: "Workplace", toggleGlobalState: vi.fn() }}>
        <Header />
      </GlobalContext.Provider>
    );
    expect(screen.getByText('Clear Complete')).toBeInTheDocument();
  });
});
