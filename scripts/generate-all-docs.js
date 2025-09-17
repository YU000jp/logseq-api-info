#!/usr/bin/env node

/**
 * Master Documentation Generator for Logseq Plugin and Theme Development
 * Generates comprehensive documentation in both English and Japanese
 */

const fs = require('fs');
const path = require('path');
const { generateAPIDocs } = require('./generate-api-docs');
const { generateCSSAndDOMDocs } = require('./generate-css-docs');
const { analyzeLogseqAPI } = require('./generate-logseq-api-analysis');

const OUTPUT_DIR = path.join(__dirname, '../docs/generated');

/**
 * Generate comprehensive documentation index
 */
function generateDocumentationIndex() {
  const indexContent = `# Logseq Developer Documentation

*Complete documentation for Logseq plugin and theme development*

## 📚 Documentation Overview

This directory contains auto-generated documentation extracted from the Logseq codebase to help plugin and theme developers.

## 🔌 Plugin Development

### API Reference
- **[Plugin API Reference](./plugin-api-reference.md)** - Complete TypeScript API documentation
- **[Plugin API Definitions JSON](./plugin-api-definitions.json)** - Machine-readable API definitions
- **[Logseq API Functionality Analysis](./logseq-api-functionality-analysis.md)** - Deep analysis of core Logseq API
- **[Logseq API Showcase](./logseq-api-showcase.md)** - Practical examples and use cases

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

\`\`\`bash
# Generate all documentation
npm run docs:generate

# Generate API documentation only  
node scripts/generate-api-docs.js

# Generate CSS/DOM documentation only
node scripts/generate-css-docs.js
\`\`\`

### Build Integration
Add these scripts to your \`package.json\`:

\`\`\`json
{
  "scripts": {
    "docs:generate": "node scripts/generate-all-docs.js",
    "docs:api": "node scripts/generate-api-docs.js", 
    "docs:css": "node scripts/generate-css-docs.js"
  }
}
\`\`\`

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
1. Review the generation scripts in \`scripts/\`
2. Update the generators when new APIs are added
3. Regenerate documentation after code changes

## 🔄 Keeping Documentation Updated

This documentation should be regenerated when:
- New plugin APIs are added
- CSS structure changes  
- UI components are modified
- TypeScript interfaces are updated

Run \`npm run docs:generate\` to update all documentation.

---

*Last generated: ${new Date().toISOString()}*
*Generated from Logseq codebase*
`;

  return indexContent;
}

/**
 * Generate Japanese translations of key documentation
 */
function generateJapaneseDocumentation() {
  const japaneseIndex = `# Logseq 開発者ドキュメント

*Logseq プラグインおよびテーマ開発のための完全なドキュメント*

## 📚 ドキュメント概要

このディレクトリには、プラグインおよびテーマ開発者を支援するために Logseq コードベースから自動生成されたドキュメントが含まれています。

## 🔌 プラグイン開発

### API リファレンス
- **[Plugin API Reference](./plugin-api-reference.md)** - 完全な TypeScript API ドキュメント
- **[Plugin API Definitions JSON](./plugin-api-definitions.json)** - 機械可読な API 定義
- **[Logseq API Functionality Analysis](./logseq-api-functionality-analysis.md)** - コア Logseq API の詳細分析
- **[Logseq API Showcase](./logseq-api-showcase.md)** - 実用的な例と使用例

### 主要な API
- **IAppProxy** - アプリケーションレベルの機能
- **IEditorProxy** - エディターとブロック操作
- **IDBProxy** - データベースクエリと操作
- **IUIProxy** - UI コンポーネントとインタラクション

## 🎨 テーマ開発

### CSS リファレンス
- **[CSS Variables Reference](./css-variables-reference.md)** - カスタマイズ可能なすべての CSS 変数
- **[CSS Classes Reference](./css-classes-reference.md)** - 完全なクラスリファレンス
- **[DOM Structure Reference](./dom-structure-reference.md)** - HTML 構造とデータ属性

### 開発ガイド
- **[Theme Development Guide](./theme-development-guide.md)** - 完全なテーマ開発ガイド

## 🛠 開発ツール

### ドキュメント生成
このドキュメントは以下のスクリプトを使用して自動生成されます：

\`\`\`bash
# すべてのドキュメントを生成
npm run docs:generate

# API ドキュメントのみ生成
node scripts/generate-api-docs.js

# CSS/DOM ドキュメントのみ生成
node scripts/generate-css-docs.js
\`\`\`

### ビルド統合
これらのスクリプトを \`package.json\` に追加します：

\`\`\`json
{
  "scripts": {
    "docs:generate": "node scripts/generate-all-docs.js",
    "docs:api": "node scripts/generate-api-docs.js", 
    "docs:css": "node scripts/generate-css-docs.js"
  }
}
\`\`\`

## 📖 このドキュメントの使用方法

### プラグイン開発者向け
1. [Plugin API Reference](./plugin-api-reference.md) から始める
2. 型安全性のために TypeScript インターフェースを確認
3. メインリポジトリドキュメントで使用例を確認

### テーマ開発者向け
1. [Theme Development Guide](./theme-development-guide.md) から始める
2. カスタマイズのために [CSS Variables](./css-variables-reference.md) を参照
3. 具体的なスタイリングのために [CSS Classes](./css-classes-reference.md) を使用

### 貢献者向け
1. \`scripts/\` の生成スクリプトを確認
2. 新しい API が追加されたときにジェネレータを更新
3. コード変更後にドキュメントを再生成

## 🔄 ドキュメントの更新

以下の場合にこのドキュメントを再生成する必要があります：
- 新しいプラグイン API が追加されたとき
- CSS 構造が変更されたとき
- UI コンポーネントが変更されたとき  
- TypeScript インターフェースが更新されたとき

すべてのドキュメントを更新するには \`npm run docs:generate\` を実行してください。

---

*最終生成日時: ${new Date().toISOString()}*
*Logseq コードベースから生成*
`;

  return japaneseIndex;
}

/**
 * Add scripts to package.json
 */
function updatePackageJson() {
  const packageJsonPath = path.join(__dirname, '../package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Add documentation generation scripts
    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }
    
    packageJson.scripts['docs:generate'] = 'node scripts/generate-all-docs.js';
    packageJson.scripts['docs:api'] = 'node scripts/generate-api-docs.js';
    packageJson.scripts['docs:css'] = 'node scripts/generate-css-docs.js';
    packageJson.scripts['docs:analysis'] = 'node scripts/generate-logseq-api-analysis.js';
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Updated package.json with documentation scripts');
  }
}

/**
 * Main function to generate all documentation
 */
function generateAllDocumentation() {
  console.log('🚀 Starting complete documentation generation...\n');
  
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Generate API documentation
  console.log('📖 Generating Plugin API documentation...');
  generateAPIDocs();
  
  // Generate CSS and DOM documentation
  console.log('\n🎨 Generating CSS and DOM documentation...');
  generateCSSAndDOMDocs();
  
  // Generate Logseq API analysis and showcase
  console.log('\n🔍 Generating Logseq API analysis and showcase...');
  analyzeLogseqAPI();
  
  // Generate documentation index
  console.log('\n📚 Generating documentation index...');
  const indexContent = generateDocumentationIndex();
  const indexPath = path.join(OUTPUT_DIR, 'README.md');
  fs.writeFileSync(indexPath, indexContent);
  console.log(`✅ Documentation index: ${indexPath}`);
  
  // Generate Japanese documentation
  console.log('\n🌐 Generating Japanese documentation...');
  const japaneseContent = generateJapaneseDocumentation();
  const japanesePath = path.join(OUTPUT_DIR, 'README.ja.md');
  fs.writeFileSync(japanesePath, japaneseContent);
  console.log(`✅ Japanese documentation: ${japanesePath}`);
  
  // Update package.json
  console.log('\n⚙️ Updating package.json...');
  updatePackageJson();
  
  console.log('\n🎉 Documentation generation complete!');
  console.log('\nGenerated files:');
  const files = fs.readdirSync(OUTPUT_DIR);
  files.forEach(file => {
    console.log(`  - ${file}`);
  });
  
  console.log('\n📖 To view the documentation, start with:');
  console.log(`  - docs/generated/README.md (English)`);
  console.log(`  - docs/generated/README.ja.md (日本語)`);
}

// Run the generator
if (require.main === module) {
  generateAllDocumentation();
}

module.exports = { generateAllDocumentation };