# Logseq Theme Development Guide

*Complete guide for developing Logseq themes*

## Introduction

This guide covers everything you need to know about developing themes for Logseq, including the CSS architecture, available classes, variables, and best practices.

## CSS Architecture

Logseq uses a modern CSS architecture built on:

- **TailwindCSS**: Utility-first CSS framework
- **CSS Custom Properties**: For theme customization
- **PostCSS**: For processing and optimization
- **Component-based Structure**: Organized by UI components

## Theme Customization Variables

Logseq provides extensive CSS custom properties for theme customization:

### Color Variables

```css
:root {
  --ls-color-file-sync-error: var(--color-red-600);
  --ls-color-file-sync-pending: var(--color-yellow-600);
  --ls-color-file-sync-idle: var(--color-green-600);
  --ls-color-icon-preset: "inherit";
  --ls-page-inline-code-bg-color: var(--ls-quaternary-background-color);
  --ls-page-blockquote-bg-color: var(--ls-quaternary-background-color);
  --left-sidebar-bg-color: var(--lx-gray-02, var(--ls-secondary-background-color, hsl(var(--secondary, var(--rx-gray-03-hsl)))));
  --amplify-components-authenticator-router-background-color: var(--ls-primary-background-color);
  --amplify-components-field-label-color: var(--ls-primary-text-color);
  --amplify-components-authenticator-router-border-color: var(--ls-border-color);
  /* ... and 31 more color variables */
}
```

### Typography Variables

```css
:root {
  --amplify-components-textfield-border-color: var(--ls-border-color);
  --amplify-components-text-color: var(--ls-primary-text-color);
  --amplify-components-textfield-color: var(--ls-primary-text-color);
}
```

## Component Classes

### Core Components
- `.ls-center`
- `.ls-page-title-container`
- `.ls-table-cell`
- `.ls-grid-cols`
- `.ls-cards`
- `.ls-card-item`
- `.ls-page-title-actions`
- `.ls-block`
- `.ls-block-right`
- `.ls-properties-area`
- `.ls-card`
- `.cp__fenced-code-block`
- `.cp__right-sidebar-inner`
- `.ls-page-title`
- `.ls-code-editor-wrap`
- `.ls-resize-image`
- `.ls-filters`
- `.ls-dialog-block`
- `.cp__bug-report-reporter`
- `.cp__bug-report-item-button`

### Block and Page Components
- `.page-drop-options`
- `.block-title-wrap`
- `.block-content-wrapper`
- `.block-content`
- `.block-content-or-editor-wrap`
- `.block-content-or-editor-inner`
- `.block-head-wrap`
- `.page-ref`
- `.block-parents`
- `.block-body`
- `.block-children-container`
- `.block-children-left-border`
- `.block-children`
- `.block-control-wrap`
- `.block-control`


## Theme Structure Example

```css
/* Custom theme for Logseq */

/* Color scheme customization */
:root {
  /* Background colors */
  --ls-primary-background-color: #ffffff;
  --ls-secondary-background-color: #f8f9fa;
  
  /* Text colors */
  --ls-primary-text-color: #212529;
  --ls-secondary-text-color: #6c757d;
  
  /* Accent colors */
  --ls-active-primary-color: #0d6efd;
  --ls-active-secondary-color: #6610f2;
}

/* Dark theme overrides */
.dark-theme {
  --ls-primary-background-color: #1a1a1a;
  --ls-secondary-background-color: #2d2d2d;
  --ls-primary-text-color: #ffffff;
  --ls-secondary-text-color: #cccccc;
}

/* Component customization */
.block-content {
  /* Custom block styling */
  border-radius: 0.5rem;
  padding: 0.75rem;
}

.page-title {
  /* Custom page title styling */
  font-weight: 700;
  font-size: 2rem;
}
```

## Best Practices

1. **Use CSS Custom Properties**: Always use the provided CSS variables for consistency
2. **Respect Dark/Light Modes**: Ensure your theme works in both modes
3. **Test Thoroughly**: Test your theme across different components and views
4. **Keep Specificity Low**: Use specific selectors only when necessary
5. **Follow Naming Conventions**: Use the established naming patterns

## Development Workflow

1. **Study Existing Themes**: Analyze popular themes for inspiration
2. **Use Browser DevTools**: Inspect elements to understand the structure
3. **Start with Variables**: Begin by customizing CSS custom properties
4. **Iterate and Test**: Make incremental changes and test frequently
5. **Document Changes**: Keep track of your customizations

## Resources

- [CSS Variables Reference](./css-variables-reference.md)
- [CSS Classes Reference](./css-classes-reference.md)
- [DOM Structure Reference](./dom-structure-reference.md)
- [Plugin API Reference](./plugin-api-reference.md)

---

*This guide is automatically generated from the Logseq codebase. For the most up-to-date information, refer to the source code.*
