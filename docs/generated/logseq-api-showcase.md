# Logseq API Showcase

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

### Block Management Showcase

The Block Management API provides comprehensive control over Logseq's block-based content system.

#### Key Capabilities:
- Create, update, and delete blocks
- Navigate block hierarchies
- Manage block properties and metadata
- Handle block references and links

#### Example Functions:
- **`convert?to-built-in-property-name`** - Manage block operations
- **`sanitize-user-property-name`** - Manage block operations
- **`resolve-property-prefix-for-db`** - Manage block operations
- **`get-db-ident-for-user-property-name`** - Manage block operations
- **`plugin-property-key?`** - Manage block operations

---

### Page Operations Showcase

The Page Operations API handles page creation, navigation, and management.

#### Key Capabilities:
- Create and manage pages
- Handle journal pages
- Page metadata and properties
- Page navigation and linking

#### Example Functions:
- **`get_page`** - Page management operations
- **`get_all_pages`** - Page management operations
- **`create_page`** - Page management operations
- **`create_journal_page`** - Page management operations
- **`delete_page`** - Page management operations

---

### Database Queries Showcase

The Database API provides powerful query capabilities using DataScript.

#### Key Capabilities:
- Execute DataScript queries
- Filter and search content
- Database transactions
- Data relationships and references

#### Example Functions:
- **`datascript_query`** - Database query operations
- **`custom_query`** - Database query operations
- **`download_graph_db`** - Database query operations
- **`query_element_rect`** - Database query operations
- **`query_element_by_id`** - Database query operations

---

### UI Components Showcase

The UI API allows plugins to create custom interface elements.

#### Key Capabilities:
- Create custom UI components
- Display messages and notifications
- Handle user interactions
- Integrate with Logseq's interface

#### Example Functions:
- **`built_in_open`** - UI component operations
- **`register_fenced_code_renderer`** - UI component operations
- **`register_route_renderer`** - UI component operations
- **`register_daemon_renderer`** - UI component operations
- **`show_msg`** - UI component operations

---

### Plugin System Showcase

The Plugin System API manages plugin lifecycle and interactions.

#### Key Capabilities:
- Plugin registration and management
- Hook system for extensibility
- Plugin communication
- Plugin configuration and settings

#### Example Functions:
- **`install-plugin-hook`** - Plugin system operations
- **`uninstall-plugin-hook`** - Plugin system operations
- **`should-exec-plugin-hook`** - Plugin system operations
- **`load_installed_web_plugins`** - Plugin system operations
- **`save_installed_web_plugin`** - Plugin system operations

---

## Practical Usage Examples | 実用的な使用例

### Creating a Simple Plugin

```javascript
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
```

### Database Query Example

```javascript
// Query blocks with specific properties
async function findBlocksWithTag(tag) {
    const query = `
        [:find ?b ?content
         :where
         [?b :block/content ?content]
         [(clojure.string/includes? ?content "#${tag}")]
        ]
    `;
    
    const results = await logseq.DB.datascriptQuery(query);
    return results;
}
```

### UI Integration Example

```javascript
// Create custom UI element
logseq.App.registerUIItem('toolbar', {
    key: 'my-custom-button',
    template: `
        <a class="button" data-on-click="handleCustomAction">
            <i class="ti ti-star"></i>
            Custom Action
        </a>
    `
});

logseq.provideModel({
    handleCustomAction() {
        logseq.UI.showMsg('Custom action executed!', 'success');
    }
});
```

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
