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

- **Plugin API Analysis**: Detailed breakdown of Logseq's plugin API surface
- **DOM Structure Documentation**: UI elements and CSS classes for theme development  
- **Development Context**: Architecture patterns, conventions, and best practices
- **Code Examples**: Practical examples for common plugin development tasks
- **AI-Enhanced Documentation**: Leveraging AI tools to analyze and document Logseq's internals

### What Makes This Repository Different

- **Developer-Focused**: Specifically designed for extension developers
- **Living Documentation**: Continuously updated analysis of Logseq's codebase
- **AI-Assisted**: Uses Copilot and other AI tools for comprehensive analysis
- **Community-Driven**: Contributions from the plugin development community

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

### Repository Structure

This is a **fork** of the main [logseq/logseq](https://github.com/logseq/logseq) repository, containing:

- **Full Source Code**: Complete Logseq application source
- **Analysis Documentation**: In the `.copilot/` directory
- **Developer Resources**: Examples, guides, and references
- **Community Contributions**: Plugin development resources

### Key Directories for Developers

- **`src/main/logseq/`** - Plugin API implementation
- **`src/main/frontend/`** - Core application code
- **`deps/`** - Modular libraries and utilities
- **`packages/`** - UI components and frameworks
- **`.copilot/`** - Developer-focused documentation and analysis

### Technology Stack

- **Frontend**: ClojureScript + React (via Rum)
- **Database**: DataScript (graph database)
- **Styling**: TailwindCSS + PostCSS
- **Desktop**: Electron
- **Mobile**: Capacitor
- **Build**: Shadow-cljs + Webpack

## 🚀 Getting Started

### For Plugin Developers

1. **Study the API**: Review `.copilot/api-info.md` for comprehensive API documentation
2. **Choose Your Language**: 
   - **TypeScript**: Use the [TypeScript template](https://github.com/logseq/logseq-plugin-template-typescript) for type safety
   - **JavaScript**: Use the [JavaScript template](https://github.com/logseq/logseq-plugin-template) for simplicity
3. **Install Dependencies**: Add `@logseq/libs` for TypeScript support or API access
4. **Explore Examples**: Look at plugin examples in the community and `libs/src/` directory
5. **Join the Community**: Connect with other developers on Discord

### For Theme Developers

1. **Understand CSS Structure**: Review `.copilot/development-context.md`
2. **Analyze Existing Themes**: Study popular themes for inspiration
3. **Use Developer Tools**: Inspect Logseq's DOM structure
4. **Create Custom Styles**: Override default CSS with your theme

### For Contributors

1. **Explore the Codebase**: Use the documentation in `.copilot/` directory
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
- **[Plugin Marketplace](https://github.com/logseq/marketplace)** - Browse and submit plugins
- **[Theme Gallery](https://github.com/logseq/awesome-logseq#-themes)** - Community themes

### Developer Tools & Templates
- **[Plugin Template (JavaScript)](https://github.com/logseq/logseq-plugin-template)** - Official JavaScript plugin starter template
- **[TypeScript Plugin Template](https://github.com/logseq/logseq-plugin-template-typescript)** - Official TypeScript plugin template
- **[Plugin SDK](https://github.com/logseq/logseq-plugin-sdk)** - Development tools and utilities
- **[Vite Plugin Template](https://github.com/logseq/vite-plugin-template)** - Modern plugin development template with Vite
- **[@logseq/libs](https://www.npmjs.com/package/@logseq/libs)** - TypeScript SDK package on NPM
- **[Plugin Samples](https://github.com/logseq/logseq-plugin-samples)** - Example plugins and code samples

---

*This repository is maintained as a community resource for Logseq developers. For the main Logseq application, please visit [logseq/logseq](https://github.com/logseq/logseq).*

