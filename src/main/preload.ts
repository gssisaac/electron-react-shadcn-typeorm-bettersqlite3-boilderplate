import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Note CRUD operations
  notes: {
    getAll: () => ipcRenderer.invoke('notes:getAll'),
    getById: (id: number) => ipcRenderer.invoke('notes:getById', id),
    create: (data: { title: string; content: string }) => 
      ipcRenderer.invoke('notes:create', data),
    update: (id: number, data: { title?: string; content?: string }) => 
      ipcRenderer.invoke('notes:update', id, data),
    delete: (id: number) => ipcRenderer.invoke('notes:delete', id),
  },
});
