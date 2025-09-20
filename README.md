# Logseq API Information

<p align="center">
    <a href="https://logseq.com" alt="Logseq Logo">
    <img src="https://user-images.githubusercontent.com/25513724/220608753-f33db466-af72-4611-b603-411440c15ed0.png?sanatize=true" height="120"/></a>
</p>

<h3 align="center">
    Developer Information Hub for Logseq Plugin & Theme Development
</h3>

<div align="center">
    <a href="https://logseq.com">Logseq Home</a> |
    <a href="https://docs.logseq.com/">Documentation</a> |
    <a href="https://plugins-doc.logseq.com/">Plugin API Docs</a> |
    <a href="https://github.com/logseq/logseq">Main Repository</a>
</div>
<br>

<p align="center">
    <a href="https://github.com/logseq/logseq" alt="Fork of">
        <img src="https://img.shields.io/badge/Fork%20of-logseq/logseq-blue?style=for-the-badge&logo=github"/></a>
    <a href="https://github.com/YU000jp/logseq-api-info/blob/master/LICENSE.md" alt="License">
        <img src="https://img.shields.io/github/license/YU000jp/logseq-api-info?color=%2385c8c8&style=for-the-badge"/></a>
</p>

## Table of Contents

* [🎯 Purpose](#-purpose)
* [🔌 Plugin Development](#-plugin-development)
* [🎨 Theme Development](#-theme-development)
* [📖 Repository Information](#-repository-information)
* [🚀 Getting Started](#-getting-started)
* [📚 Resources](#-resources)

## 🎯 Purpose

This repository serves as a comprehensive information hub for **Logseq plugin and theme developers**. Unlike the main Logseq repository which contains the application source code, this repository focuses on providing developers with:

- **Plugin API Analysis**: Detailed breakdown of Logseq's 200+ plugin APIs across 15 categories
- **DOM Structure Documentation**: Complete HTML/CSS architecture with 997+ classes and 71+ variables
- **Development Context**: Architecture patterns, conventions, and best practices from 3,000+ lines of API code
- **Code Examples**: Practical examples for common plugin development tasks
- **AI-Enhanced Documentation**: Leveraging AI tools to analyze and document Logseq's internals

### What Makes This Repository Different

- **Developer-Focused**: Specifically designed for extension developers with deep technical analysis
- **Living Documentation**: Continuously updated analysis of Logseq's codebase (80+ components, 25+ handlers)
- **AI-Assisted**: Uses Copilot and other AI tools for comprehensive codebase analysis
- **Community-Driven**: Contributions from the plugin development community
- **Multi-Modal Analysis**: Covers TypeScript SDK, ClojureScript APIs, CSS architecture, and DOM structure

### Technical Scope

Our analysis covers:
- **3,000+ lines** of ClojureScript Plugin API implementation
- **80+ React components** and their styling patterns
- **997+ CSS classes** and **71+ CSS variables** for theme development
- **25+ handler modules** for business logic integration
- **TypeScript SDK** with complete type definitions
- **Cross-platform architecture** (Desktop/Mobile/Web) patterns

### Comprehensive Analysis Deliverables

#### 📊 **Code Analysis Statistics**
- **API Coverage**: 200+ plugin methods across 15 functional categories
- **Component Analysis**: 80+ React components with architectural patterns
- **CSS Documentation**: 997+ classes, 71+ variables, 45+ CSS files analyzed
- **DOM Structure**: 109+ data attributes and complete HTML architecture
- **Type System**: 21 TypeScript interfaces, 6 type aliases, 9 classes

#### 📁 **Enhanced Documentation Structure**
- **API Reference**: Complete plugin API with usage examples and patterns
- **Architecture Guide**: Multi-layer application architecture analysis
- **CSS Framework**: Complete styling system with theme development guide
- **Development Context**: Coding patterns, conventions, and best practices
- **Cross-Platform Insights**: Desktop, mobile, and web deployment patterns

## 🔌 Plugin Development

### Plugin API Overview

Logseq provides a comprehensive **JavaScript/TypeScript API** for plugin developers. The API is exposed through the global `logseq` object and includes full TypeScript support with complete type definitions.

#### Core API Categories
- **Block Operations**: Create, read, update, and delete blocks
- **Page Management**: Page creation, navigation, and metadata
- **Database Queries**: DataScript queries for complex data retrieval
- **UI Integration**: Custom UI components and editor extensions
- **Event System**: React to application events and user interactions
- **File System**: Asset management and file operations
- **Settings & Config**: Plugin configuration and user preferences

#### TypeScript Plugin Development

**Full TypeScript Support**: This repository contains the complete TypeScript SDK (`libs/` directory) with:
- 📘 **Complete Type Definitions**: Full TypeScript interfaces and types (`libs/index.d.ts`)
- 🔧 **TypeScript Source**: Plugin API implementation in TypeScript (`libs/src/`)
- ⚙️ **Build Configuration**: Ready-to-use `tsconfig.json` and build scripts
- 🛠️ **Development Tools**: Debugging utilities and development helpers

#### Getting Started with TypeScript Plugin Development

```typescript
// TypeScript plugin structure with full type safety
import { LSPluginBaseInfo, BlockEntity } from '@logseq/libs'

const main = async () => {
  // Register a typed slash command
  logseq.Editor.registerSlashCommand('My Command', async () => {
    const block: BlockEntity | null = await logseq.Editor.getCurrentBlock();
    if (block) {
      await logseq.Editor.updateBlock(block.uuid, 'Hello from my TypeScript plugin!');
    }
  });
  
  // Register a UI component with type-safe options
  logseq.App.registerUIItem('toolbar', {
    key: 'my-plugin-button',
    template: `<button data-on-click="handleClick">My Plugin</button>`
  });
  
  // Type-safe event handling
  logseq.App.onMacroRendererSlotted(({ slot, payload }) => {
    console.log('Slot:', slot, 'Payload:', payload);
  });
}

// Initialize with error handling
logseq.ready(main).catch(console.error);
```

#### JavaScript Plugin Development

```javascript
// Basic JavaScript plugin structure
function main() {
  // Register a slash command
  logseq.Editor.registerSlashCommand('My Command', async () => {
    const block = await logseq.Editor.getCurrentBlock();
    if (block) {
      await logseq.Editor.updateBlock(block.uuid, 'Hello from my plugin!');
    }
  });
  
  // Register a UI component
  logseq.App.registerUIItem('toolbar', {
    key: 'my-plugin-button',
    template: `<button onclick="handleClick()">My Plugin</button>`
  });
}

// Initialize the plugin
logseq.ready(main).catch(console.error);
```

### Key Development Resources

- **TypeScript SDK**: Complete TypeScript support in `libs/` directory
  - 📘 **Type Definitions**: `libs/index.d.ts` - Complete API types
  - 🔧 **Source Code**: `libs/src/` - TypeScript implementation
  - ⚙️ **Configuration**: `libs/tsconfig.json` - TypeScript config
  - 📦 **Package**: `@logseq/libs` - NPM package for plugin development
- **API Documentation**: Available in `.copilot/api-info.md`
- **Code Examples**: Practical TypeScript and JavaScript examples throughout this repository
  - 📁 **`examples/typescript-plugins/`** - Complete TypeScript plugin examples
  - 🔰 **Basic Plugin** - Simple TypeScript plugin template
  - 🔍 **Database Query Plugin** - Advanced DataScript queries with types
- **Plugin Templates**: Starter templates for common plugin types
- **Development Tools**: Debugging and testing utilities

#### TypeScript Development Setup

1. **Install the SDK**:
   ```bash
   npm install @logseq/libs
   # or
   yarn add @logseq/libs
   ```

2. **TypeScript Configuration** (`tsconfig.json`):
   ```json
   {
     "compilerOptions": {
       "target": "ESNext",
       "module": "ESNext",
       "moduleResolution": "node",
       "allowJs": true,
       "jsx": "react",
       "declaration": true,
       "esModuleInterop": true,
       "skipLibCheck": true
     },
     "include": ["src/**/*.ts"]
   }
   ```

3. **Plugin Manifest** (`package.json`):
   ```json
   {
     "logseq": {
       "id": "your-plugin-id",
       "title": "Your Plugin Title",
       "main": "dist/index.js"
     },
     "main": "dist/index.js",
     "dependencies": {
       "@logseq/libs": "latest"
     }
   }
   ```

## 🎨 Theme Development

### CSS Architecture

Logseq uses **TailwindCSS** as its primary styling framework, providing:
- **Utility Classes**: Comprehensive set of utility classes
- **Custom Properties**: CSS variables for theme customization
- **Dark/Light Mode**: Built-in theme switching support
- **Component Styles**: Logseq-specific UI component classes

#### Theme Structure

```css
/* Main theme customization */
.light-theme, .dark-theme {
  /* Color scheme variables */
  --ls-primary-background-color: #ffffff;
  --ls-secondary-background-color: #f7f7f7;
  --ls-tertiary-background-color: #eeeeee;
  
  /* Text colors */
  --ls-primary-text-color: #433e38;
  --ls-secondary-text-color: #7c7c7c;
  
  /* Accent colors */
  --ls-active-primary-color: #045591;
  --ls-active-secondary-color: #866300;
}

/* Component-specific styling */
.block-content { /* Block styling */ }
.page-title { /* Page title styling */ }
.sidebar { /* Sidebar styling */ }
```

### Theme Development Workflow

1. **Analyze Existing Themes**: Study popular themes for patterns
2. **Identify CSS Classes**: Use browser devtools to understand structure
3. **Create Custom CSS**: Override default styles with your theme
4. **Test Across Modes**: Ensure compatibility with dark/light modes
5. **Package and Distribute**: Create theme package for marketplace

## 📖 Repository Information

This repository is a **specialized fork** of the main Logseq repository, focused exclusively on **developer education and API documentation**. 

### Key Differences from Main Repository

| Aspect | Main Repository | This Repository |
|--------|----------------|-----------------|
| **Purpose** | Application development | Developer documentation |
| **Content** | Source code (approx. 100K+ lines) | Analysis & guides (focused) |
| **Audience** | Core developers | Plugin & theme developers |
| **Updates** | Daily commits | Analysis-driven updates |
| **Documentation** | User-focused | Developer API-focused |

### Enhanced Documentation Structure

#### Analysis Documents (`.copilot/`)
- **`api-info.md`** - Comprehensive Plugin API analysis (3,000+ lines coverage)
- **`architecture-analysis.md`** - Complete application architecture breakdown
- **`html-css-structure.md`** - Detailed DOM and CSS analysis (997+ classes)
- **`development-context.md`** - Coding patterns and conventions
- **`directory-structure.md`** - File organization and module relationships

#### Generated Documentation (`docs/generated/`)
- **Plugin API Reference** - TypeScript definitions and usage examples
- **CSS Reference** - Complete class and variable documentation
- **Theme Development Guide** - Step-by-step theming instructions
- **DOM Structure Guide** - HTML architecture and data attributes

### Developer-Focused Features

#### API Coverage Analysis
- **200+ Plugin API methods** across 15 functional categories
- **TypeScript SDK** with complete type safety
- **Event system** with 60+ event types for plugin integration
- **UI slot system** with 20+ injection points

#### CSS Architecture Documentation
- **997+ CSS classes** systematically documented
- **71+ CSS custom properties** for theme customization
- **Component-specific styling** for 80+ UI components
- **Mobile-responsive patterns** and optimization strategies

#### Development Tools Integration
- **Automated documentation generation** with npm scripts
- **Real-time analysis updates** when codebase changes
- **Cross-platform build patterns** (Desktop/Mobile/Web)
- **Plugin development templates** and examples

### Key Directories for Developers

- **`src/main/logseq/`** - Plugin API implementation (3,000+ lines)
- **`src/main/frontend/`** - Core application code (80+ components, 25+ handlers)
- **`deps/`** - Modular libraries and utilities (9 specialized packages)
- **`packages/`** - UI components and frameworks (shadcn-based UI system)
- **`.copilot/`** - **Enhanced**: Developer-focused documentation and analysis
- **`libs/`** - TypeScript Plugin SDK with complete type definitions

### Technology Stack Deep Dive

- **Frontend**: ClojureScript (90%) + React 18.3.1 (via Rum)
- **Database**: DataScript (in-memory graph database) + Optional SQLite
- **Styling**: TailwindCSS 3.3.5 + PostCSS + 45+ CSS files
- **Desktop**: Electron with native OS integration
- **Mobile**: Capacitor 7.2.0 for iOS/Android
- **Build**: Shadow-cljs 2.28.23 + Webpack 5.98.0 + Gulp pipeline
- **Plugin System**: TypeScript SDK + ClojureScript runtime

## 🚀 Getting Started

### For Plugin Developers

1. **Study the Comprehensive API Analysis**: 
   - Review `.copilot/api-info.md` for detailed API documentation (200+ methods analyzed)
   - Check `.copilot/architecture-analysis.md` for application architecture insights
   - Use `docs/generated/plugin-api-reference.md` for TypeScript definitions

2. **Choose Your Development Approach**: 
   - **TypeScript**: Use with full type safety
   - **JavaScript**: Use for simplicity
   - **ClojureScript**: Integrate directly with the core API (advanced developers)

3. **Set Up Your Environment**: 
   - Install `@logseq/libs` for TypeScript support and API access
   - Configure TypeScript with provided configurations
   - Set up development tools and hot reload

4. **Explore Integration Points**: 
   - Study 15 API categories (Database, UI, File System, Search, etc.)
   - Review 60+ event types for plugin integration
   - Examine 20+ UI injection slots for custom interfaces

5. **Join the Development Community**: 
   - Connect with other developers on Discord
   - Contribute to plugin marketplace
   - Share your plugins and get feedback

### For Theme Developers

1. **Understand the CSS Architecture**: 
   - Review `.copilot/html-css-structure.md` for complete DOM/CSS analysis
   - Study 997+ documented CSS classes and their usage
   - Learn about 71+ CSS custom properties for customization

2. **Analyze the Theme System**: 
   - Examine existing themes for patterns and inspiration
   - Understand dark/light mode switching mechanisms
   - Learn responsive design patterns for mobile compatibility

3. **Use Development Tools**: 
   - Inspect Logseq's DOM structure with browser devtools
   - Use generated CSS documentation as a reference
   - Test themes across different platforms (Desktop/Mobile/Web)

4. **Create and Test Your Theme**: 
   - Override default CSS with your custom styles
   - Use CSS custom properties for maintainable themes
   - Test accessibility and responsiveness

5. **Share Your Work**: 
   - Package themes for the marketplace
   - Document theme features and installation
   - Contribute to the community theme gallery

### For Contributors and Analysts

1. **Explore the Enhanced Analysis**: 
   - Study `.copilot/architecture-analysis.md` for system architecture
   - Review development patterns in `.copilot/development-context.md`
   - Understand the codebase structure via `.copilot/directory-structure.md`

2. **Update Documentation**: 
   - Run `npm run docs:generate` to regenerate documentation
   - Add new analysis when significant changes occur
   - Contribute improvements to analysis scripts

3. **Contribute Analysis**: 
   - Enhance existing analysis documents
   - Add new technical insights and patterns
   - Update documentation generation scripts

4. **Share Knowledge**: 
   - Write tutorials and guides based on the analysis
   - Help other developers understand Logseq's architecture
   - Contribute to the developer community resources
2. **Understand Architecture**: Review technology stack and patterns
3. **Make Contributions**: Add examples, documentation, or analysis
4. **Share Knowledge**: Help other developers in the community

## 📚 Resources

### Official Resources
- **[Logseq Main Repository](https://github.com/logseq/logseq)** - Main application source code
- **[Plugin API Documentation](https://plugins-doc.logseq.com/)** - Official API documentation
- **[Logseq Documentation](https://docs.logseq.com/)** - User documentation and guides
- **[Awesome Logseq](https://github.com/logseq/awesome-logseq)** - Community extensions and resources

### Community Resources
- **[Discord](https://discord.gg/KpN4eHY)** - Join the community chat
- **[Forum](https://discuss.logseq.com/)** - Community discussions and support

### Developer Tools & Templates
- **[@logseq/libs](https://www.npmjs.com/package/@logseq/libs)** - TypeScript SDK package on NPM
- **[Plugin Samples](https://github.com/logseq/logseq-plugin-samples)** - Example plugins and code samples

---

*This repository is maintained as a community resource for Logseq developers. For the main Logseq application, please visit [logseq/logseq](https://github.com/logseq/logseq).*

