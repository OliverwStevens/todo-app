// src/tests/App.test.jsx
import { render, screen } from '@testing-library/react';
import TodoForm from '../TodoForm';
import GlobalContext from '../GlobalContext';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

describe('TodoForm', () => {
  it('shows the todo form', () => {
    render(
      <GlobalContext.Provider value={{ category: "Workplace", toggleGlobalState: vi.fn() }}>
        <TodoForm />
      </GlobalContext.Provider>
    );
    
    expect(screen.getByTestId('todo-form')).toBeInTheDocument();
  });
});
