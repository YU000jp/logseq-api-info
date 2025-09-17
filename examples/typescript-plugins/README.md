# TypeScript Plugin Examples

This directory contains practical TypeScript plugin examples for Logseq development.

## Available Examples

### 1. [Basic TypeScript Plugin](./basic-typescript-plugin/)
Perfect for beginners learning TypeScript plugin development.

**Features:**
- ✅ Slash command registration
- ✅ Type-safe block manipulation
- ✅ Settings configuration
- ✅ Error handling
- ✅ Build configuration

**Use Cases:**
- Learning the basics of plugin development
- Understanding TypeScript integration
- Template for simple plugins

### 2. [Database Query Plugin](./database-query-plugin/)
Advanced example demonstrating DataScript queries with full type safety.

**Features:**
- ✅ Complex database queries
- ✅ Generic query result handling
- ✅ Tag and property analysis
- ✅ Performance optimization
- ✅ Data visualization

**Use Cases:**
- Building data-driven plugins
- Analytics and reporting
- Advanced search functionality
- Graph analysis tools

## Quick Start Guide

1. **Choose an Example**
   - Start with `basic-typescript-plugin` if you're new to plugin development
   - Try `database-query-plugin` for advanced database operations

2. **Setup Development Environment**
   ```bash
   cd [example-directory]
   npm install
   npm run build
   ```

3. **Load in Logseq**
   - Open Logseq
   - Go to Settings → Advanced → Developer mode
   - Add the plugin directory

4. **Test the Plugin**
   - Try the slash commands in a Logseq block
   - Check the console for debug information
   - Modify the code and rebuild to experiment

## Development Tips

### TypeScript Benefits
- **Type Safety**: Catch errors at compile time
- **IntelliSense**: Better IDE support and autocomplete
- **Refactoring**: Safe code refactoring with type guarantees
- **Documentation**: Types serve as inline documentation

### Best Practices
1. **Use Strict TypeScript**: Enable strict mode for better type checking
2. **Handle Errors Properly**: Use try-catch blocks for async operations
3. **Provide User Feedback**: Use `logseq.App.showMsg()` for status updates
4. **Type Your Data**: Define interfaces for complex data structures
5. **Test Thoroughly**: Test edge cases and error conditions

### Common Patterns

#### Safe Block Access
```typescript
const currentBlock = await logseq.Editor.getCurrentBlock()
if (!currentBlock) {
  logseq.App.showMsg('No current block found', 'warning')
  return
}
```

#### Type-Safe Settings
```typescript
interface PluginSettings {
  option1: string
  option2: boolean
}

const settings: PluginSettings = {
  option1: logseq.settings?.option1 || 'default',
  option2: logseq.settings?.option2 ?? true
}
```

#### Generic Database Queries
```typescript
async function executeQuery<T>(query: string): Promise<T[]> {
  return await logseq.DB.datascriptQuery<T[]>(query) || []
}
```

## Next Steps

After exploring these examples, consider:

1. **Building Your Own Plugin**: Use these examples as templates
2. **Contributing**: Share your plugins with the community
3. **Advanced Features**: Explore UI components, themes, and external integrations
4. **Community**: Join the Logseq Discord for plugin development discussions

For more information, see the main repository documentation and the official [Logseq Plugin API docs](https://plugins-doc.logseq.com/).