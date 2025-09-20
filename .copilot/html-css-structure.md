# Logseq HTML, CSS, and DOM Structure Analysis

## HTML Architecture

### Core HTML Template (`resources/index.html`)
The main HTML template provides the foundation for the Logseq application:

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Meta and viewport settings for responsive design -->
  <meta charset="utf-8">
  <meta content="minimum-scale=1, initial-scale=1, maximum-scale=1, width=device-width, shrink-to-fit=no" name="viewport">
  
  <!-- Core CSS and branding -->
  <link href="./css/style.css" rel="stylesheet" type="text/css">
  <link href="./img/logo.png" rel="shortcut icon" type="image/png">
  
  <!-- PWA and mobile app support -->
  <meta content="yes" name="apple-mobile-web-app-capable">
  <meta content="black-translucent" name="apple-mobile-web-app-status-bar-style">
  
  <!-- Social media meta tags -->
  <meta property="og:title" content="A privacy-first platform for knowledge management">
  <meta name="twitter:card" content="summary">
</head>
<body>
  <!-- React root container -->
  <div id="root"></div>
  
  <!-- Global configuration -->
  <script>window.__LSP__HOST__ = true</script>
  <script>window.EXCALIDRAW_ASSET_PATH = "./js/";</script>
  
  <!-- Core JavaScript libraries -->
  <script src="./js/magic_portal.js"></script>
  <script defer src="./js/highlight.min.js"></script>
  <script defer src="./js/pdfjs/pdf.mjs"></script>
  <script defer src="./js/lsplugin.core.js"></script>
  <script defer src="./js/react.production.min.js"></script>
</body>
</html>
```

### Application Structure
- **Single Page Application**: React renders everything into `#root`
- **Progressive Web App**: Full PWA support with manifest and service worker
- **Mobile Ready**: Native mobile app capabilities through Capacitor
- **Plugin System**: `lsplugin.core.js` provides plugin execution environment

## CSS Architecture

### CSS File Organization (45+ CSS files)

#### Core Styling Files
1. **`tailwind.all.css`** - Main TailwindCSS configuration and utilities
2. **`src/main/frontend/common.css`** - Base styles and global resets (123 classes, 1 variable)
3. **`src/main/frontend/animations.css`** - Animation definitions (11 classes)
4. **`src/main/frontend/ui.css`** - Core UI components (51 classes, 2 variables)

#### Component-Specific CSS (30+ files)
- **Block System**: `components/block.css` (179 classes) - Core block styling
- **Editor**: `components/editor.css` (18 classes) - Text editor interface
- **Header**: `components/header.css` (45 classes, 12 variables) - Top navigation
- **Container**: `components/container.css` (93 classes) - Layout containers
- **Plugins**: `components/plugins.css` (116 classes, 1 variable) - Plugin UI
- **Settings**: `components/settings.css` (57 classes) - Configuration panels
- **Whiteboard**: `components/whiteboard.css` (42 classes) - Canvas drawing
- **Properties**: `components/property.css` (84 classes) - Block properties

#### Extension CSS (10+ files)
- **PDF Viewer**: `extensions/pdf/pdf.css` (80 classes, 9 variables)
- **Code Highlighting**: `extensions/highlight.css` (38 classes)
- **Handbooks**: `extensions/handbooks/handbooks.css` (38 classes, 4 variables)
- **Graph View**: `extensions/graph.css` (1 class)
- **Zotero Integration**: `extensions/zotero.css` (13 classes)

### CSS Architecture Patterns

#### TailwindCSS Integration
```css
/* Utility-first approach with custom components */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Custom component layer */
@layer components {
  .ls-block {
    @apply relative flex flex-col;
  }
}
```

#### CSS Custom Properties (71+ variables)
```css
:root {
  /* Color system */
  --ls-primary-background-color: #fff;
  --ls-secondary-background-color: #f7f7f7;
  --ls-tertiary-background-color: #f0f0f0;
  
  /* Typography */
  --ls-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI';
  --ls-font-size: 14px;
  --ls-line-height: 1.5;
  
  /* Layout */
  --ls-left-sidebar-width: 240px;
  --ls-right-sidebar-width: 320px;
  --ls-main-content-max-width: 900px;
  
  /* Component-specific */
  --ls-block-bullet-color: #b8bcc8;
  --ls-block-properties-background-color: #f7f7f7;
  --ls-header-height: 48px;
}
```

## DOM Structure Analysis

### Core DOM Architecture

#### Application Root Structure
```html
<div id="root">
  <div class="cp__root">
    <!-- Main application container -->
    <div class="left-sidebar">
      <!-- Navigation and page tree -->
    </div>
    
    <div class="main-content-container">
      <!-- Primary content area -->
      <div class="cp__header">
        <!-- Top navigation bar -->
      </div>
      
      <div class="cp__main-content">
        <!-- Page content and blocks -->
      </div>
    </div>
    
    <div class="right-sidebar">
      <!-- Contextual panels and references -->
    </div>
  </div>
</div>
```

#### Block System DOM Structure
```html
<div class="ls-block" data-refs-self="[[block-uuid]]">
  <div class="block-control-wrap">
    <div class="block-control">
      <span class="bullet-container">
        <span class="bullet"></span>
      </span>
    </div>
  </div>
  
  <div class="block-content-wrapper">
    <div class="block-content" contenteditable="true">
      <!-- Block text content -->
    </div>
    
    <div class="block-properties">
      <!-- Block properties and metadata -->
    </div>
  </div>
  
  <div class="block-children">
    <!-- Nested child blocks -->
  </div>
</div>
```

### Data Attributes System (109+ attributes)

#### Block Identification
- `data-refs-self` - Block UUID reference
- `data-block-id` - Internal block ID
- `data-page-id` - Parent page ID
- `data-block-type` - Block type (normal, whiteboard, etc.)

#### UI State Attributes
- `data-collapsed` - Block collapse state
- `data-selected` - Selection state
- `data-edit-mode` - Editing mode indicator
- `data-highlighted` - Search highlight state

#### Plugin Integration
- `data-plugin-id` - Plugin owner identification
- `data-slot-id` - Plugin UI slot identifier
- `data-macro-name` - Macro block identification

### Component Class System (997+ classes)

#### Layout Classes
```css
/* Main layout */
.cp__root { /* Root application container */ }
.cp__header { /* Top navigation */ }
.cp__sidebar-main-layout { /* Main layout grid */ }
.cp__main { /* Primary content area */ }

/* Sidebars */
.left-sidebar { /* Left navigation panel */ }
.right-sidebar { /* Right contextual panel */ }
.sidebar-item { /* Sidebar navigation items */ }
```

#### Block System Classes
```css
/* Block structure */
.ls-block { /* Individual block container */ }
.block-content { /* Editable block content */ }
.block-properties { /* Block metadata */ }
.block-children { /* Nested blocks */ }

/* Block controls */
.block-control { /* Block manipulation controls */ }
.bullet-container { /* Block bullet/marker */ }
.block-left-menu { /* Block context menu */ }
```

#### Editor Classes
```css
/* Editor interface */
.editor-wrapper { /* Editor container */ }
.editor-inner { /* Editor content area */ }
.CodeMirror { /* Code editor (for code blocks) */ }

/* Selection and highlighting */
.selected { /* Selected content */ }
.highlighted { /* Search/reference highlights */ }
.cursor-element { /* Text cursor position */ }
```

### Theme System

#### Dark/Light Mode Support
```css
html[data-theme="dark"] {
  --ls-primary-background-color: #002b36;
  --ls-secondary-background-color: #073642;
  --ls-primary-text-color: #839496;
}

html[data-theme="light"] {
  --ls-primary-background-color: #ffffff;
  --ls-secondary-background-color: #f7f7f7;
  --ls-primary-text-color: #333333;
}
```

#### Custom Theme Support
- Themes can override any CSS custom property
- Plugin themes inject additional CSS rules
- Theme marketplace integration for community themes

### Mobile-Specific Structure

#### Mobile CSS (`src/main/frontend/mobile/index.css`)
```css
/* Mobile-optimized layouts */
.mobile .left-sidebar { transform: translateX(-100%); }
.mobile .cp__header { height: 60px; /* Larger touch targets */ }
.mobile .block-content { font-size: 16px; /* Prevent zoom */ }

/* Touch interaction optimizations */
.mobile .bullet-container { 
  min-width: 44px; /* iOS touch target size */
  min-height: 44px;
}
```

## Plugin Integration Points

### UI Injection Slots
1. **Toolbar Slots**: Header and editor toolbar integration
2. **Sidebar Slots**: Left and right sidebar panels
3. **Block Slots**: Block-level UI components
4. **Modal Slots**: Overlay and dialog integration
5. **Settings Slots**: Configuration panel integration

### CSS Override System
```javascript
// Plugin CSS injection
logseq.provideStyle(`
  .my-plugin-class {
    background: var(--ls-primary-background-color);
    color: var(--ls-primary-text-color);
  }
`)
```

### DOM Manipulation Guidelines
- Use data attributes for plugin-specific state
- Respect existing class hierarchies
- Maintain accessibility attributes
- Follow responsive design patterns

## Performance Considerations

### CSS Optimization
- TailwindCSS purges unused styles in production
- Component-scoped CSS reduces global scope pollution
- CSS custom properties enable efficient theme switching
- Critical CSS inlined for faster initial render

### DOM Optimization
- Virtual scrolling for large page lists
- React.memo for component render optimization
- Efficient block tree rendering with keys
- Lazy loading for non-visible content areas

## Development Tools Integration

### CSS Development
- PostCSS pipeline for CSS processing
- Autoprefixer for browser compatibility
- CSSnano for production minification
- Stylelint for code quality

### DOM Debugging
- React DevTools integration
- Data attribute inspection tools
- CSS custom property debugging
- Plugin sandbox isolation debugging

## Accessibility Features

### ARIA Support
```html
<div class="ls-block" 
     role="article" 
     aria-label="Block content"
     aria-describedby="block-properties">
  <!-- Block content -->
</div>
```

### Keyboard Navigation
- Tab navigation through blocks
- Arrow key block navigation
- Keyboard shortcuts for common actions
- Focus management for modal dialogs

### Screen Reader Support
- Semantic HTML structure
- ARIA landmarks and roles
- Alternative text for images
- Accessible form controls

This comprehensive analysis provides theme and plugin developers with detailed insights into Logseq's HTML, CSS, and DOM architecture for effective customization and extension development.