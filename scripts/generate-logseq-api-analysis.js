#!/usr/bin/env node

/**
 * Logseq Application API Analysis
 * Deep analysis of the actual Logseq API implementation in ClojureScript
 * Extracts functionality from the core API modules
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../src/main/logseq');
const OUTPUT_DIR = path.join(__dirname, '../docs/generated');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Extract API functions from ClojureScript files
 */
function extractClojureScriptAPI(content, filename) {
  const apiDefinitions = {
    exportedFunctions: [],
    modules: [],
    namespaces: [],
    file: filename
  };

  // Extract namespace declaration
  const nsMatch = content.match(/\(ns\s+([^\s]+)/);
  if (nsMatch) {
    apiDefinitions.namespaces.push(nsMatch[1]);
  }

  // Extract exported functions (defn ^:export)
  const exportedFuncRegex = /\(defn\s+\^:export\s+([^\s\[\]]+)(?:\s*\[([^\]]*)\])?\s*(?:\n\s*"([^"]*)")?\s*/g;
  let match;
  
  while ((match = exportedFuncRegex.exec(content)) !== null) {
    const [, name, params, docstring] = match;
    apiDefinitions.exportedFunctions.push({
      name: name.replace(/^-/, ''), // Remove leading dash
      parameters: params ? params.split(/\s+/).filter(p => p && !p.startsWith('^')) : [],
      docstring: docstring || '',
      namespace: apiDefinitions.namespaces[0] || '',
      file: filename
    });
  }

  // Extract regular function definitions that might be API related
  const funcRegex = /\(defn\s+([^\s\[\]^]+)(?:\s*\[([^\]]*)\])?\s*(?:\n\s*"([^"]*)")?\s*/g;
  while ((match = funcRegex.exec(content)) !== null) {
    const [, name, params, docstring] = match;
    if (!name.includes('^:export') && name.length > 2) {
      apiDefinitions.modules.push({
        name: name.replace(/^-/, ''),
        parameters: params ? params.split(/\s+/).filter(p => p && !p.startsWith('^')) : [],
        docstring: docstring || '',
        namespace: apiDefinitions.namespaces[0] || '',
        file: filename
      });
    }
  }

  return apiDefinitions;
}

/**
 * Analyze API functionality by category
 */
function categorizeAPIFunctions(allFunctions) {
  const categories = {
    'Block Management': [],
    'Page Operations': [], 
    'Database Queries': [],
    'File System': [],
    'Plugin System': [],
    'UI Components': [],
    'State Management': [],
    'Search Functions': [],
    'Configuration': [],
    'Utilities': [],
    'Other': []
  };

  for (const func of allFunctions) {
    const name = func.name.toLowerCase();
    const ns = func.namespace.toLowerCase();
    const file = func.file.toLowerCase();
    
    if (name.includes('block') || file.includes('block')) {
      categories['Block Management'].push(func);
    } else if (name.includes('page') || name.includes('journal')) {
      categories['Page Operations'].push(func);
    } else if (name.includes('query') || name.includes('db') || name.includes('datascript')) {
      categories['Database Queries'].push(func);
    } else if (name.includes('file') || name.includes('asset') || name.includes('write') || name.includes('read')) {
      categories['File System'].push(func);
    } else if (name.includes('plugin') || name.includes('hook') || ns.includes('plugin')) {
      categories['Plugin System'].push(func);
    } else if (name.includes('ui') || name.includes('show') || name.includes('render') || file.includes('ui')) {
      categories['UI Components'].push(func);
    } else if (name.includes('state') || name.includes('config') || name.includes('setting')) {
      categories['State Management'].push(func);
    } else if (name.includes('search') || name.includes('find')) {
      categories['Search Functions'].push(func);
    } else if (name.includes('config') || name.includes('setting') || name.includes('preference')) {
      categories['Configuration'].push(func);
    } else if (name.includes('util') || name.includes('helper') || file.includes('utils')) {
      categories['Utilities'].push(func);
    } else {
      categories['Other'].push(func);
    }
  }

  return categories;
}

/**
 * Generate comprehensive API functionality analysis
 */
function generateAPIFunctionalityAnalysis(categorizedFunctions, allFunctions) {
  let markdown = `# Logseq Application API Functionality Analysis

*Deep analysis of Logseq's core API implementation*

## Overview | 概要

This document provides a comprehensive analysis of the Logseq application's API functionality, extracted directly from the ClojureScript implementation. Unlike the TypeScript SDK documentation, this analyzes the actual core functionality that powers Logseq.

このドキュメントは、ClojureScript実装から直接抽出されたLogseqアプリケーションのAPI機能の包括的な分析を提供します。TypeScript SDKドキュメントとは異なり、Logseqを動かす実際のコア機能を分析します。

## API Statistics | API統計

- **Total Exported Functions**: ${allFunctions.filter(f => f.file.includes('api')).length}
- **API Modules**: ${new Set(allFunctions.map(f => f.namespace)).size}
- **Function Categories**: ${Object.keys(categorizedFunctions).filter(cat => categorizedFunctions[cat].length > 0).length}

## Core API Categories | コアAPI カテゴリ

`;

  // Generate sections for each category
  for (const [category, functions] of Object.entries(categorizedFunctions)) {
    if (functions.length === 0) continue;
    
    markdown += `### ${category}\n\n`;
    markdown += `*${functions.length} functions available*\n\n`;
    
    if (functions.length > 0) {
      // Show top functions in this category
      const topFunctions = functions.slice(0, 10);
      markdown += `#### Key Functions\n\n`;
      
      for (const func of topFunctions) {
        markdown += `**\`${func.name}\`**\n`;
        if (func.parameters.length > 0) {
          markdown += `- Parameters: \`${func.parameters.join(', ')}\`\n`;
        }
        if (func.docstring) {
          markdown += `- Description: ${func.docstring}\n`;
        }
        markdown += `- Namespace: \`${func.namespace}\`\n`;
        markdown += `- Source: \`${func.file}\`\n\n`;
      }
      
      if (functions.length > 10) {
        markdown += `*...and ${functions.length - 10} more functions*\n\n`;
      }
    }
    
    markdown += `---\n\n`;
  }

  return markdown;
}

/**
 * Generate API showcase with practical examples
 */
function generateAPIShowcase(categorizedFunctions) {
  let showcase = `# Logseq API Showcase

*Practical examples and use cases for Logseq's API functionality*

## What is the Logseq API? | Logseq APIとは？

Logseq provides a comprehensive API that allows plugins to interact with:
- Block and page content
- Database queries and operations  
- File system and assets
- UI components and interactions
- Application state and configuration

Logseqは、プラグインが以下と相互作用できる包括的なAPIを提供します：
- ブロックとページコンテンツ
- データベースクエリと操作
- ファイルシステムとアセット
- UIコンポーネントとインタラクション
- アプリケーション状態と設定

## Core API Capabilities | コアAPI機能

`;

  // Generate showcase for each major category
  const showcaseCategories = ['Block Management', 'Page Operations', 'Database Queries', 'UI Components', 'Plugin System'];
  
  for (const category of showcaseCategories) {
    const functions = categorizedFunctions[category] || [];
    if (functions.length === 0) continue;
    
    showcase += `### ${category} Showcase\n\n`;
    
    switch (category) {
      case 'Block Management':
        showcase += `The Block Management API provides comprehensive control over Logseq's block-based content system.\n\n`;
        showcase += `#### Key Capabilities:\n`;
        showcase += `- Create, update, and delete blocks\n`;
        showcase += `- Navigate block hierarchies\n`;
        showcase += `- Manage block properties and metadata\n`;
        showcase += `- Handle block references and links\n\n`;
        
        showcase += `#### Example Functions:\n`;
        functions.slice(0, 5).forEach(func => {
          showcase += `- **\`${func.name}\`** - ${func.docstring || 'Manage block operations'}\n`;
        });
        break;
        
      case 'Page Operations':
        showcase += `The Page Operations API handles page creation, navigation, and management.\n\n`;
        showcase += `#### Key Capabilities:\n`;
        showcase += `- Create and manage pages\n`;
        showcase += `- Handle journal pages\n`;
        showcase += `- Page metadata and properties\n`;
        showcase += `- Page navigation and linking\n\n`;
        
        showcase += `#### Example Functions:\n`;
        functions.slice(0, 5).forEach(func => {
          showcase += `- **\`${func.name}\`** - ${func.docstring || 'Page management operations'}\n`;
        });
        break;
        
      case 'Database Queries':
        showcase += `The Database API provides powerful query capabilities using DataScript.\n\n`;
        showcase += `#### Key Capabilities:\n`;
        showcase += `- Execute DataScript queries\n`;
        showcase += `- Filter and search content\n`;
        showcase += `- Database transactions\n`;
        showcase += `- Data relationships and references\n\n`;
        
        showcase += `#### Example Functions:\n`;
        functions.slice(0, 5).forEach(func => {
          showcase += `- **\`${func.name}\`** - ${func.docstring || 'Database query operations'}\n`;
        });
        break;
        
      case 'UI Components':
        showcase += `The UI API allows plugins to create custom interface elements.\n\n`;
        showcase += `#### Key Capabilities:\n`;
        showcase += `- Create custom UI components\n`;
        showcase += `- Display messages and notifications\n`;
        showcase += `- Handle user interactions\n`;
        showcase += `- Integrate with Logseq's interface\n\n`;
        
        showcase += `#### Example Functions:\n`;
        functions.slice(0, 5).forEach(func => {
          showcase += `- **\`${func.name}\`** - ${func.docstring || 'UI component operations'}\n`;
        });
        break;
        
      case 'Plugin System':
        showcase += `The Plugin System API manages plugin lifecycle and interactions.\n\n`;
        showcase += `#### Key Capabilities:\n`;
        showcase += `- Plugin registration and management\n`;
        showcase += `- Hook system for extensibility\n`;
        showcase += `- Plugin communication\n`;
        showcase += `- Plugin configuration and settings\n\n`;
        
        showcase += `#### Example Functions:\n`;
        functions.slice(0, 5).forEach(func => {
          showcase += `- **\`${func.name}\`** - ${func.docstring || 'Plugin system operations'}\n`;
        });
        break;
    }
    
    showcase += `\n---\n\n`;
  }

  // Add practical usage examples
  showcase += `## Practical Usage Examples | 実用的な使用例

### Creating a Simple Plugin

\`\`\`javascript
// Example using Logseq's API functionality
async function createCustomBlock() {
    // Get current page
    const currentPage = await logseq.Editor.getCurrentPage();
    
    // Create a new block
    const newBlock = await logseq.Editor.insertBlock(
        currentPage.uuid,
        "This block was created by a plugin!"
    );
    
    // Add properties to the block
    await logseq.Editor.upsertBlockProperty(
        newBlock.uuid,
        "created-by",
        "my-plugin"
    );
}
\`\`\`

### Database Query Example

\`\`\`javascript
// Query blocks with specific properties
async function findBlocksWithTag(tag) {
    const query = \`
        [:find ?b ?content
         :where
         [?b :block/content ?content]
         [(clojure.string/includes? ?content "#\${tag}")]
        ]
    \`;
    
    const results = await logseq.DB.datascriptQuery(query);
    return results;
}
\`\`\`

### UI Integration Example

\`\`\`javascript
// Create custom UI element
logseq.App.registerUIItem('toolbar', {
    key: 'my-custom-button',
    template: \`
        <a class="button" data-on-click="handleCustomAction">
            <i class="ti ti-star"></i>
            Custom Action
        </a>
    \`
});

logseq.provideModel({
    handleCustomAction() {
        logseq.UI.showMsg('Custom action executed!', 'success');
    }
});
\`\`\`

## API Architecture | API アーキテクチャ

Logseq's API is built on several key principles:

1. **DataScript Database** - All data operations use DataScript for consistency
2. **Reactive State** - Changes propagate through the application automatically  
3. **Plugin Isolation** - Plugins run in sandboxed environments
4. **TypeScript Support** - Full type definitions available for development
5. **Event-Driven** - Hook system allows plugins to respond to application events

## Development Resources | 開発リソース

- [Plugin API Reference](./plugin-api-reference.md) - TypeScript interface documentation
- [CSS Classes Reference](./css-classes-reference.md) - Styling and theming
- [Theme Development Guide](./theme-development-guide.md) - Complete theming guide
- [Plugin Examples](./examples/plugin-examples/) - Practical code examples

---

*This showcase demonstrates the power and flexibility of Logseq's API system for plugin and theme development.*

*このショーケースは、プラグインとテーマ開発におけるLogseq APIシステムの力と柔軟性を実証しています。*
`;

  return showcase;
}

/**
 * Main function to analyze Logseq API
 */
function analyzeLogseqAPI() {
  console.log('🔍 Analyzing Logseq Application API...');
  
  const allFunctions = [];
  let totalExportedFunctions = 0;

  // Process ClojureScript API files
  function processClojureScriptFiles(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        processClojureScriptFiles(filePath);
      } else if (file.endsWith('.cljs')) {
        const content = fs.readFileSync(filePath, 'utf8');
        const relativePath = path.relative(SRC_DIR, filePath);
        const apiDefs = extractClojureScriptAPI(content, relativePath);
        
        allFunctions.push(...apiDefs.exportedFunctions);
        allFunctions.push(...apiDefs.modules);
        totalExportedFunctions += apiDefs.exportedFunctions.length;
        
        if (apiDefs.exportedFunctions.length > 0 || apiDefs.modules.length > 0) {
          console.log(`📄 Processed ${relativePath}: ${apiDefs.exportedFunctions.length} exported, ${apiDefs.modules.length} internal functions`);
        }
      }
    }
  }

  processClojureScriptFiles(SRC_DIR);

  console.log(`\n📊 Analysis Results:`);
  console.log(`  - ${totalExportedFunctions} exported API functions`);
  console.log(`  - ${allFunctions.length} total functions analyzed`);
  console.log(`  - ${new Set(allFunctions.map(f => f.namespace)).size} namespaces`);

  // Categorize functions by functionality
  const categorizedFunctions = categorizeAPIFunctions(allFunctions);
  console.log(`  - ${Object.keys(categorizedFunctions).filter(cat => categorizedFunctions[cat].length > 0).length} functional categories`);

  // Generate documentation
  console.log('\n📝 Generating API analysis documentation...');

  // API Functionality Analysis
  const functionalityDoc = generateAPIFunctionalityAnalysis(categorizedFunctions, allFunctions);
  const functionalityPath = path.join(OUTPUT_DIR, 'logseq-api-functionality-analysis.md');
  fs.writeFileSync(functionalityPath, functionalityDoc);
  console.log(`✅ API Functionality Analysis: ${functionalityPath}`);

  // API Showcase
  const showcaseDoc = generateAPIShowcase(categorizedFunctions);
  const showcasePath = path.join(OUTPUT_DIR, 'logseq-api-showcase.md');
  fs.writeFileSync(showcasePath, showcaseDoc);
  console.log(`✅ API Showcase: ${showcasePath}`);

  // JSON data for further processing
  const apiData = {
    exportedFunctions: allFunctions.filter(f => f.file.includes('api')),
    categorizedFunctions,
    statistics: {
      totalExported: totalExportedFunctions,
      totalAnalyzed: allFunctions.length,
      namespaces: new Set(allFunctions.map(f => f.namespace)).size,
      categories: Object.keys(categorizedFunctions).filter(cat => categorizedFunctions[cat].length > 0).length
    },
    generatedAt: new Date().toISOString()
  };

  const jsonPath = path.join(OUTPUT_DIR, 'logseq-api-analysis-data.json');
  fs.writeFileSync(jsonPath, JSON.stringify(apiData, null, 2));
  console.log(`📄 API Analysis Data: ${jsonPath}`);

  console.log('\n🎉 Logseq API analysis complete!');
}

// Run the analyzer
if (require.main === module) {
  analyzeLogseqAPI();
}

module.exports = { analyzeLogseqAPI };