export interface Note {
  id: number;
  title: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ElectronAPI {
  notes: {
    getAll: () => Promise<Note[]>;
    getById: (id: number) => Promise<Note | null>;
    create: (data: { title: string; content?: string }) => Promise<Note>;
    update: (id: number, data: { title?: string; content?: string }) => Promise<Note | null>;
    delete: (id: number) => Promise<boolean>;
  };
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
