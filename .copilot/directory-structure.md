# Directory Structure

## Root Level Configuration
- `package.json` - Node.js dependencies and build scripts
- `deps.edn` - Clojure/ClojureScript dependencies
- `shadow-cljs.edn` - ClojureScript build configuration
- `gulpfile.js` - Asset pipeline and build tasks
- `tailwind.config.js` - CSS framework configuration
- `webpack.config.js` - JavaScript bundling configuration

## Source Code (`src/`)

### Main Application (`src/main/`)
- **`src/main/frontend/`** - Core frontend application code
  - `components/` - UI React components
  - `handler/` - Business logic and event handlers
  - `state/` - Application state management
  - `db/` - Database operations and queries
  - `extensions/` - Built-in extensions (PDF, video, handbooks, etc.)
  - `fs/` - File system operations and sync
  - `util/` - Utility functions
  - `config/` - Configuration management

- **`src/main/logseq/`** - Plugin API and SDK
  - `api/` - Public API for plugins
  - `sdk/` - Software Development Kit utilities

- **`src/main/electron/`** - Electron desktop app specific code
  - Main process code for desktop application
  - OS integration and native features

### Development & Testing (`src/`)
- **`src/test/`** - ClojureScript test files
- **`src/dev-cljs/`** - Development utilities
- **`src/resources/`** - Resource files and translations
- **`src/bench/`** - Performance benchmarking code

## Dependencies (`deps/`)
Modular Clojure libraries maintained as part of the Logseq codebase:

### Core Libraries
- **`deps/common/`** - Shared utilities and common functions
- **`deps/db/`** - Database abstraction and operations
  - File-based and SQLite database implementations
  - Frontend database operations
- **`deps/graph-parser/`** - Graph parsing and processing
  - Markdown and Org-mode parsing
  - Block and page structure parsing
- **`deps/outliner/`** - Tree/outline data structure operations

### UI & Publishing
- **`deps/shui/`** - Shared UI component library
  - Form components, dialogs, icons, tables
  - Base UI primitives and patterns
- **`deps/publishing/`** - Export and publishing functionality
- **`deps/cli/`** - Command-line interface utilities

## Frontend Packages (`packages/`)
- **`packages/ui/`** - UI component system based on shadcn
- **`packages/tldraw/`** - Custom fork of TLDraw for whiteboards
- **`packages/amplify/`** - AWS Amplify integration

## Static Assets & Resources (`resources/`)
- **`resources/css/`** - Compiled CSS files
- **`resources/js/`** - JavaScript assets
- **`resources/fonts/`** - Web fonts
- **`resources/icons/`** - Application icons
- **`resources/img/`** - Images and graphics
- **`resources/mobile/`** - Mobile-specific assets
- **`resources/whiteboard/`** - Whiteboard templates and assets

## Mobile Applications
- **`android/`** - Android app configuration and native code
- **`ios/`** - iOS app configuration and native code
- **`capacitor.config.ts` - Capacitor mobile framework configuration

## Development Tools
- **`scripts/`** - Build and development scripts
- **`clj-e2e/`** - End-to-end ClojureScript tests
- **`.clj-kondo/`** - ClojureScript linter configuration
- **`.lsp/`** - Language Server Protocol configuration

## Documentation & Metadata
- **`docs/`** - Additional documentation
- **`CODEBASE_OVERVIEW.md`** - General codebase overview
- **`CONTRIBUTING.md`** - Contribution guidelines
- **`.copilot/`** - **NEW**: AI assistant metadata and context

## Key File Patterns

### ClojureScript Files
- `*.cljs` - ClojureScript source files
- `*.cljc` - Cross-platform Clojure/ClojureScript files
- `*.edn` - Extensible Data Notation configuration files

### Configuration Files
- `*.config.js` - JavaScript configuration files
- `package.json` - Node.js package configuration in each module
- `deps.edn` - Clojure dependencies in each module

### Plugin Development Context
- **Plugin API**: Located in `src/main/logseq/api/`
- **Extension Points**: `src/main/frontend/extensions/`
- **UI Components**: Available through deps/shui and packages/ui
- **Database Access**: Through deps/db abstraction layer
- **Theme System**: CSS classes and TailwindCSS utilities