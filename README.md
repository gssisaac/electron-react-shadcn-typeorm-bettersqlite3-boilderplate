# Electron + React + shadcn/ui + TypeORM + better-sqlite3 Boilerplate

A modern, production-ready boilerplate for building Electron desktop applications with React, TypeScript, Tailwind CSS, shadcn/ui components, TypeORM, and better-sqlite3.

## Features

- **Electron** - Cross-platform desktop app framework
- **React + TypeScript** - Modern UI framework with type safety
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **TypeORM** - TypeScript ORM for database management
- **better-sqlite3** - Fast, synchronous SQLite database
- **Vite** - Fast build tool and dev server
- **Example CRUD App** - Complete Note entity example with CRUD operations

## Project Structure

```
├── src/
│   ├── main/              # Electron main process (TypeScript)
│   │   ├── index.ts       # Main entry point
│   │   ├── preload.ts     # Preload script for IPC
│   │   ├── database/      # Database initialization
│   │   ├── entities/      # TypeORM entities
│   │   ├── services/      # Business logic services
│   │   └── ipc/           # IPC handlers
│   └── renderer/          # React renderer process
│       ├── components/    # React components
│       ├── pages/         # Page components
│       ├── lib/           # Utility functions
│       └── types/         # TypeScript types
├── dist/                  # Build output
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

Clone this repository and install dependencies:

```bash
# Using npm
npm install

# Using yarn
yarn install
```

### Development

Run the app in development mode:

```bash
# Using npm
npm run electron:dev

# Using yarn
yarn electron:dev
```

This will:
- Compile TypeScript for the main process (watch mode)
- Start Vite dev server for the renderer
- Launch Electron automatically

### Build

Build the application:

```bash
# Using npm
npm run build

# Using yarn
yarn build
```

Build and package the app:

```bash
# Using npm
npm run electron:build

# Using yarn
yarn electron:build
```

## Database

The database is stored in the Electron app's user data directory:
- **macOS**: `~/Library/Application Support/[your-app-name]/database.sqlite`
- **Windows**: `%APPDATA%/[your-app-name]/database.sqlite`
- **Linux**: `~/.config/[your-app-name]/database.sqlite`

The database is automatically initialized when the app starts. TypeORM will create tables automatically based on your entities.

## Example: Note Entity

The project includes a complete Note CRUD example to help you get started:

- **Entity**: `src/main/entities/Note.ts`
- **Service**: `src/main/services/NoteService.ts`
- **IPC Handlers**: `src/main/ipc/index.ts`
- **UI**: `src/renderer/pages/NotesPage.tsx`

You can use this as a reference when creating your own entities and features.

## Adding New Entities

To add a new entity to your app:

1. Create an entity in `src/main/entities/` (e.g., `User.ts`)
2. Add it to the entities array in `src/main/database/index.ts`
3. Create a service in `src/main/services/` for business logic
4. Add IPC handlers in `src/main/ipc/index.ts`
5. Expose IPC methods in `src/main/preload.ts`
6. Add TypeScript types in `src/renderer/types/electron.d.ts`
7. Create React components in `src/renderer/` to interact with your entity

## Customization

### App Name and Metadata

Update the following files to customize your app:

- `package.json` - Change `name`, `description`, `author`, and `build.productName`
- `src/main/index.ts` - Update window title and app name
- `src/main/database/index.ts` - Update database name

### Styling

- Tailwind CSS configuration: `tailwind.config.js`
- Global styles: `src/renderer/index.css`
- shadcn/ui components: `src/renderer/components/ui/`

## Available Scripts

- `npm run dev` / `yarn dev` - Watch mode for main and renderer
- `npm run dev:main` / `yarn dev:main` - Watch mode for main process only
- `npm run dev:renderer` / `yarn dev:renderer` - Start Vite dev server
- `npm run build` / `yarn build` - Build both main and renderer
- `npm run build:main` / `yarn build:main` - Build main process only
- `npm run build:renderer` / `yarn build:renderer` - Build renderer only
- `npm run start` / `yarn start` - Run Electron (after build)
- `npm run electron:dev` / `yarn electron:dev` - Full dev mode with Electron
- `npm run electron:build` / `yarn electron:build` - Build and package app (macOS)
- `npm run electron:build:all` / `yarn electron:build:all` - Build for all platforms

## License

ISC

## Author

Isaac Lee <gssisaac@gmail.com>
