import { DataSource } from 'typeorm';
import * as path from 'path';
import { app } from 'electron';
import { Note } from '../entities/Note';

let dataSource: DataSource | null = null;

export async function initializeDatabase(): Promise<void> {
  const userDataPath = app.getPath('userData');
  const dbPath = path.join(userDataPath, 'database.sqlite');

  dataSource = new DataSource({
    type: 'better-sqlite3',
    database: dbPath,
    entities: [Note],
    synchronize: true, // Auto-create tables (use migrations in production)
    logging: process.env.NODE_ENV === 'development',
  });

  try {
    await dataSource.initialize();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

export function getDataSource(): DataSource {
  if (!dataSource) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return dataSource;
}
