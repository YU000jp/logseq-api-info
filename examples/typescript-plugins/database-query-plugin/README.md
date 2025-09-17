# Database Query TypeScript Plugin Example

This example demonstrates advanced database querying with full TypeScript type safety.

## Features

- ✅ Type-safe DataScript queries
- ✅ Complex block searching and filtering
- ✅ Generic query result handling
- ✅ Property-based filtering
- ✅ Date range queries
- ✅ Advanced error handling
- ✅ Query result visualization

## What You'll Learn

1. **DataScript Integration** - How to use Logseq's graph database
2. **Type-Safe Queries** - Writing queries with TypeScript generics
3. **Result Processing** - Handling and transforming query results
4. **Performance Optimization** - Efficient querying techniques
5. **User Interface** - Displaying query results to users

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the plugin:**
   ```bash
   npm run build
   ```

3. **Load in Logseq:**
   - Open Logseq
   - Go to Settings > Advanced > Developer mode
   - Add this directory as a plugin

## Available Commands

- `/Query Recent Blocks` - Find blocks created in the last 7 days
- `/Query by Property` - Search blocks by property values
- `/Query Todo Items` - Find all TODO/DOING items
- `/Query Tag Statistics` - Analyze tag usage across your graph

## Code Highlights

The plugin showcases:

- **Generic query functions** for reusable database operations
- **Type-safe result handling** with proper TypeScript interfaces
- **Complex filtering logic** using DataScript's power
- **Error boundaries** for robust query execution
- **Result formatting** for user-friendly display

This example is perfect for understanding how to build data-driven plugins that leverage Logseq's graph database capabilities.