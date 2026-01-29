import { ipcMain } from 'electron';
import { NoteService } from '../services/NoteService';

const noteService = new NoteService();

export function setupIpcHandlers(): void {
  // Get all notes
  ipcMain.handle('notes:getAll', async () => {
    try {
      return await noteService.getAll();
    } catch (error) {
      console.error('Error getting all notes:', error);
      throw error;
    }
  });

  // Get note by ID
  ipcMain.handle('notes:getById', async (_event, id: number) => {
    try {
      return await noteService.getById(id);
    } catch (error) {
      console.error('Error getting note by ID:', error);
      throw error;
    }
  });

  // Create note
  ipcMain.handle('notes:create', async (_event, data: { title: string; content?: string }) => {
    try {
      return await noteService.create(data);
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  });

  // Update note
  ipcMain.handle('notes:update', async (_event, id: number, data: { title?: string; content?: string }) => {
    try {
      return await noteService.update(id, data);
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  });

  // Delete note
  ipcMain.handle('notes:delete', async (_event, id: number) => {
    try {
      return await noteService.delete(id);
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  });
}
