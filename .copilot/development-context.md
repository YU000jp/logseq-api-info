# Development Context

## Coding Patterns and Conventions

### ClojureScript Conventions (approx. 90% of codebase)
- **Namespace Organization**: Hierarchical namespaces (e.g., `frontend.handler.editor`)
- **Naming**: Kebab-case for functions and variables, PascalCase for React components
- **State Management**: Centralized state in `frontend.state` namespace with reactive atoms
- **Data Structures**: Extensive use of immutable data structures and persistent collections
- **Async Operations**: Promesa library for Promise-based async operations
- **Error Handling**: Try-catch blocks with structured error reporting

### Component Architecture Patterns
- **Rum Components**: ClojureScript wrapper around React (80+ components)
- **Functional Components**: Prefer function-based components over classes
- **Hooks Integration**: ClojureScript-friendly hook patterns with `rum/use-state`
- **State Management**: Mix of local component state and global application state
- **Event Handling**: Reactive event system with pub-sub pattern

### File Organization Patterns
```
src/main/frontend/
├── components/           # 80+ UI components
│   ├── block/           # Block system (10+ files)
│   ├── editor.cljs      # Main editor component
│   └── page.cljs        # Page management
├── handler/             # 25+ business logic handlers
│   ├── editor.cljs      # Editor operations (2,000+ lines)
│   ├── db.cljs          # Database operations
│   └── plugin.cljs      # Plugin integration
├── db/                  # 15+ database modules
│   ├── model.cljs       # Data models
│   ├── query-dsl.cljs   # Query language
│   └── utils.cljs       # Database utilities
└── util/                # 20+ utility modules
```

### Database Patterns

#### DataScript Query Patterns
```clojure
;; Simple entity lookup
[:find ?e :where [?e :block/uuid uuid]]

;; Complex graph queries with joins
[:find (pull ?p [*])
 :in $ ?page-name
 :where 
 [?p :page/name ?page-name]
 [?b :block/page ?p]]

;; Full-text search with filters
[:find ?block
 :where 
 [(fulltext $ :block/content "search-term") [[?block _]]]
 [?block :block/page ?page]]
```

#### Dual Storage Architecture
1. **File-Based Mode**: Traditional markdown files with DataScript indexing
2. **Database Mode**: SQLite backend with DataScript interface for compatibility

## Architecture Patterns

### Plugin Architecture
- **Event-Driven**: Plugin communication through event system
- **API Surface**: Well-defined boundaries between core and plugins
- **Sandboxing**: Isolated execution contexts for security
- **Extensibility**: Multiple extension points (commands, UI, themes)

### Module Organization
- **Separation of Concerns**: Clear boundaries between DB, UI, and business logic
- **Dependency Injection**: Handler pattern for business operations
- **Common Utilities**: Shared code in `deps/common`
- **Platform Abstraction**: Unified APIs across web, desktop, and mobile

### Build System Architecture
- **Multi-Target**: Single codebase, multiple deployment targets
- **Module Loading**: Dynamic module loading for performance
- **Asset Pipeline**: Separate handling of code and static assets
- **Development Tools**: Hot reloading and REPL integration

## Performance Considerations

### ClojureScript Optimization
- **Advanced Compilation**: Google Closure Compiler with :advanced optimizations
- **Code Splitting**: Dynamic module loading for plugins and extensions
- **Bundle Analysis**: Shadow-CLJS build reports for size optimization
- **Memory Management**: Persistent data structures for efficient memory usage
- **Dead Code Elimination**: Automatic removal of unused code paths

### Database Performance (DataScript)
- **Query Optimization**: Efficient DataScript query patterns with proper indexing
- **Entity Caching**: Multi-level caching for frequently accessed entities
- **Incremental Updates**: Minimal re-computation on data changes
- **Batch Operations**: Transactional updates for multiple changes
- **Large Graph Support**: Optimized for 100K+ blocks in database mode

### UI Performance
- **Virtual Scrolling**: `react-virtuoso` for efficient rendering of large lists
- **Component Memoization**: `rum/memo` to prevent unnecessary re-renders
- **Debounced Inputs**: 300ms debouncing for search and text input
- **Canvas Rendering**: PixiJS for performance-critical graphics (whiteboards)
- **Lazy Loading**: Component-level code splitting and lazy mounting

### Asset Optimization
- **CSS Purging**: TailwindCSS removes unused styles in production
- **Image Optimization**: Responsive images with proper sizing
- **Font Loading**: Web font optimization with font-display swap
- **JavaScript Minification**: Closure compiler optimizations
- **Resource Hints**: Preloading critical resources

## Testing Strategy

### Test Organization
- **Unit Tests**: Component and function-level testing
- **Integration Tests**: Cross-component interaction testing
- **End-to-End Tests**: Full workflow testing with Playwright
- **Performance Tests**: Benchmarking critical paths

### Testing Tools
- **ClojureScript Testing**: Built-in cljs.test framework
- **Browser Testing**: Playwright for automated browser testing
- **Mobile Testing**: Capacitor testing for mobile platforms
- **Visual Testing**: Screenshot comparison for UI regression

## Error Handling Patterns

### Exception Management
- **Try-Catch Blocks**: Strategic error boundary placement
- **Error Reporting**: Sentry integration for error tracking
- **Graceful Degradation**: Fallback behaviors for failures
- **User Feedback**: Meaningful error messages and recovery options

### Logging and Debugging
- **Structured Logging**: Consistent log formatting and levels
- **Development Tools**: Browser devtools integration
- **REPL Debugging**: Interactive debugging through ClojureScript REPL
- **Performance Profiling**: Browser and Node.js profiling tools

## Security Patterns

### Plugin Security
- **Sandboxed Execution**: Isolated plugin runtime environments
- **Permission Model**: Explicit grants for sensitive operations
- **API Validation**: Input sanitization and validation
- **Content Security Policy**: XSS and injection prevention

### Data Protection
- **Encryption**: Client-side encryption for sensitive data
- **Access Control**: User-based data access restrictions
- **Privacy First**: Local-first data storage and processing
- **Audit Trails**: Operation logging for security analysis

## Development Workflow

### Local Development
1. **Environment Setup**: Clojure, Node.js, and development dependencies
2. **Hot Reloading**: Live code updates during development
3. **REPL Integration**: Interactive development with connected REPL
4. **Testing**: Continuous testing during development

### Build and Deployment
1. **Multi-Stage Build**: Development, staging, and production builds
2. **Asset Optimization**: CSS and JavaScript minification
3. **Platform Building**: Electron, Capacitor, and web builds
4. **Distribution**: App stores and direct distribution

### Code Quality
- **Linting**: clj-kondo for ClojureScript, ESLint for JavaScript
- **Formatting**: Consistent code formatting with automated tools
- **Code Review**: Pull request review process
- **Documentation**: Inline documentation and external guides

## Extension Development Guidelines

### Plugin Best Practices
- **Minimal API Surface**: Use only necessary API endpoints
- **Error Handling**: Graceful failure and user feedback
- **Performance**: Efficient algorithms and minimal resource usage
- **Compatibility**: Support for different Logseq versions

### Theme Development
- **CSS Organization**: Structured stylesheets with clear hierarchy
- **Variable Usage**: CSS custom properties for theme customization
- **Cross-Platform**: Consistent appearance across platforms
- **Accessibility**: Support for different visual needs and preferences