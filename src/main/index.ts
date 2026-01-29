import 'reflect-metadata';
import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { initializeDatabase } from './database';
import { setupIpcHandlers } from './ipc';

let mainWindow: BrowserWindow | null = null;

async function createWindow() {
  const isDev = !app.isPackaged;
  
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false, // Don't show until ready
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: isDev ? false : true, // Disable web security in dev for CORS, enable in production
    },
  });

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
    console.log('Window shown');
  });

  // Handle navigation errors
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error('Failed to load:', errorCode, errorDescription, validatedURL);
  });

  // Log when page loads
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('Page finished loading');
  });

  // Log console messages from renderer
  mainWindow.webContents.on('console-message', (event, level, message) => {
    console.log(`[Renderer ${level}]:`, message);
  });

  // Load the app
  console.log('Environment:', { isDev, NODE_ENV: process.env.NODE_ENV, isPackaged: app.isPackaged });
  
  if (isDev) {
    const devUrl = 'http://localhost:5173';
    console.log('Loading dev URL:', devUrl);
    
    try {
      await mainWindow.loadURL(devUrl);
      console.log('URL loaded successfully');
    } catch (err) {
      console.error('Error loading URL:', err);
      // Retry after a short delay
      setTimeout(async () => {
        try {
          await mainWindow?.loadURL(devUrl);
          console.log('Retry successful');
        } catch (retryErr) {
          console.error('Retry failed:', retryErr);
        }
      }, 2000);
    }
    
    mainWindow.webContents.openDevTools();
  } else {
    const filePath = path.join(__dirname, '../renderer/index.html');
    console.log('Loading file:', filePath);
    try {
      await mainWindow.loadFile(filePath);
    } catch (err) {
      console.error('Error loading file:', err);
    }
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(async () => {
  // Initialize database
  await initializeDatabase();
  
  // Setup IPC handlers
  setupIpcHandlers();
  
  // Create window
  await createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
