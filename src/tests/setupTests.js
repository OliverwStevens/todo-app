import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { vi } from 'vitest';

vi.mock('../utils/fileService', () => ({
  default: {
    readData: vi.fn().mockResolvedValue([]),
    saveData: vi.fn().mockResolvedValue(),
  }
}))

// 👇 Optionally reset all mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
});
