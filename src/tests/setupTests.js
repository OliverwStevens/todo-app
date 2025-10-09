import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { vi } from 'vitest';

vi.mock('../utils/fileService', () => ({
  default: {
    readData: vi.fn().mockResolvedValue([]),
    addTodo: vi.fn(),
    updateData: vi.fn(),
  }
}))

beforeEach(() => {
  vi.clearAllMocks()
})

afterEach(() => {
  cleanup()
})
