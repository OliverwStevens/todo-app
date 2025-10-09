import { describe, it, expect, vi, beforeEach } from "vitest"
vi.unmock('../utils/fileService');

import FileService from "../utils/fileService"
import { create, readFile, mkdir } from "@tauri-apps/plugin-fs"

// Mock tauri APIs
vi.mock("@tauri-apps/plugin-fs", () => {
  return {
    create: vi.fn(),
    readFile: vi.fn(),
    mkdir: vi.fn(),
    BaseDirectory: { AppLocalData: "mockBaseDir" }
  }
})

vi.mock("@tauri-apps/api/path", () => {
  return {
    appLocalDataDir: vi.fn().mockResolvedValue("/mock/appdata")
  }
})



describe("FileService", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should return empty array if file does not exist", async () => {
    readFile.mockRejectedValueOnce(new Error("file not found"))

    const data = await FileService.readData()

    expect(mkdir).toHaveBeenCalledWith("/mock/appdata", { recursive: true })
    expect(data).toEqual([])
  })

  it("should read and parse JSON data when file exists", async () => {
    const mockContent = new TextEncoder().encode(JSON.stringify([{ id: 1, text: "test" }]))
    readFile.mockResolvedValueOnce(mockContent)

    const data = await FileService.readData()

    expect(readFile).toHaveBeenCalledWith("data.json", { baseDir: "mockBaseDir" })
    expect(data).toEqual([{ id: 1, text: "test" }])
  })

  it("should add a todo through appending to existing file", async () => {
    // Mock existing file content
    const existingData = [{ id: 1, text: "old" }]
    readFile.mockResolvedValueOnce(new TextEncoder().encode(JSON.stringify(existingData)))
  
    // Mock file handle
    const mockWrite = vi.fn()
    const mockClose = vi.fn()
    create.mockResolvedValueOnce({ write: mockWrite, close: mockClose })
  
    const newItem = { id: 2, text: "new" }
    await FileService.addTodo(newItem)
  
    expect(create).toHaveBeenCalledWith("data.json", { baseDir: "mockBaseDir" })
    expect(mockWrite).toHaveBeenCalledTimes(1)
  
    // 🔍 Verify actual content written
    const writtenArg = mockWrite.mock.calls[0][0]
    const decoded = new TextDecoder().decode(writtenArg)
    expect(JSON.parse(decoded)).toEqual([
      { id: 1, text: "old" },
      { id: 2, text: "new" }
    ])
  
    expect(mockClose).toHaveBeenCalled()
  })

  it('should update the data', async () => {
    const existingData = [{ id: 1, text: "old" }]
    readFile.mockResolvedValueOnce(new TextEncoder().encode(JSON.stringify(existingData)))

    const mockWrite = vi.fn()
    const mockClose = vi.fn()
    create.mockResolvedValueOnce({ write: mockWrite, close: mockClose })
  
    const newItem = { id: 1, text: "new" }
    await FileService.updateData(newItem)
  
    expect(create).toHaveBeenCalledWith("data.json", { baseDir: "mockBaseDir" })
    expect(mockWrite).toHaveBeenCalledTimes(1)
  
    // 🔍 Verify actual content written
    const writtenArg = mockWrite.mock.calls[0][0]
    const decoded = new TextDecoder().decode(writtenArg)
    expect(JSON.parse(decoded)).toEqual([
      { id: 1, text: "new" }
    ])
  
    expect(mockClose).toHaveBeenCalled()
  })
  
})
