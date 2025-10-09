// src/utils/fileService.js
import { create, readFile, mkdir, BaseDirectory } from '@tauri-apps/plugin-fs'
import { appLocalDataDir } from "@tauri-apps/api/path"

class FileService {
  static async readData() {
    let existingData = []
    const appDataDir = await appLocalDataDir()
    await mkdir(appDataDir, { recursive: true })

    try {
      const content = await readFile('data.json', { baseDir: BaseDirectory.AppLocalData })
      const text = new TextDecoder().decode(content)
      existingData = JSON.parse(text)
    } catch {
      existingData = [] // file not found yet
    }

    return existingData
  }

  static async saveData(newItem) {
    const existingData = await FileService.readData()
    existingData.push(newItem)

    const file = await create('data.json', { baseDir: BaseDirectory.AppLocalData })
    await file.write(new TextEncoder().encode(JSON.stringify(existingData, null, 2)))
    await file.close()
  }

  static async updateData(newItem) {
    // Read existing data
    const existingData = await FileService.readData();
  
    // Find index of the item with the same id
    const index = existingData.findIndex(todo => todo.id === newItem.id);
  
    if (index !== -1) {
      // Replace the old item with the new one
      existingData[index] = newItem
  
      // Write the updated data back to file
      const file = await create('data.json', { baseDir: BaseDirectory.AppLocalData })
      await file.write(new TextEncoder().encode(JSON.stringify(existingData, null, 2)))
      await file.close()
    } else {
      console.error(`Item with id ${newItem.id} not found`);
    }
  }
  
}

export default FileService
