#!/usr/bin/env node

/**
 * Generate Plugin API Documentation from TypeScript definitions
 * Extracts interfaces, types, and methods from the TypeScript SDK
 */

const fs = require('fs');
const path = require('path');

const LIBS_DIR = path.join(__dirname, '../libs/src');
const OUTPUT_DIR = path.join(__dirname, '../docs/generated');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Extract TypeScript interfaces and types from file content
 */
function extractAPIDefinitions(content, filename) {
  const definitions = {
    interfaces: [],
    types: [],
    enums: [],
    classes: []
  };

  // Extract interfaces (handle nested braces)
  function findMatchingBrace(str, startIdx) {
    let depth = 0;
    for (let i = startIdx; i < str.length; i++) {
      if (str[i] === '{') depth++;
      else if (str[i] === '}') {
        depth--;
        if (depth === 0) return i;
      }
    }
    return -1;
  }

  const interfaceDeclRegex = /export interface\s+(\w+)(?:\s+extends\s+[^{]+)?\s*{/g;
  let match;
  while ((match = interfaceDeclRegex.exec(content)) !== null) {
    const name = match[1];
    const startIdx = match.index;
    const bodyStart = content.indexOf('{', interfaceDeclRegex.lastIndex - 1);
    if (bodyStart === -1) continue;
    const bodyEnd = findMatchingBrace(content, bodyStart);
    if (bodyEnd === -1) continue;
    const fullMatch = content.slice(startIdx, bodyEnd + 1);
    const body = content.slice(bodyStart + 1, bodyEnd);
    definitions.interfaces.push({
      name,
      body: body.trim(),
      fullDefinition: fullMatch,
      file: filename
    });
  }

  // Extract type aliases
  const typeRegex = /export type\s+(\w+)\s*=\s*([^;]+);/gs;
  while ((match = typeRegex.exec(content)) !== null) {
    const [fullMatch, name, definition] = match;
    definitions.types.push({
      name,
      definition: definition.trim(),
      fullDefinition: fullMatch,
      file: filename
    });
  }

  // Extract enums
  const enumRegex = /export enum\s+(\w+)\s*{([^}]+)}/gs;
  while ((match = enumRegex.exec(content)) !== null) {
    const [fullMatch, name, body] = match;
    definitions.enums.push({
      name,
      body: body.trim(),
      fullDefinition: fullMatch,
      file: filename
    });
  }

  // Extract classes
  const classRegex = /export class\s+(\w+)(?:\s+extends\s+[^{]+)?\s*{/gs;
  while ((match = classRegex.exec(content)) !== null) {
    const [fullMatch, name] = match;
    definitions.classes.push({
      name,
      file: filename
    });
  }

  return definitions;
}

/**
 * Parse interface methods and properties
 */
function parseInterfaceMembers(body) {
  const members = {
    properties: [],
    methods: []
  };

  // Split by lines and process each member
  const lines = body.split('\n').map(line => line.trim()).filter(line => line);
  
  for (const line of lines) {
    if (line.startsWith('//') || line.startsWith('*')) continue;
    
    // Method signatures (contains parentheses)
    if (line.includes('(') && line.includes(')')) {
      const methodMatch = line.match(/(\w+)\s*(<[^>]+>)?\s*\((.*?)\)\s*:\s*(.+)/);
      if (methodMatch) {
        const [, name, generics, params, returnType] = methodMatch;
        members.methods.push({
          name: name.trim(),
          generics: generics ? generics.trim() : undefined,
          parameters: params.trim(),
          returnType: returnType.replace(/[;,]$/, '').trim()
        });
      }
    } else {
      // Properties
      const propMatch = line.match(/(\w+)(\??):\s*(.+)/);
      if (propMatch) {
        const [, name, optional, type] = propMatch;
        members.properties.push({
          name: name.trim(),
          optional: optional === '?',
          type: type.replace(/[;,]$/, '').trim()
        });
      }
    }
  }

  return members;
}

/**
 * Generate markdown documentation
 */
function generateMarkdown(allDefinitions) {
  let markdown = `# Logseq Plugin API Reference

*Auto-generated from TypeScript definitions*

## Table of Contents

`;

  // Generate TOC
  const tocSections = [];
  if (allDefinitions.interfaces.length > 0) tocSections.push('- [Interfaces](#interfaces)');
  if (allDefinitions.types.length > 0) tocSections.push('- [Type Aliases](#type-aliases)');
  if (allDefinitions.enums.length > 0) tocSections.push('- [Enums](#enums)');
  if (allDefinitions.classes.length > 0) tocSections.push('- [Classes](#classes)');
  
  markdown += tocSections.join('\n') + '\n\n';

  // Generate Interfaces section
  if (allDefinitions.interfaces.length > 0) {
    markdown += `## Interfaces\n\n`;
    
    for (const iface of allDefinitions.interfaces) {
      markdown += `### ${iface.name}\n\n`;
      markdown += `*Source: \`${iface.file}\`*\n\n`;
      
      const members = parseInterfaceMembers(iface.body);
      
      if (members.properties.length > 0) {
        markdown += `#### Properties\n\n`;
        markdown += `| Name | Type | Optional | Description |\n`;
        markdown += `|------|------|----------|-------------|\n`;
        
        for (const prop of members.properties) {
          markdown += `| \`${prop.name}\` | \`${prop.type}\` | ${prop.optional ? 'Yes' : 'No'} | |\n`;
        }
        markdown += `\n`;
      }
      
      if (members.methods.length > 0) {
        markdown += `#### Methods\n\n`;
        for (const method of members.methods) {
          markdown += `##### ${method.name}\n\n`;
          markdown += `\`\`\`typescript\n${method.name}(${method.parameters}): ${method.returnType}\n\`\`\`\n\n`;
        }
      }
      
      markdown += `#### Full Definition\n\n`;
      markdown += `\`\`\`typescript\n${iface.fullDefinition}\n\`\`\`\n\n`;
      markdown += `---\n\n`;
    }
  }

  // Generate Type Aliases section  
  if (allDefinitions.types.length > 0) {
    markdown += `## Type Aliases\n\n`;
    
    for (const type of allDefinitions.types) {
      markdown += `### ${type.name}\n\n`;
      markdown += `*Source: \`${type.file}\`*\n\n`;
      markdown += `\`\`\`typescript\n${type.fullDefinition}\n\`\`\`\n\n`;
      markdown += `---\n\n`;
    }
  }

  // Generate Enums section
  if (allDefinitions.enums.length > 0) {
    markdown += `## Enums\n\n`;
    
    for (const enumDef of allDefinitions.enums) {
      markdown += `### ${enumDef.name}\n\n`;
      markdown += `*Source: \`${enumDef.file}\`*\n\n`;
      markdown += `\`\`\`typescript\n${enumDef.fullDefinition}\n\`\`\`\n\n`;
      markdown += `---\n\n`;
    }
  }

  // Generate Classes section
  if (allDefinitions.classes.length > 0) {
    markdown += `## Classes\n\n`;
    
    for (const classDef of allDefinitions.classes) {
      markdown += `### ${classDef.name}\n\n`;
      markdown += `*Source: \`${classDef.file}\`*\n\n`;
      markdown += `---\n\n`;
    }
  }

  return markdown;
}

/**
 * Main function to generate API documentation
 */
function generateAPIDocs() {
  console.log('🔍 Scanning TypeScript files for API definitions...');
  
  const allDefinitions = {
    interfaces: [],
    types: [],
    enums: [],
    classes: []
  };

  // Process all TypeScript files in libs/src
  function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        processDirectory(filePath);
      } else if (file.endsWith('.ts')) {
        const content = fs.readFileSync(filePath, 'utf8');
        const relativePath = path.relative(LIBS_DIR, filePath);
        const definitions = extractAPIDefinitions(content, relativePath);
        
        allDefinitions.interfaces.push(...definitions.interfaces);
        allDefinitions.types.push(...definitions.types);
        allDefinitions.enums.push(...definitions.enums);
        allDefinitions.classes.push(...definitions.classes);
        
        console.log(`📄 Processed ${relativePath}: ${definitions.interfaces.length} interfaces, ${definitions.types.length} types`);
      }
    }
  }

  processDirectory(LIBS_DIR);

  // Sort definitions by name
  allDefinitions.interfaces.sort((a, b) => a.name.localeCompare(b.name));
  allDefinitions.types.sort((a, b) => a.name.localeCompare(b.name));
  allDefinitions.enums.sort((a, b) => a.name.localeCompare(b.name));
  allDefinitions.classes.sort((a, b) => a.name.localeCompare(b.name));

  console.log(`\n📊 Found:`);
  console.log(`  - ${allDefinitions.interfaces.length} interfaces`);
  console.log(`  - ${allDefinitions.types.length} type aliases`);
  console.log(`  - ${allDefinitions.enums.length} enums`);
  console.log(`  - ${allDefinitions.classes.length} classes`);

  // Generate markdown documentation
  console.log('\n📝 Generating markdown documentation...');
  const markdown = generateMarkdown(allDefinitions);

  // Write to output file
  const outputPath = path.join(OUTPUT_DIR, 'plugin-api-reference.md');
  fs.writeFileSync(outputPath, markdown);
  
  console.log(`✅ Documentation generated: ${outputPath}`);

  // Also generate a JSON file with all definitions for other tools
  const jsonPath = path.join(OUTPUT_DIR, 'plugin-api-definitions.json');
  fs.writeFileSync(jsonPath, JSON.stringify(allDefinitions, null, 2));
  
  console.log(`📄 JSON definitions saved: ${jsonPath}`);
}

// Run the generator
if (require.main === module) {
  generateAPIDocs();
}

module.exports = { generateAPIDocs, extractAPIDefinitions };