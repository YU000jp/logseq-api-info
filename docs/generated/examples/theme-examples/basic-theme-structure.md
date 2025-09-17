# Basic Theme Structure Example

A complete example of a Logseq theme with modern CSS practices and full dark/light mode support.

## Project Structure

```
my-logseq-theme/
├── custom.css
├── package.json
├── preview.png
└── README.md
```

## Theme Code

### custom.css

```css
/**
 * My Custom Logseq Theme
 * A modern theme with clean design and great readability
 */

/* ==========================================
   CSS Variables - Theme Customization
   ========================================== */

:root {
  /* Color Palette */
  --theme-primary: #0066cc;
  --theme-secondary: #6366f1;
  --theme-accent: #10b981;
  --theme-warning: #f59e0b;
  --theme-error: #ef4444;
  
  /* Spacing */
  --theme-spacing-xs: 0.25rem;
  --theme-spacing-sm: 0.5rem;
  --theme-spacing-md: 1rem;
  --theme-spacing-lg: 1.5rem;
  --theme-spacing-xl: 2rem;
  
  /* Border Radius */
  --theme-radius-sm: 0.375rem;
  --theme-radius-md: 0.5rem;
  --theme-radius-lg: 0.75rem;
  
  /* Typography */
  --theme-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --theme-font-mono: 'SF Mono', Monaco, 'Cascadia Code', monospace;
}

/* ==========================================
   Light Theme Variables
   ========================================== */

.white-theme, html[data-theme="light"] {
  /* Background Colors */
  --ls-primary-background-color: #ffffff;
  --ls-secondary-background-color: #f8fafc;
  --ls-tertiary-background-color: #f1f5f9;
  --ls-quaternary-background-color: #e2e8f0;
  
  /* Text Colors */
  --ls-primary-text-color: #1e293b;
  --ls-secondary-text-color: #475569;
  --ls-tertiary-text-color: #64748b;
  
  /* Border Colors */
  --ls-border-color: #e2e8f0;
  --ls-secondary-border-color: #cbd5e1;
  
  /* Active/Accent Colors */
  --ls-active-primary-color: var(--theme-primary);
  --ls-active-secondary-color: var(--theme-secondary);
  
  /* Link Colors */
  --ls-link-text-color: var(--theme-primary);
  --ls-link-text-hover-color: var(--theme-secondary);
  
  /* Code Colors */
  --ls-page-inline-code-bg-color: #f1f5f9;
  --ls-page-inline-code-color: #e11d48;
  
  /* Block Colors */
  --ls-block-bullet-color: var(--theme-primary);
  --ls-block-bullet-active-color: var(--theme-secondary);
  
  /* Selection */
  --ls-selection-background-color: rgba(99, 102, 241, 0.1);
}

/* ==========================================
   Dark Theme Variables
   ========================================== */

.dark-theme, html[data-theme="dark"] {
  /* Background Colors */
  --ls-primary-background-color: #0f172a;
  --ls-secondary-background-color: #1e293b;
  --ls-tertiary-background-color: #334155;
  --ls-quaternary-background-color: #475569;
  
  /* Text Colors */
  --ls-primary-text-color: #f8fafc;
  --ls-secondary-text-color: #cbd5e1;
  --ls-tertiary-text-color: #94a3b8;
  
  /* Border Colors */
  --ls-border-color: #334155;
  --ls-secondary-border-color: #475569;
  
  /* Active/Accent Colors */
  --ls-active-primary-color: #3b82f6;
  --ls-active-secondary-color: #8b5cf6;
  
  /* Link Colors */
  --ls-link-text-color: #60a5fa;
  --ls-link-text-hover-color: #a78bfa;
  
  /* Code Colors */
  --ls-page-inline-code-bg-color: #334155;
  --ls-page-inline-code-color: #fbbf24;
  
  /* Block Colors */
  --ls-block-bullet-color: #3b82f6;
  --ls-block-bullet-active-color: #8b5cf6;
  
  /* Selection */
  --ls-selection-background-color: rgba(59, 130, 246, 0.2);
}

/* ==========================================
   Global Styles
   ========================================== */

/* Typography */
.cp__root {
  font-family: var(--theme-font-family);
  line-height: 1.6;
}

/* Code Typography */
.CodeMirror,
code,
kbd,
pre,
samp {
  font-family: var(--theme-font-mono);
}

/* Smooth Scrolling */
html {
  scroll-behavior: smooth;
}

/* ==========================================
   Block Styles
   ========================================== */

/* Block Content */
.block-content {
  border-radius: var(--theme-radius-sm);
  transition: all 0.2s ease;
}

.block-content:hover {
  background-color: var(--ls-tertiary-background-color);
}

/* Block Bullets */
.ls-block .block-bullet {
  background-color: var(--ls-block-bullet-color);
  border-radius: 50%;
  transition: all 0.2s ease;
}

.ls-block .block-bullet:hover {
  background-color: var(--ls-block-bullet-active-color);
  transform: scale(1.1);
}

/* Block References */
.block-ref {
  background-color: var(--ls-quaternary-background-color);
  border-left: 3px solid var(--ls-active-primary-color);
  border-radius: var(--theme-radius-sm);
  padding: var(--theme-spacing-sm) var(--theme-spacing-md);
  transition: all 0.2s ease;
}

.block-ref:hover {
  border-left-color: var(--ls-active-secondary-color);
  background-color: var(--ls-tertiary-background-color);
}

/* ==========================================
   Page Styles
   ========================================== */

/* Page Title */
.page-title {
  font-weight: 700;
  font-size: 2.25rem;
  color: var(--ls-primary-text-color);
  margin-bottom: var(--theme-spacing-lg);
}

/* Page Content */
.page {
  max-width: none;
  padding: var(--theme-spacing-lg);
}

/* ==========================================
   Sidebar Styles
   ========================================== */

/* Left Sidebar */
.left-sidebar {
  background-color: var(--ls-secondary-background-color);
  border-right: 1px solid var(--ls-border-color);
}

/* Sidebar Navigation */
.left-sidebar .nav-header {
  font-weight: 600;
  color: var(--ls-primary-text-color);
  margin-bottom: var(--theme-spacing-sm);
}

.left-sidebar .nav-content-item {
  border-radius: var(--theme-radius-sm);
  margin-bottom: var(--theme-spacing-xs);
  transition: all 0.2s ease;
}

.left-sidebar .nav-content-item:hover {
  background-color: var(--ls-tertiary-background-color);
}

/* Right Sidebar */
.right-sidebar {
  background-color: var(--ls-secondary-background-color);
  border-left: 1px solid var(--ls-border-color);
}

/* ==========================================
   Editor Styles
   ========================================== */

/* Editor Container */
.editor-wrapper {
  background-color: var(--ls-primary-background-color);
  border-radius: var(--theme-radius-md);
  border: 1px solid var(--ls-border-color);
}

/* Code Mirror */
.CodeMirror {
  background-color: var(--ls-secondary-background-color);
  border-radius: var(--theme-radius-sm);
  border: 1px solid var(--ls-border-color);
}

.CodeMirror-focused {
  border-color: var(--ls-active-primary-color);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

/* ==========================================
   Component Styles
   ========================================== */

/* Buttons */
.ui__button {
  border-radius: var(--theme-radius-sm);
  font-weight: 500;
  transition: all 0.2s ease;
}

.ui__button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Cards */
.block-body,
.cp__sidebar-main-content,
.references {
  background-color: var(--ls-primary-background-color);
  border-radius: var(--theme-radius-lg);
  border: 1px solid var(--ls-border-color);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Tables */
table {
  border-radius: var(--theme-radius-md);
  overflow: hidden;
  border: 1px solid var(--ls-border-color);
}

table th {
  background-color: var(--ls-secondary-background-color);
  font-weight: 600;
}

table td,
table th {
  padding: var(--theme-spacing-sm) var(--theme-spacing-md);
  border-bottom: 1px solid var(--ls-border-color);
}

/* ==========================================
   Plugin Styles
   ========================================== */

/* Plugin Container */
.extensions__code {
  border-radius: var(--theme-radius-md);
  border: 1px solid var(--ls-border-color);
}

/* Plugin Toolbar */
.extensions__code-lang {
  background-color: var(--ls-secondary-background-color);
  border-bottom: 1px solid var(--ls-border-color);
  border-radius: var(--theme-radius-sm) var(--theme-radius-sm) 0 0;
}

/* ==========================================
   Utility Classes
   ========================================== */

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}

/* Focus Styles */
.focus-visible {
  outline: 2px solid var(--ls-active-primary-color);
  outline-offset: 2px;
}

/* Scrollbar Customization */
.cp__right-sidebar::-webkit-scrollbar,
.cp__sidebar-main-content::-webkit-scrollbar {
  width: 6px;
}

.cp__right-sidebar::-webkit-scrollbar-thumb,
.cp__sidebar-main-content::-webkit-scrollbar-thumb {
  background-color: var(--ls-tertiary-text-color);
  border-radius: 3px;
}

.cp__right-sidebar::-webkit-scrollbar-thumb:hover,
.cp__sidebar-main-content::-webkit-scrollbar-thumb:hover {
  background-color: var(--ls-secondary-text-color);
}

/* ==========================================
   Responsive Design
   ========================================== */

@media (max-width: 768px) {
  .page-title {
    font-size: 1.875rem;
  }
  
  .page {
    padding: var(--theme-spacing-md);
  }
  
  .block-content {
    padding: var(--theme-spacing-sm);
  }
}

/* ==========================================
   Print Styles
   ========================================== */

@media print {
  .left-sidebar,
  .right-sidebar,
  .cp__header {
    display: none !important;
  }
  
  .cp__sidebar-main-content {
    margin: 0 !important;
    box-shadow: none !important;
    border: none !important;
  }
}
```

### package.json

```json
{
  "name": "my-custom-logseq-theme",
  "version": "1.0.0",
  "description": "A clean and modern theme for Logseq",
  "keywords": ["logseq", "theme", "dark", "light"],
  "author": "Your Name",
  "license": "MIT",
  "logseq": {
    "id": "my-custom-theme",
    "title": "My Custom Theme",
    "description": "A clean and modern theme with great readability",
    "main": "custom.css",
    "supports": ["dark", "light"]
  }
}
```

## Installation

1. **Download Theme**
   - Copy the `custom.css` file
   - Or clone/download the entire theme directory

2. **Install in Logseq**
   - Place in your Logseq `themes` directory
   - Or go to Settings → Themes → Install
   - Select the theme folder

3. **Activate Theme**
   - Go to Settings → Themes
   - Select "My Custom Theme" from the list
   - The theme will apply immediately

## Customization

### Color Scheme
Modify the CSS variables at the top of the file:

```css
:root {
  --theme-primary: #your-primary-color;
  --theme-secondary: #your-secondary-color;
  /* ... other variables */
}
```

### Typography
Change font families:

```css
:root {
  --theme-font-family: 'Your Font', sans-serif;
  --theme-font-mono: 'Your Mono Font', monospace;
}
```

### Spacing and Layout
Adjust spacing variables:

```css
:root {
  --theme-spacing-md: 1.5rem; /* Increase base spacing */
  --theme-radius-md: 1rem;     /* More rounded corners */
}
```

## Features

- ✅ **Dual Mode Support** - Perfect dark and light themes
- ✅ **Modern Design** - Clean, minimal aesthetic
- ✅ **Great Typography** - Optimized for readability
- ✅ **Smooth Animations** - Subtle transitions and effects
- ✅ **Responsive Design** - Works on all screen sizes
- ✅ **Print Friendly** - Optimized for printing
- ✅ **Customizable** - Easy to modify with CSS variables
- ✅ **Plugin Compatible** - Works with popular plugins

## Advanced Customization

### Adding Custom Components

```css
/* Custom highlight style */
.my-highlight {
  background: linear-gradient(120deg, #a8edea 0%, #fed6e3 100%);
  padding: 2px 4px;
  border-radius: 3px;
}

/* Custom block style */
.my-custom-block {
  border-left: 4px solid var(--theme-accent);
  background-color: var(--ls-tertiary-background-color);
  padding: var(--theme-spacing-md);
  margin: var(--theme-spacing-sm) 0;
}
```

### Theme Variants
Create theme variants by overriding specific variables:

```css
/* Warm variant */
.warm-variant {
  --theme-primary: #f59e0b;
  --theme-secondary: #d97706;
}

/* Cool variant */
.cool-variant {
  --theme-primary: #0ea5e9;
  --theme-secondary: #0284c7;
}
```

## Resources

- [CSS Variables Reference](../css-variables-reference.md)
- [CSS Classes Reference](../css-classes-reference.md)
- [Theme Development Guide](../theme-development-guide.md)

## Contributing

1. Fork the theme repository
2. Make your improvements
3. Test in both light and dark modes
4. Submit a pull request

---

*This theme demonstrates modern CSS practices and full Logseq integration. Customize it to match your preferences!*