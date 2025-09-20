# Logseq Application Architecture Analysis

## Overall Architecture

### Technology Stack Overview
Logseq is built as a **local-first, cross-platform application** with the following core technologies:

#### Primary Languages
- **ClojureScript** (90%): Main application logic, UI components, database operations
- **TypeScript** (8%): Plugin SDK, type definitions, development tooling
- **JavaScript** (2%): Native integrations, external libraries, build tools

> **Note:** Language percentages are approximate and were last estimated on 2024-06-01. For precise figures, run [`cloc`](https://github.com/AlDanial/cloc) on the codebase:
> ```
> cloc .
> ```
> Please update this section if the codebase changes significantly.
#### Core Frameworks
- **React 18.3.1**: UI framework with functional components
- **Rum**: ClojureScript React wrapper with enhanced state management
- **DataScript**: In-memory graph database implementing Datalog queries
- **Electron**: Desktop application framework
- **Capacitor**: Mobile application framework

#### Build and Development
- **Shadow-CLJS**: ClojureScript compilation and development server
- **Webpack**: JavaScript bundling and asset management
- **Gulp**: Asset pipeline and build automation
- **TailwindCSS**: Utility-first CSS framework

## Application Layers

### 1. Presentation Layer (`src/main/frontend/components/`)
**80+ React Components** organized by functionality:

#### Core UI Components
- **Block System**: `block/` (10+ components) - Core editing interface
- **Editor**: `editor.cljs` - Text editing and formatting
- **Page Management**: `page.cljs`, `all_pages.cljs` - Page navigation and listing
- **Search Interface**: `search.cljs` - Full-text and semantic search
- **Graph Visualization**: `graph/` - Visual knowledge graph

#### Layout Components
- **Header**: `header.cljs` - Top navigation and toolbar
- **Sidebars**: `left_sidebar.cljs`, `right_sidebar.cljs` - Navigation panels
- **Container**: `container.cljs` - Main layout orchestration
- **Theme System**: `theme.cljs` - Appearance and styling management

#### Extension Components
- **Plugins**: `plugins.cljs` - Plugin management interface
- **Whiteboard**: `whiteboard.cljs` - Canvas-based drawing
- **PDF Viewer**: `extensions/pdf/` - Document annotation
- **Handbooks**: `extensions/handbooks/` - Interactive tutorials

### 2. Business Logic Layer (`src/main/frontend/handler/`)
**25+ Handler Modules** implementing core functionality:

#### Content Management
- **Editor Handler**: `editor.cljs` (2,000+ lines) - Block manipulation, formatting
- **Page Handler**: `page.cljs` - Page creation, deletion, renaming
- **Property Handler**: `property.cljs` - Block properties and metadata
- **Reference Handler**: `reference.cljs` - Backlinks and citations

#### System Operations
- **Database Handler**: `db.cljs` - Database operations and migrations
- **File System Handler**: `fs.cljs` - File operations and sync
- **Search Handler**: `search.cljs` - Search indexing and querying
- **Configuration Handler**: `config.cljs` - Settings and preferences

#### Integration Handlers
- **Plugin Handler**: `plugin.cljs` - Plugin lifecycle and API
- **Export Handler**: `export.cljs` - Data export and publishing
- **Git Handler**: `git.cljs` - Version control integration
- **Shell Handler**: `shell.cljs` - System command execution

### 3. Data Layer Architecture

#### Database Systems (Dual Mode)
1. **File-Based Mode** (Traditional)
   - **Storage**: Local markdown/org files
   - **Index**: DataScript in-memory database
   - **Sync**: File system watching and Git integration

2. **Database Mode** (Modern)
   - **Storage**: SQLite database with DataScript interface
   - **Schema**: Structured block and page entities
   - **Performance**: Optimized for large graphs (100K+ blocks)

#### DataScript Schema
```clojure
{:block/uuid         {:db/unique :db.unique/identity}
 :block/content      {:db/fulltext true}
 :block/page         {:db/type :db.type/ref}
 :block/parent       {:db/type :db.type/ref}
 :block/properties   {:db/type :db.type/ref :db/cardinality :db.cardinality/many}
 :page/name          {:db/unique :db.unique/identity}
 :page/original-name {:db/unique :db.unique/identity}}
```

### 4. Plugin Architecture

#### Plugin System Components
- **Core API** (`src/main/logseq/api.cljs`): 3,000+ lines of plugin APIs
- **TypeScript SDK** (`libs/`): Type-safe development framework
- **Plugin Runtime**: Sandboxed execution environment
- **UI Integration**: Slot-based UI injection system

#### Plugin Capabilities
1. **Data Access**: Full read/write access to blocks and pages
2. **UI Extension**: Custom components and theme modification
3. **Command Integration**: Slash commands and keyboard shortcuts
4. **Event System**: Lifecycle and application event handling
5. **External APIs**: HTTP requests and third-party integrations

### 5. Cross-Platform Architecture

#### Desktop (Electron)
- **Main Process**: `src/main/electron/` - Native OS integration
- **Renderer Process**: Main application code
- **IPC Communication**: Inter-process messaging for file operations
- **Native Features**: System notifications, file dialogs, menu bar

#### Mobile (Capacitor)
- **Native Shell**: iOS and Android app containers
- **Web View**: Main application running in WebView
- **Native Plugins**: Camera, filesystem, sharing integrations
- **Platform Optimization**: Touch interactions, mobile layouts

#### Web (Browser)
- **Progressive Web App**: Full PWA support with service worker
- **File System Access**: File System Access API (Chrome)
- **Local Storage**: IndexedDB for persistence
- **Limited Features**: Reduced functionality compared to native apps

## State Management Architecture

### Global State (`frontend.state`)
Centralized application state with reactive updates:

```clojure
{:route-match           current-route
 :config                user-configuration
 :current-repo          active-repository
 :db/batch-txs          database-transactions
 :editor/content        current-editor-content
 :ui/theme              active-theme
 :plugin/installed-plugins plugin-registry}
```

### Reactive System
- **State Atoms**: Clojure atoms for mutable state
- **Reactive Queries**: Automatic UI updates on data changes
- **Event System**: Pub-sub pattern for cross-component communication
- **Persistence**: Automatic state persistence to local storage

## Security Architecture

### Plugin Sandboxing
1. **Execution Context**: Isolated JavaScript execution environment
2. **API Boundaries**: Controlled access through official API surface
3. **Permission System**: Explicit grants for sensitive operations
4. **Content Security Policy**: XSS and injection prevention

### Data Protection
1. **Local-First**: All data stored locally by default
2. **Encryption**: Optional local encryption for sensitive data
3. **File Permissions**: Restricted file system access
4. **Privacy Controls**: No telemetry without explicit consent

## Performance Architecture

### Optimization Strategies
1. **Lazy Loading**: Components and data loaded on demand
2. **Virtual Scrolling**: Efficient rendering of large lists
3. **Code Splitting**: Modular loading of application features
4. **Caching**: Multiple levels of data and query caching

### Memory Management
1. **Immutable Data Structures**: Efficient memory usage through structural sharing
2. **Garbage Collection**: Automatic cleanup of unused components
3. **Query Optimization**: Efficient DataScript query patterns
4. **Resource Cleanup**: Proper cleanup of event listeners and timers

## Build and Deployment Architecture

### Multi-Target Build System
```bash
# Development builds
yarn watch          # All platforms with hot reload
yarn electron-watch # Desktop with native features
yarn mobile-watch   # Mobile with device testing

# Production builds  
yarn release        # Web build
yarn release-electron # Desktop app
yarn release-mobile   # Mobile app
```

### Asset Pipeline
1. **CSS Processing**: PostCSS with TailwindCSS purging
2. **JavaScript Bundling**: Webpack with code splitting
3. **ClojureScript Compilation**: Shadow-CLJS with optimizations
4. **Static Assets**: Gulp for images, fonts, and other resources

### Distribution Channels
1. **Desktop**: Direct download, app stores (macOS, Windows, Linux)
2. **Mobile**: App stores (iOS App Store, Google Play)
3. **Web**: Direct hosting, self-hosted instances
4. **Developer**: Source builds for contributors

## Extension Points for Developers

### For Plugin Developers
1. **API Surface**: 200+ methods across 15 API categories
2. **Event Hooks**: 60+ event types for lifecycle integration
3. **UI Slots**: 20+ injection points for custom interfaces
4. **Data Access**: Full CRUD operations on blocks and pages
5. **Theme System**: CSS injection and custom properties

### For Theme Developers
1. **CSS Variables**: 71+ customizable properties
2. **Component Classes**: 997+ classes for styling
3. **Dark/Light Modes**: Automatic theme switching support
4. **Responsive Design**: Mobile-optimized layouts
5. **Accessibility**: ARIA support and keyboard navigation

### For Contributors
1. **Modular Architecture**: Clear separation of concerns
2. **Test Coverage**: Unit, integration, and E2E test suites
3. **Development Tools**: Hot reload, REPL, debugging tools
4. **Documentation**: Comprehensive code comments and guides
5. **Community**: Active development community and support

## Scalability Considerations

### Large Graph Support
- **Database Mode**: Optimized for 100K+ blocks
- **Incremental Loading**: Lazy loading of graph sections
- **Query Optimization**: Efficient DataScript query patterns
- **Memory Management**: Automatic cleanup of unused data

### Multi-User Scenarios
- **Real-Time Sync**: WebRTC and WebSocket support
- **Conflict Resolution**: Operational transformation algorithms
- **Permission Systems**: User-based access controls
- **Collaborative Features**: Shared editing and commenting

This architecture analysis provides developers with a comprehensive understanding of Logseq's internal structure, enabling effective plugin development, theme creation, and contribution to the core application.