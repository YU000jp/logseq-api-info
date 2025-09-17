# Basic TypeScript Plugin Example

This example demonstrates the fundamentals of TypeScript plugin development for Logseq.

## Features

- ✅ Full TypeScript type safety
- ✅ Slash command registration
- ✅ Block manipulation
- ✅ Settings configuration
- ✅ Error handling
- ✅ Build configuration

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

## Project Structure

```
basic-typescript-plugin/
├── src/
│   └── index.ts          # Main plugin entry point
├── dist/                 # Built output
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## Code Explanation

The plugin demonstrates:

1. **Type-safe API usage** - All Logseq APIs are fully typed
2. **Slash command registration** - Add custom commands to the editor
3. **Block manipulation** - Create and update blocks with type safety
4. **Settings schema** - Configure plugin settings with validation
5. **Error handling** - Proper async/await error handling

## Customization

Modify `src/index.ts` to add your own functionality:
- Add more slash commands
- Implement different block operations
- Add UI components
- Integrate with external APIs

## Build Process

The TypeScript compiler (`tsc`) transforms the TypeScript source into JavaScript that Logseq can execute. The type information is stripped away, but provides compile-time safety during development.