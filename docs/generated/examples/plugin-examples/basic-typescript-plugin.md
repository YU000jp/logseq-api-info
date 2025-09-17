# Basic TypeScript Plugin Example

A complete example of a TypeScript plugin for Logseq with type safety and modern development practices.

## Project Structure

```
my-logseq-plugin/
├── src/
│   └── index.ts
├── package.json
├── tsconfig.json
├── webpack.config.js
└── README.md
```

## Source Code

### src/index.ts

```typescript
import '@logseq/libs'
import { BlockEntity, SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin'

/**
 * Plugin settings schema with TypeScript types
 */
const settingsSchema: SettingSchemaDesc[] = [
  {
    key: 'greeting',
    type: 'string',
    title: 'Greeting Message',
    description: 'Custom greeting message for the plugin',
    default: 'Hello from my plugin!'
  },
  {
    key: 'enableLogging',
    type: 'boolean', 
    title: 'Enable Logging',
    description: 'Enable console logging for debugging',
    default: false
  }
]

/**
 * Main plugin initialization function
 */
async function main() {
  console.log('🚀 My TypeScript Plugin loaded')

  // Apply settings with type safety
  logseq.useSettingsSchema(settingsSchema)

  // Register a slash command with full type checking
  logseq.Editor.registerSlashCommand('My Greeting', async () => {
    const currentBlock: BlockEntity | null = await logseq.Editor.getCurrentBlock()
    
    if (currentBlock) {
      const greeting = logseq.settings?.greeting || 'Hello!'
      const newContent = `${currentBlock.content}\n- ${greeting} 👋`
      
      await logseq.Editor.updateBlock(currentBlock.uuid, newContent)
      
      if (logseq.settings?.enableLogging) {
        console.log('✅ Greeting added to block:', currentBlock.uuid)
      }
    } else {
      logseq.UI.showMsg('Please select a block first', 'warning')
    }
  })

  // Register a UI toolbar item
  logseq.App.registerUIItem('toolbar', {
    key: 'my-plugin-button',
    template: `
      <a class="button" data-on-click="openPluginDialog" title="My Plugin">
        <i class="ti ti-heart"></i>
      </a>
    `
  })

  // Handle UI interactions with type-safe event handling
  logseq.provideModel({
    openPluginDialog() {
      logseq.UI.showMsg(
        logseq.settings?.greeting || 'Hello from my plugin!',
        'success'
      )
    }
  })

  // Register page menu item with typed event handler
  logseq.App.registerPageMenuItem('My Plugin Action', async ({ page }) => {
    const greeting = logseq.settings?.greeting || 'Hello!'
    logseq.UI.showMsg(`${greeting} Page: ${page}`, 'info')
  })

  // Listen to block changes with typed events
  logseq.DB.onChanged(({ blocks, txData }) => {
    if (logseq.settings?.enableLogging && blocks.length > 0) {
      console.log('📝 Blocks changed:', blocks.length)
    }
  })

  // Theme mode change handler
  logseq.App.onThemeModeChanged(({ mode }) => {
    if (logseq.settings?.enableLogging) {
      console.log('🎨 Theme mode changed to:', mode)
    }
  })
}

/**
 * Initialize the plugin with error handling
 */
logseq.ready(main).catch((error) => {
  console.error('❌ Plugin initialization failed:', error)
})
```

### package.json

```json
{
  "name": "my-logseq-plugin",
  "version": "1.0.0",
  "description": "A TypeScript plugin for Logseq",
  "main": "dist/index.js",
  "scripts": {
    "build": "webpack --mode=production",
    "dev": "webpack --mode=development --watch"
  },
  "keywords": ["logseq", "plugin", "typescript"],
  "author": "Your Name",
  "license": "MIT",
  "logseq": {
    "id": "my-typescript-plugin",
    "title": "My TypeScript Plugin",
    "main": "dist/index.js"
  },
  "dependencies": {
    "@logseq/libs": "latest"
  },
  "devDependencies": {
    "typescript": "^4.4.3",
    "webpack": "^5.74.0",
    "webpack-cli": "^4.10.0",
    "ts-loader": "^9.3.1"
  }
}
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext", 
    "lib": ["ESNext", "DOM"],
    "moduleResolution": "node",
    "allowJs": true,
    "jsx": "react",
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "removeComments": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### webpack.config.js

```javascript
const path = require('path')

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: 'commonjs2'
    }
  },
  target: 'node',
  mode: 'development'
}
```

## Development Steps

1. **Initialize Project**
   ```bash
   mkdir my-logseq-plugin
   cd my-logseq-plugin
   npm init -y
   ```

2. **Install Dependencies**
   ```bash
   npm install @logseq/libs
   npm install --save-dev typescript webpack webpack-cli ts-loader
   ```

3. **Setup Configuration**
   - Copy the `tsconfig.json` and `webpack.config.js` files
   - Update `package.json` with scripts and logseq config

4. **Develop Plugin**
   - Write your plugin code in `src/index.ts`
   - Use TypeScript types for full type safety
   - Follow the patterns shown in the example

5. **Build and Test**
   ```bash
   npm run build  # Production build
   npm run dev    # Development with watch mode
   ```

6. **Install in Logseq**
   - Copy the plugin directory to Logseq plugins folder
   - Or create a symlink for development
   - Enable the plugin in Logseq settings

## Key Features Demonstrated

- ✅ **Full TypeScript Support** - Complete type safety
- ✅ **Settings Schema** - User-configurable options
- ✅ **Slash Commands** - Custom editor commands
- ✅ **UI Integration** - Toolbar buttons and interactions
- ✅ **Event Handling** - Database changes and theme events
- ✅ **Error Handling** - Proper error management
- ✅ **Modern Build Setup** - Webpack and TypeScript compilation

## Next Steps

1. Add more complex functionality
2. Integrate with external APIs
3. Create custom UI components
4. Add unit tests
5. Publish to the Logseq marketplace

See the [Plugin API Reference](../plugin-api-reference.md) for complete API documentation.