# Logseq Plugin API Information

## API Structure Overview

The Logseq Plugin API consists of both ClojureScript implementation (`src/main/logseq/`) and **TypeScript SDK** (`libs/`) providing complete type safety for plugin development.

### Architecture Components
1. **ClojureScript Core API** (`src/main/logseq/api.cljs`) - 3,000+ lines of API implementation
2. **TypeScript SDK** (`libs/`) - Type-safe plugin development framework  
3. **Plugin SDK Utilities** (`src/main/logseq/sdk/`) - ClojureScript SDK with 8 specialized modules
4. **Frontend Integration** (`src/main/frontend/`) - 80+ components and handlers for UI integration

### 1. TypeScript SDK (`libs/`)
The TypeScript SDK provides complete type definitions and utilities for plugin development:

#### TypeScript API Structure:
- **`libs/index.d.ts`** - Global type definitions and main API interface
- **`libs/src/LSPlugin.ts`** - Core plugin system types and interfaces
- **`libs/src/callable.apis.ts`** - Callable API methods and their signatures
- **`libs/src/modules/`** - Modular API implementations:
  - `LSPlugin.Request.ts` - HTTP request utilities
  - `LSPlugin.Search.ts` - Search functionality
  - `LSPlugin.Storage.ts` - Storage management
  - `LSPlugin.Experiments.ts` - Experimental features
- **`libs/src/LSPlugin.core.ts`** - Core plugin lifecycle management
- **`libs/src/helpers.ts`** - Utility functions and helpers

#### TypeScript Development Benefits:
- 🔷 **Type Safety**: Complete compile-time type checking
- 📘 **IntelliSense**: Full IDE support with autocomplete
- 🐛 **Error Prevention**: Catch errors before runtime
- 📖 **Documentation**: Types serve as inline documentation
- 🔄 **Refactoring**: Safe code refactoring with type guarantees

#### Installation and Setup:
```bash
npm install @logseq/libs
```

```typescript
// Type-safe plugin development
import { BlockEntity, PageEntity } from '@logseq/libs'

// Global logseq object is fully typed
declare global {
  var logseq: ILSPluginUser
}
```

### 2. Core API (`src/main/logseq/api.cljs`)
The main API namespace that exposes functionality to plugins. This massive file contains over 3,000 lines of API implementation with 60+ imports from core Logseq systems.

#### Key API Categories:
- **Database Operations**: Query, create, update blocks and pages (powered by DataScript)
- **UI Manipulation**: Interact with the editor, create UI elements, slot management
- **File System**: Read/write files, asset management, sync operations
- **Search**: Full-text search, block search, fuzzy matching
- **Commands**: Register custom commands and shortcuts, command palette integration
- **Events**: Plugin lifecycle and application event handling (60+ event types)
- **Configuration**: Access and modify app/plugin settings, user preferences
- **Themes**: Theme management, CSS injection, dark/light mode support
- **Git Integration**: Version control operations and history tracking

#### Core Integration Dependencies:
The API deeply integrates with Logseq's architecture through 60+ namespace imports:
- **DataScript Database**: `datascript.core` for graph database operations
- **State Management**: `frontend.state` for application state
- **Database Layer**: `frontend.db.*` for data models and queries (15 modules)
- **Handlers**: `frontend.handler.*` for business logic (20+ handlers)
- **Editor System**: `frontend.handler.editor` for text editing and blocks
- **Search Engine**: `frontend.handler.search` for content discovery
- **File System**: `frontend.fs` for file operations and sync
- **Configuration**: `frontend.config` for settings and preferences

### 3. ClojureScript SDK (`src/main/logseq/sdk/`)
Software Development Kit providing utilities for plugin development:

- **`sdk/core.cljs`** - Core SDK functionality and versioning (version: 20230330)
- **`sdk/ui.cljs`** - UI components and helpers for plugins
- **`sdk/assets.cljs`** - Asset management utilities
- **`sdk/utils.cljs`** - General utility functions
- **`sdk/git.cljs`** - Git integration helpers
- **`sdk/debug.cljs`** - Debugging tools for plugin development
- **`sdk/experiments.cljs`** - Experimental features and APIs

### 4. Specialized APIs
- **`api/block.cljs`** - Block-specific operations and utilities

## Plugin Development Context

### Database Architecture
- **DataScript**: In-memory graph database for storing blocks, pages, and relationships
- **Dual Mode**: Supports both file-based and database-based graphs
- **Query Language**: Datalog queries for complex data retrieval
- **Reactive Queries**: Real-time updates when data changes

### Extension Points
Plugins can extend Logseq through:
1. **Custom Commands**: Add new slash commands and keyboard shortcuts
2. **UI Components**: Inject custom React components
3. **Themes**: CSS customization and styling
4. **Data Processing**: Transform blocks and pages
5. **External Integration**: Connect with external services and APIs

### Event System
- **Lifecycle Events**: Plugin load, unload, enable, disable
- **Application Events**: Block changes, page navigation, search
- **User Events**: Keyboard shortcuts, mouse interactions
- **Database Events**: Data changes, query updates

### DOM Access
Plugins can interact with Logseq's DOM structure for:
- **Custom Styling**: Modify appearance and layout
- **Interactive Elements**: Add buttons, forms, and controls
- **Content Manipulation**: Transform rendered content
- **Event Handling**: Respond to user interactions

## TypeScript Plugin Development

### Complete Type Definitions

The TypeScript SDK provides comprehensive type definitions for all Logseq APIs:

#### Core Types:
```typescript
// Block and Page entities
interface BlockEntity {
  uuid: string
  content: string
  page: { id: number }
  format: 'markdown' | 'org'
  properties?: Record<string, any>
  // ... more properties
}

interface PageEntity {
  id: number
  name: string
  originalName: string
  properties?: Record<string, any>
  // ... more properties
}

// Plugin lifecycle
interface LSPluginBaseInfo {
  id: string
  title: string
  description?: string
  version?: string
}
```

#### API Method Types:
```typescript
// Editor API
interface ILSPluginEditor {
  getCurrentBlock(): Promise<BlockEntity | null>
  updateBlock(uuid: string, content: string): Promise<void>
  registerSlashCommand(name: string, handler: () => void): void
  // ... more methods with full type signatures
}

// App API
interface ILSPluginApp {
  registerUIItem(type: string, options: UIItemOptions): void
  showMsg(content: string, status?: 'success' | 'warning' | 'error'): void
  // ... more methods
}
```

### TypeScript Plugin Template Structure

```typescript
// main.ts - Entry point with full types
import '@logseq/libs'

async function main() {
  console.log('Plugin loaded')
  
  // Type-safe API usage
  logseq.Editor.registerSlashCommand('Hello TypeScript', async () => {
    const block = await logseq.Editor.getCurrentBlock()
    if (block) {
      await logseq.Editor.updateBlock(
        block.uuid, 
        `${block.content}\n- Hello from TypeScript plugin! 🎉`
      )
    }
  })
  
  // Type-safe settings
  logseq.useSettingsSchema([
    {
      key: 'greeting',
      type: 'string',
      title: 'Greeting Message',
      description: 'Custom greeting message',
      default: 'Hello'
    }
  ])
}

// Initialize with proper error handling
logseq.ready(main).catch(console.error)
```

### Build Configuration

#### TypeScript Configuration (`tsconfig.json`):
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["ESNext", "DOM"],
    "module": "ESNext",
    "moduleResolution": "node",
    "allowJs": true,
    "jsx": "react-jsx",
    "declaration": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

#### Package Configuration (`package.json`):
```json
{
  "name": "logseq-plugin-typescript-example",
  "main": "dist/index.js",
  "logseq": {
    "id": "typescript-example",
    "title": "TypeScript Example Plugin",
    "main": "dist/index.js"
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  },
  "dependencies": {
    "@logseq/libs": "^0.2.1"
  },
  "devDependencies": {
    "typescript": "^4.7.0"
  }
}
```

### Advanced TypeScript Features

#### Generic API Usage:
```typescript
// Type-safe database queries
const queryResult = await logseq.DB.datascriptQuery<BlockEntity[]>(`
  [:find (pull ?b [*])
   :where [?b :block/content ?content]
          [(clojure.string/includes? ?content "typescript")]]
`)

// Type-safe storage operations
interface PluginSettings {
  theme: 'light' | 'dark'
  autoSave: boolean
  customValues: Record<string, string>
}

const settings = await logseq.Assets.loadUserConfig<PluginSettings>()
```

#### Custom Hook Types:
```typescript
// Type-safe event handlers
logseq.App.onMacroRendererSlotted(({ slot, payload }: {
  slot: string
  payload: { 
    arguments: string[]
    uuid: string
  }
}) => {
  // Fully typed event handling
  console.log(`Macro ${slot} rendered with:`, payload)
})
```

## Theme Development

### CSS Classes and Structure
- **TailwindCSS**: Primary styling framework
- **CSS Custom Properties**: For theme customization
- **Component Classes**: Logseq-specific UI component styles
- **Dark/Light Mode**: Built-in theme switching support

### Styling Extension Points
- **Block Elements**: Style different block types
- **Editor Interface**: Customize editor appearance
- **Sidebar Components**: Modify navigation and panels
- **Modal Dialogs**: Style popups and overlays

## API Usage Patterns

### Common Plugin Operations
```clojure
;; Block operations
(js/logseq.api.get_current_block)
(js/logseq.api.insert_block)
(js/logseq.api.update_block)

;; Page operations  
(js/logseq.api.get_page)
(js/logseq.api.create_page)

;; UI interactions
(js/logseq.api.show_msg)
(js/logseq.api.app.register_ui_item)

;; Database queries
(js/logseq.api.datascript_query)
```

### Development Workflow
1. **Plugin Manifest**: Define plugin metadata and permissions
2. **API Integration**: Use logseq.api namespace for functionality
3. **UI Development**: Create React components with provided utilities
4. **Testing**: Use SDK debugging tools and development mode
5. **Distribution**: Package and distribute through Logseq marketplace

## Security Model
- **Sandboxed Execution**: Plugins run in isolated contexts
- **Permission System**: Explicit grants for file system and network access
- **API Boundaries**: Controlled access to core application functionality
- **Content Security**: XSS protection and safe HTML rendering