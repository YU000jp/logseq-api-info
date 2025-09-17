import '@logseq/libs'

/**
 * Basic TypeScript Plugin for Logseq
 * 
 * This example demonstrates:
 * - Type-safe API usage
 * - Slash command registration
 * - Block manipulation
 * - Settings configuration
 * - Error handling
 */

interface PluginSettings {
  greeting: string
  autoInsertTimestamp: boolean
  customPrefix: string
}

async function main() {
  console.log('📝 Basic TypeScript Plugin loaded')

  // Configure plugin settings with full type safety
  logseq.useSettingsSchema([
    {
      key: 'greeting',
      type: 'string',
      title: 'Greeting Message',
      description: 'Custom greeting message for commands',
      default: 'Hello from TypeScript!'
    },
    {
      key: 'autoInsertTimestamp',
      type: 'boolean',
      title: 'Auto Insert Timestamp',
      description: 'Automatically add timestamp to inserted blocks',
      default: true
    },
    {
      key: 'customPrefix',
      type: 'string',
      title: 'Custom Prefix',
      description: 'Prefix for generated content',
      default: '🚀'
    }
  ])

  // Type-safe settings access
  const getSettings = (): PluginSettings => {
    return {
      greeting: logseq.settings?.greeting || 'Hello from TypeScript!',
      autoInsertTimestamp: logseq.settings?.autoInsertTimestamp ?? true,
      customPrefix: logseq.settings?.customPrefix || '🚀'
    }
  }

  // Register slash command with full type safety
  logseq.Editor.registerSlashCommand('TypeScript Greeting', async () => {
    try {
      const settings = getSettings()
      const currentBlock = await logseq.Editor.getCurrentBlock()
      
      if (!currentBlock) {
        logseq.App.showMsg('No current block found', 'warning')
        return
      }

      // Generate content with timestamp if enabled
      const timestamp = settings.autoInsertTimestamp 
        ? new Date().toLocaleString() 
        : ''
      
      const content = [
        settings.customPrefix,
        settings.greeting,
        timestamp && `(${timestamp})`
      ].filter(Boolean).join(' ')

      // Type-safe block update
      await logseq.Editor.updateBlock(
        currentBlock.uuid,
        `${currentBlock.content}\n- ${content}`
      )

      logseq.App.showMsg('Greeting added successfully! ✨', 'success')
    } catch (error) {
      console.error('Error in TypeScript Greeting command:', error)
      logseq.App.showMsg('Failed to add greeting', 'error')
    }
  })

  // Register block transformation command
  logseq.Editor.registerSlashCommand('TS Block Info', async () => {
    try {
      const currentBlock = await logseq.Editor.getCurrentBlock()
      
      if (!currentBlock) {
        logseq.App.showMsg('No current block found', 'warning')
        return
      }

      // Type-safe block analysis
      const blockInfo = {
        uuid: currentBlock.uuid,
        content: currentBlock.content,
        format: currentBlock.format,
        hasProperties: Boolean(currentBlock.properties),
        wordCount: currentBlock.content.split(/\s+/).length,
        characterCount: currentBlock.content.length
      }

      const infoText = [
        `📊 **Block Analysis**`,
        `- UUID: \`${blockInfo.uuid}\``,
        `- Format: ${blockInfo.format}`,
        `- Words: ${blockInfo.wordCount}`,
        `- Characters: ${blockInfo.characterCount}`,
        `- Has properties: ${blockInfo.hasProperties ? 'Yes' : 'No'}`,
        `- Analyzed at: ${new Date().toLocaleString()}`
      ].join('\n')

      await logseq.Editor.insertBlock(
        currentBlock.uuid,
        infoText,
        { sibling: false }
      )

      logseq.App.showMsg('Block info added! 📊', 'success')
    } catch (error) {
      console.error('Error in TS Block Info command:', error)
      logseq.App.showMsg('Failed to analyze block', 'error')
    }
  })

  // Register page-level command
  logseq.Editor.registerSlashCommand('TS Page Summary', async () => {
    try {
      const currentPage = await logseq.Editor.getCurrentPage()
      
      if (!currentPage) {
        logseq.App.showMsg('No current page found', 'warning')
        return
      }

      // Type-safe page information
      const pageBlocks = await logseq.Editor.getPageBlocksTree(currentPage.name)
      const blockCount = pageBlocks.length

      const summary = [
        `📄 **Page Summary: ${currentPage.name}**`,
        `- Total blocks: ${blockCount}`,
        `- Page ID: ${currentPage.id}`,
        `- Original name: ${currentPage.originalName}`,
        `- Generated: ${new Date().toLocaleString()}`
      ].join('\n')

      const currentBlock = await logseq.Editor.getCurrentBlock()
      if (currentBlock) {
        await logseq.Editor.updateBlock(
          currentBlock.uuid,
          `${currentBlock.content}\n${summary}`
        )
      }

      logseq.App.showMsg(`Page summary generated! Found ${blockCount} blocks`, 'success')
    } catch (error) {
      console.error('Error in TS Page Summary command:', error)
      logseq.App.showMsg('Failed to generate page summary', 'error')
    }
  })

  // Plugin ready notification
  logseq.App.showMsg('🎉 Basic TypeScript Plugin is ready!', 'success')
}

// Initialize plugin with proper error handling
logseq.ready(main).catch((error) => {
  console.error('Failed to initialize TypeScript plugin:', error)
})