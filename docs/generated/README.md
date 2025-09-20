# Logseq Developer Documentation

*Complete documentation for Logseq plugin and theme development*

## 📚 Documentation Overview

This directory contains auto-generated documentation extracted from the Logseq codebase to help plugin and theme developers.

## 🔌 Plugin Development

### API Reference
- **[Plugin API Reference](./plugin-api-reference.md)** - Complete TypeScript API documentation
- **[Plugin API Definitions JSON](./plugin-api-definitions.json)** - Machine-readable API definitions

### Key APIs
- **IAppProxy** - Application-level functionality
- **IEditorProxy** - Editor and block manipulation  
- **IDBProxy** - Database queries and operations
- **IUIProxy** - UI components and interactions

## 🎨 Theme Development

### CSS Reference
- **[CSS Variables Reference](./css-variables-reference.md)** - All customizable CSS variables
- **[CSS Classes Reference](./css-classes-reference.md)** - Complete class reference
- **[DOM Structure Reference](./dom-structure-reference.md)** - HTML structure and data attributes

### Development Guide
- **[Theme Development Guide](./theme-development-guide.md)** - Complete theme development guide

## 🛠 Development Tools

### Documentation Generation
This documentation is automatically generated using the following scripts:

```bash
# Generate all documentation
npm run docs:generate

# Generate API documentation only  
node scripts/generate-api-docs.js

# Generate CSS/DOM documentation only
node scripts/generate-css-docs.js
```

### Build Integration
Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "docs:generate": "node scripts/generate-all-docs.js",
    "docs:api": "node scripts/generate-api-docs.js", 
    "docs:css": "node scripts/generate-css-docs.js"
  }
}
```

## 📖 How to Use This Documentation

### For Plugin Developers
1. Start with the [Plugin API Reference](./plugin-api-reference.md)
2. Review the TypeScript interfaces for type safety
3. Check example usage in the main repository documentation

### For Theme Developers  
1. Begin with the [Theme Development Guide](./theme-development-guide.md)
2. Reference [CSS Variables](./css-variables-reference.md) for customization
3. Use [CSS Classes](./css-classes-reference.md) for specific styling

### For Contributors
1. Review the generation scripts in `scripts/`
2. Update the generators when new APIs are added
3. Regenerate documentation after code changes

## 🔄 Keeping Documentation Updated

This documentation should be regenerated when:
- New plugin APIs are added
- CSS structure changes  
- UI components are modified
- TypeScript interfaces are updated

Run `npm run docs:generate` to update all documentation.

---

*Last generated: 2025-09-20T09:26:41.213Z*
*Generated from Logseq codebase*
