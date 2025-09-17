# Development Context

## Coding Patterns and Conventions

### ClojureScript Conventions
- **Namespace Organization**: Hierarchical namespaces (e.g., `frontend.handler.editor`)
- **Naming**: Kebab-case for functions and variables, PascalCase for components
- **State Management**: Centralized state in `frontend.state` namespace
- **Data Structures**: Extensive use of immutable data structures and maps
- **Async Operations**: Promesa library for Promise-based async operations

### React Component Patterns
- **Rum Components**: ClojureScript wrapper around React
- **Functional Components**: Prefer function-based components over classes
- **Hooks Integration**: ClojureScript-friendly hook patterns
- **State Local State**: Component-level state management patterns

### Database Patterns
- **DataScript Queries**: Datalog syntax for complex queries
- **Entity-Relationship**: Graph-based data modeling with entities and references
- **Reactive Queries**: Automatic UI updates when query results change
- **Dual Schema**: Support for both file-based and database-based storage

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
- **Advanced Compilation**: Google Closure Compiler optimizations
- **Code Splitting**: Lazy loading of modules and components
- **Bundle Size**: Careful dependency management
- **Memory Management**: Immutable data structure efficiency

### Database Performance
- **Query Optimization**: Efficient DataScript query patterns
- **Indexing**: Strategic use of database indices
- **Caching**: Multiple levels of caching for frequently accessed data
- **Incremental Updates**: Minimal DOM updates through React optimization

### UI Performance
- **Virtual Scrolling**: Efficient rendering of large lists (react-virtuoso)
- **Component Memoization**: Prevent unnecessary re-renders
- **Debouncing**: Input handling optimization
- **Canvas Rendering**: PixiJS for performance-critical graphics

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