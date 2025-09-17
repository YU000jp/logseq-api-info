# Technology Stack

## Core Technologies

### Frontend
- **Language**: ClojureScript (compiles to JavaScript)
- **UI Framework**: React 18.3.1 (via Rum - ClojureScript wrapper)
- **Build Tools**: Shadow-cljs 2.28.23, Webpack 5.98.0
- **Styling**: TailwindCSS 3.3.5, PostCSS

### Backend/Desktop
- **Desktop App**: Electron (Node.js integration)
- **Database**: DataScript (in-memory database, fork maintained by Logseq)
- **File System**: Node.js fs modules, custom sync implementations

### Mobile
- **Framework**: Capacitor 7.2.0 (cross-platform mobile development)
- **Platforms**: iOS and Android
- **Native Integration**: Camera, Filesystem, Keyboard, Network APIs

## Key ClojureScript Dependencies

### Core Libraries
- **Clojure**: 1.11.1
- **Rum**: Custom fork for React integration
- **DataScript**: Custom fork for graph database functionality
- **Promesa**: 11.0.678 (Promise handling)
- **Reitit Frontend**: 0.3.10 (Routing)

### Utility Libraries
- **cljs-bean**: 1.5.0 (JavaScript interop)
- **dommy**: 1.1.0 (DOM manipulation)
- **cljs-time**: Custom fork (Date/time handling)
- **core.match**: 1.0.0 (Pattern matching)
- **hickory**: 0.7.3 (HTML parsing)

## JavaScript Dependencies

### Development Tools
- **Testing**: Playwright 1.51.0, Karma
- **Linting**: Stylelint, clj-kondo
- **Build**: Gulp 4.0.2, PostCSS 8.4.47

### UI Components & Libraries
- **Icons**: Tabler Icons 2.47.0
- **Charts**: D3-force 3.0.0
- **Canvas**: Excalidraw 0.16.1, TLDraw (custom fork)
- **PDF**: PDF.js 4.2.67
- **Media**: PhotoSwipe 5.3.7, WaveSurfer.js 7.10.1

### Mobile-Specific
- **Safe Area**: @capacitor-community/safe-area
- **Native APIs**: Camera, Filesystem, Keyboard, Network, Haptics

## Build System

### ClojureScript Compilation
- **shadow-cljs.edn**: Main build configuration
- **Multiple Build Targets**: app, mobile, electron, workers
- **Module System**: ES6 modules with dynamic loading
- **Source Maps**: Development and production builds

### Asset Pipeline
- **CSS**: TailwindCSS → PostCSS → Minification
- **JavaScript**: Webpack bundling for non-CLJS assets
- **Static Assets**: Gulp pipeline for resource management

## Database & Storage
- **DataScript**: Graph-based in-memory database
- **Local Storage**: Browser APIs, Electron file system
- **Sync**: Custom implementation with encryption
- **Export**: Markdown, EDN, PDF formats

## Plugin Architecture
- **API Surface**: `/src/main/logseq/` contains plugin APIs
- **JavaScript Integration**: ClojureScript-to-JS bridge
- **Extension Points**: UI components, commands, hooks
- **Sandboxing**: Plugin isolation and security

## Development Environment
- **REPL**: nREPL integration on port 8701
- **Hot Reload**: Live code reloading in development
- **Testing**: Automated testing with Playwright
- **Linting**: ClojureScript and CSS linting tools

## Deployment Targets
- **Web**: Browser-based application
- **Desktop**: Electron app (Windows, macOS, Linux)
- **Mobile**: iOS and Android apps via Capacitor
- **Self-hosted**: Docker containerization support