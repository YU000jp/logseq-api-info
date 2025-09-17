#!/usr/bin/env node

/**
 * Generate CSS and DOM Documentation for Theme Developers
 * Extracts CSS classes, variables, and DOM structure information
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../src/main/frontend');
const OUTPUT_DIR = path.join(__dirname, '../docs/generated');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Extract CSS classes and variables from CSS content
 */
function extractCSSDefinitions(content, filename) {
  const definitions = {
    classes: [],
    variables: [],
    components: [],
    file: filename
  };

  // Extract CSS classes
  const classRegex = /\.([a-zA-Z0-9_-]+)(?:\.[a-zA-Z0-9_-]+)*\s*{/g;
  let match;
  
  while ((match = classRegex.exec(content)) !== null) {
    const className = match[1];
    if (!definitions.classes.includes(className)) {
      definitions.classes.push(className);
    }
  }

  // Extract CSS custom properties (variables)
  const variableRegex = /--([\w-]+):\s*([^;]+);/g;
  while ((match = variableRegex.exec(content)) !== null) {
    const [, name, value] = match;
    definitions.variables.push({
      name: `--${name}`,
      value: value.trim(),
      file: filename
    });
  }

  // Extract component-related classes (with specific prefixes)
  const componentPrefixes = ['ls-', 'cp__', 'block-', 'page-', 'sidebar-', 'editor-'];
  definitions.components = definitions.classes.filter(className => 
    componentPrefixes.some(prefix => className.startsWith(prefix))
  );

  return definitions;
}

/**
 * Extract DOM structure hints from ClojureScript files
 */
function extractDOMStructure(content, filename) {
  const domElements = {
    components: [],
    ids: [],
    dataAttributes: [],
    file: filename
  };

  // Extract data attributes
  const dataAttrRegex = /data-([a-zA-Z0-9_-]+)/g;
  let match;
  
  while ((match = dataAttrRegex.exec(content)) !== null) {
    const attr = `data-${match[1]}`;
    if (!domElements.dataAttributes.includes(attr)) {
      domElements.dataAttributes.push(attr);
    }
  }

  // Extract id attributes 
  const idRegex = /:id\s+"([^"]+)"/g;
  while ((match = idRegex.exec(content)) !== null) {
    const id = match[1];
    if (!domElements.ids.includes(id)) {
      domElements.ids.push(id);
    }
  }

  // Extract component names from ClojureScript
  const componentRegex = /defn\s+([a-zA-Z0-9_-]+)(?:-component)?/g;
  while ((match = componentRegex.exec(content)) !== null) {
    const component = match[1];
    if (!domElements.components.includes(component)) {
      domElements.components.push(component);
    }
  }

  return domElements;
}

/**
 * Generate CSS variables documentation
 */
function generateCSSVariablesDoc(allVariables) {
  const variablesByCategory = {};
  
  // Categorize variables
  for (const variable of allVariables) {
    let category = 'General';
    
    if (variable.name.includes('color')) category = 'Colors';
    else if (variable.name.includes('font') || variable.name.includes('text')) category = 'Typography';
    else if (variable.name.includes('size') || variable.name.includes('width') || variable.name.includes('height')) category = 'Dimensions';
    else if (variable.name.includes('spacing') || variable.name.includes('margin') || variable.name.includes('padding')) category = 'Spacing';
    else if (variable.name.includes('border') || variable.name.includes('radius')) category = 'Borders';
    else if (variable.name.includes('shadow')) category = 'Shadows';
    else if (variable.name.includes('z-index')) category = 'Z-Index';
    
    if (!variablesByCategory[category]) {
      variablesByCategory[category] = [];
    }
    variablesByCategory[category].push(variable);
  }

  let markdown = `# CSS Variables Reference\n\n*Auto-generated from CSS files*\n\n`;

  for (const [category, variables] of Object.entries(variablesByCategory)) {
    markdown += `## ${category}\n\n`;
    markdown += `| Variable | Default Value | Source |\n`;
    markdown += `|----------|---------------|--------|\n`;
    
    for (const variable of variables) {
      markdown += `| \`${variable.name}\` | \`${variable.value}\` | \`${variable.file}\` |\n`;
    }
    markdown += `\n`;
  }

  return markdown;
}

/**
 * Generate CSS classes documentation
 */
function generateCSSClassesDoc(allClasses, allComponents) {
  let markdown = `# CSS Classes Reference\n\n*Auto-generated from CSS files*\n\n`;

  // Component classes
  markdown += `## Component Classes\n\n`;
  markdown += `These classes are used for specific Logseq UI components:\n\n`;
  
  const componentsByPrefix = {};
  for (const component of allComponents) {
    const prefix = component.match(/^([a-zA-Z]+)/)?.[1] || 'other';
    if (!componentsByPrefix[prefix]) {
      componentsByPrefix[prefix] = [];
    }
    componentsByPrefix[prefix].push(component);
  }

  for (const [prefix, components] of Object.entries(componentsByPrefix)) {
    markdown += `### ${prefix.toUpperCase()} Components\n\n`;
    components.sort().forEach(component => {
      markdown += `- \`.${component}\`\n`;
    });
    markdown += `\n`;
  }

  // Utility classes (non-component)
  const utilityClasses = allClasses.filter(cls => 
    !allComponents.includes(cls) && 
    !cls.startsWith('ls-') && 
    !cls.startsWith('cp__') &&
    !cls.startsWith('block-') &&
    !cls.startsWith('page-')
  );

  if (utilityClasses.length > 0) {
    markdown += `## Utility Classes\n\n`;
    markdown += `General utility classes:\n\n`;
    utilityClasses.sort().forEach(cls => {
      markdown += `- \`.${cls}\`\n`;
    });
    markdown += `\n`;
  }

  return markdown;
}

/**
 * Generate DOM structure documentation
 */
function generateDOMStructureDoc(allDOMElements) {
  let markdown = `# DOM Structure Reference\n\n*Auto-generated from ClojureScript files*\n\n`;

  // Data attributes
  if (allDOMElements.dataAttributes.length > 0) {
    markdown += `## Data Attributes\n\n`;
    markdown += `Common data attributes used in Logseq:\n\n`;
    allDOMElements.dataAttributes.sort().forEach(attr => {
      markdown += `- \`${attr}\`\n`;
    });
    markdown += `\n`;
  }

  // IDs
  if (allDOMElements.ids.length > 0) {
    markdown += `## Element IDs\n\n`;
    markdown += `Common element IDs:\n\n`;
    allDOMElements.ids.sort().forEach(id => {
      markdown += `- \`#${id}\`\n`;
    });
    markdown += `\n`;
  }

  // Components
  if (allDOMElements.components.length > 0) {
    markdown += `## UI Components\n\n`;
    markdown += `ClojureScript component functions:\n\n`;
    allDOMElements.components.sort().forEach(component => {
      markdown += `- \`${component}\`\n`;
    });
    markdown += `\n`;
  }

  return markdown;
}

/**
 * Main function to generate CSS and DOM documentation
 */
function generateCSSAndDOMDocs() {
  console.log('🎨 Scanning CSS files and ClojureScript components...');
  
  const allClasses = new Set();
  const allVariables = [];
  const allComponents = new Set();
  const allDOMElements = {
    dataAttributes: new Set(),
    ids: new Set(),
    components: new Set()
  };

  // Process CSS files
  function processCSSFiles(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        processCSSFiles(filePath);
      } else if (file.endsWith('.css')) {
        const content = fs.readFileSync(filePath, 'utf8');
        const relativePath = path.relative(SRC_DIR, filePath);
        const definitions = extractCSSDefinitions(content, relativePath);
        
        definitions.classes.forEach(cls => allClasses.add(cls));
        allVariables.push(...definitions.variables);
        definitions.components.forEach(comp => allComponents.add(comp));
        
        console.log(`🎨 Processed ${relativePath}: ${definitions.classes.length} classes, ${definitions.variables.length} variables`);
      }
    }
  }

  // Process ClojureScript files for DOM structure
  function processClojureScriptFiles(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        processClojureScriptFiles(filePath);
      } else if (file.endsWith('.cljs') || file.endsWith('.cljc')) {
        const content = fs.readFileSync(filePath, 'utf8');
        const relativePath = path.relative(SRC_DIR, filePath);
        const domElements = extractDOMStructure(content, relativePath);
        
        domElements.dataAttributes.forEach(attr => allDOMElements.dataAttributes.add(attr));
        domElements.ids.forEach(id => allDOMElements.ids.add(id));
        domElements.components.forEach(comp => allDOMElements.components.add(comp));
      }
    }
  }

  processCSSFiles(SRC_DIR);
  processClojureScriptFiles(SRC_DIR);

  console.log(`\n📊 Found:`);
  console.log(`  - ${allClasses.size} CSS classes`);
  console.log(`  - ${allVariables.length} CSS variables`);  
  console.log(`  - ${allComponents.size} component classes`);
  console.log(`  - ${allDOMElements.dataAttributes.size} data attributes`);

  // Generate documentation
  console.log('\n📝 Generating CSS and DOM documentation...');

  // CSS Variables documentation
  const variablesDoc = generateCSSVariablesDoc(allVariables);
  const variablesPath = path.join(OUTPUT_DIR, 'css-variables-reference.md');
  fs.writeFileSync(variablesPath, variablesDoc);
  console.log(`✅ CSS Variables documentation: ${variablesPath}`);

  // CSS Classes documentation  
  const classesDoc = generateCSSClassesDoc(Array.from(allClasses), Array.from(allComponents));
  const classesPath = path.join(OUTPUT_DIR, 'css-classes-reference.md');
  fs.writeFileSync(classesPath, classesDoc);
  console.log(`✅ CSS Classes documentation: ${classesPath}`);

  // DOM Structure documentation
  const domElements = {
    dataAttributes: Array.from(allDOMElements.dataAttributes),
    ids: Array.from(allDOMElements.ids),
    components: Array.from(allDOMElements.components)
  };
  const domDoc = generateDOMStructureDoc(domElements);
  const domPath = path.join(OUTPUT_DIR, 'dom-structure-reference.md');
  fs.writeFileSync(domPath, domDoc);
  console.log(`✅ DOM Structure documentation: ${domPath}`);

  // Generate comprehensive theme developer guide
  const themeGuide = generateThemeGuide(Array.from(allClasses), allVariables, Array.from(allComponents));
  const guidePath = path.join(OUTPUT_DIR, 'theme-development-guide.md');
  fs.writeFileSync(guidePath, themeGuide);
  console.log(`✅ Theme Development Guide: ${guidePath}`);
}

/**
 * Generate comprehensive theme development guide
 */
function generateThemeGuide(allClasses, allVariables, allComponents) {
  let markdown = `# Logseq Theme Development Guide

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
`;

  // Add color variables
  const colorVariables = allVariables.filter(v => v.name.includes('color'));
  markdown += `\n\`\`\`css\n:root {\n`;
  colorVariables.slice(0, 10).forEach(variable => {
    markdown += `  ${variable.name}: ${variable.value};\n`;
  });
  if (colorVariables.length > 10) {
    markdown += `  /* ... and ${colorVariables.length - 10} more color variables */\n`;
  }
  markdown += `}\n\`\`\`\n\n`;

  markdown += `### Typography Variables\n`;
  const fontVariables = allVariables.filter(v => v.name.includes('font') || v.name.includes('text'));
  if (fontVariables.length > 0) {
    markdown += `\n\`\`\`css\n:root {\n`;
    fontVariables.slice(0, 5).forEach(variable => {
      markdown += `  ${variable.name}: ${variable.value};\n`;
    });
    markdown += `}\n\`\`\`\n\n`;
  }

  markdown += `## Component Classes

### Core Components
`;

  // Group components by type
  const coreComponents = allComponents.filter(comp => comp.startsWith('ls-') || comp.startsWith('cp__'));
  coreComponents.slice(0, 20).forEach(comp => {
    markdown += `- \`.${comp}\`\n`;
  });

  markdown += `\n### Block and Page Components\n`;
  const blockComponents = allComponents.filter(comp => comp.startsWith('block-') || comp.startsWith('page-'));
  blockComponents.slice(0, 15).forEach(comp => {
    markdown += `- \`.${comp}\`\n`;
  });

  markdown += `

## Theme Structure Example

\`\`\`css
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
\`\`\`

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
`;

  return markdown;
}

// Run the generator
if (require.main === module) {
  generateCSSAndDOMDocs();
}

module.exports = { generateCSSAndDOMDocs };