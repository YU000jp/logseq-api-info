# Logseq Plugin API Information

## API Structure Overview

The Logseq Plugin API is located in `src/main/logseq/` and consists of two main parts:

### 1. Core API (`src/main/logseq/api.cljs`)
The main API namespace that exposes functionality to plugins. This includes:

#### Key API Categories:
- **Database Operations**: Query, create, update blocks and pages
- **UI Manipulation**: Interact with the editor, create UI elements
- **File System**: Read/write files, asset management  
- **Search**: Full-text search, block search
- **Commands**: Register custom commands and shortcuts
- **Events**: Plugin lifecycle and application event handling
- **Configuration**: Access and modify app/plugin settings

#### Import Dependencies:
The API integrates with core Logseq systems:
- DataScript database operations (`datascript.core`)
- Frontend state management (`frontend.state`)
- Database models and queries (`frontend.db.*`)
- Handlers for various operations (`frontend.handler.*`)
- Editor functionality (`frontend.handler.editor`)
- Search capabilities (`frontend.handler.search`)

### 2. SDK (`src/main/logseq/sdk/`)
Software Development Kit providing utilities for plugin development:

- **`sdk/core.cljs`** - Core SDK functionality and versioning (version: 20230330)
- **`sdk/ui.cljs`** - UI components and helpers for plugins
- **`sdk/assets.cljs`** - Asset management utilities
- **`sdk/utils.cljs`** - General utility functions
- **`sdk/git.cljs`** - Git integration helpers
- **`sdk/debug.cljs`** - Debugging tools for plugin development
- **`sdk/experiments.cljs`** - Experimental features and APIs

### 3. Specialized APIs
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