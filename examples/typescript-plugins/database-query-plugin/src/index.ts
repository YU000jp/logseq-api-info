import '@logseq/libs'

/**
 * Database Query TypeScript Plugin for Logseq
 * 
 * This example demonstrates:
 * - Type-safe DataScript queries
 * - Complex database operations
 * - Generic query result handling
 * - Advanced filtering and searching
 */

interface BlockData {
  uuid: string
  content: string
  createdAt: number
  updatedAt: number
  page: { name: string }
  properties?: Record<string, any>
}

interface QueryResult<T> {
  data: T[]
  count: number
  executionTime: number
}

interface TagStatistic {
  tag: string
  count: number
  percentage: number
}

/**
 * Generic query executor with type safety
 */
async function executeQuery<T>(
  query: string,
  description: string
): Promise<QueryResult<T>> {
  const startTime = Date.now()
  
  try {
    console.log(`🔍 Executing query: ${description}`)
    console.log(`📝 Query: ${query}`)
    
    const result = await logseq.DB.datascriptQuery<T[]>(query)
    const executionTime = Date.now() - startTime
    
    console.log(`✅ Query completed in ${executionTime}ms`)
    
    return {
      data: result || [],
      count: result?.length || 0,
      executionTime
    }
  } catch (error) {
    console.error(`❌ Query failed: ${description}`, error)
    throw new Error(`Query execution failed: ${error}`)
  }
}

/**
 * Format query results for display
 */
function formatQueryResults<T>(
  results: QueryResult<T>,
  title: string,
  formatter: (item: T) => string
): string {
  const header = [
    `## 📊 ${title}`,
    `- **Found:** ${results.count} items`,
    `- **Execution time:** ${results.executionTime}ms`,
    `- **Generated:** ${new Date().toLocaleString()}`,
    ''
  ].join('\n')

  if (results.count === 0) {
    return header + '*No results found.*'
  }

  const items = results.data
    .slice(0, 20) // Limit to first 20 results
    .map((item, index) => `${index + 1}. ${formatter(item)}`)
    .join('\n')

  const footer = results.count > 20 
    ? `\n\n*Showing first 20 of ${results.count} results...*`
    : ''

  return header + items + footer
}

async function main() {
  console.log('🔍 Database Query TypeScript Plugin loaded')

  // Query recent blocks (last 7 days)
  logseq.Editor.registerSlashCommand('Query Recent Blocks', async () => {
    try {
      const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000)
      
      const query = `
        [:find (pull ?b [*])
         :where 
         [?b :block/uuid]
         [?b :block/created-at ?created]
         [(> ?created ${sevenDaysAgo})]]
      `

      const results = await executeQuery<BlockData>(
        query,
        'Recent blocks from last 7 days'
      )

      const formatted = formatQueryResults(
        results,
        'Recent Blocks (Last 7 Days)',
        (block: BlockData) => 
          `[[${block.page.name}]] - ${block.content.substring(0, 100)}${
            block.content.length > 100 ? '...' : ''
          }`
      )

      const currentBlock = await logseq.Editor.getCurrentBlock()
      if (currentBlock) {
        await logseq.Editor.insertBlock(
          currentBlock.uuid,
          formatted,
          { sibling: false }
        )
      }

      logseq.App.showMsg(`Found ${results.count} recent blocks! 📅`, 'success')
    } catch (error) {
      console.error('Error querying recent blocks:', error)
      logseq.App.showMsg('Failed to query recent blocks', 'error')
    }
  })

  // Query blocks by property
  logseq.Editor.registerSlashCommand('Query by Property', async () => {
    try {
      // This query finds blocks with any properties
      const query = `
        [:find (pull ?b [* {:block/page [:page/name]}])
         :where 
         [?b :block/properties ?props]
         [(> (count ?props) 0)]]
      `

      const results = await executeQuery<BlockData>(
        query,
        'Blocks with properties'
      )

      const formatted = formatQueryResults(
        results,
        'Blocks with Properties',
        (block: BlockData) => {
          const propKeys = Object.keys(block.properties || {})
          return `[[${block.page.name}]] - Properties: ${propKeys.join(', ')}`
        }
      )

      const currentBlock = await logseq.Editor.getCurrentBlock()
      if (currentBlock) {
        await logseq.Editor.insertBlock(
          currentBlock.uuid,
          formatted,
          { sibling: false }
        )
      }

      logseq.App.showMsg(`Found ${results.count} blocks with properties! 🏷️`, 'success')
    } catch (error) {
      console.error('Error querying blocks by property:', error)
      logseq.App.showMsg('Failed to query blocks by property', 'error')
    }
  })

  // Query TODO items
  logseq.Editor.registerSlashCommand('Query Todo Items', async () => {
    try {
      const query = `
        [:find (pull ?b [* {:block/page [:page/name]}])
         :where 
         [?b :block/marker ?marker]
         [(contains? #{"TODO" "DOING" "LATER" "NOW"} ?marker)]]
      `

      const results = await executeQuery<BlockData>(
        query,
        'TODO/DOING items'
      )

      const formatted = formatQueryResults(
        results,
        'Todo Items',
        (block: BlockData) => 
          `[[${block.page.name}]] - ${block.content}`
      )

      const currentBlock = await logseq.Editor.getCurrentBlock()
      if (currentBlock) {
        await logseq.Editor.insertBlock(
          currentBlock.uuid,
          formatted,
          { sibling: false }
        )
      }

      logseq.App.showMsg(`Found ${results.count} todo items! ✅`, 'success')
    } catch (error) {
      console.error('Error querying todo items:', error)
      logseq.App.showMsg('Failed to query todo items', 'error')
    }
  })

  // Analyze tag usage statistics
  logseq.Editor.registerSlashCommand('Query Tag Statistics', async () => {
    try {
      // Query to find all tags
      const query = `
        [:find ?tag (count ?b)
         :where 
         [?b :block/refs ?r]
         [?r :page/name ?tag]
         [?r :page/namespace ?ns]
         [(= ?ns nil)]] ; Only pages, not namespaced pages
      `

      interface TagCount {
        tag: string
        count: number
      }

      const rawResults = await logseq.DB.datascriptQuery<[string, number][]>(query)
      
      if (!rawResults) {
        logseq.App.showMsg('No tag data found', 'warning')
        return
      }

      // Process and sort results
      const totalTags = rawResults.reduce((sum, [, count]) => sum + count, 0)
      const tagStats: TagStatistic[] = rawResults
        .map(([tag, count]) => ({
          tag,
          count,
          percentage: Math.round((count / totalTags) * 100)
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 15) // Top 15 tags

      const formatted = [
        `## 📈 Tag Usage Statistics`,
        `- **Total tag references:** ${totalTags}`,
        `- **Unique tags:** ${rawResults.length}`,
        `- **Generated:** ${new Date().toLocaleString()}`,
        '',
        '### Top Tags:',
        ...tagStats.map((stat, index) => 
          `${index + 1}. #${stat.tag} - ${stat.count} uses (${stat.percentage}%)`
        )
      ].join('\n')

      const currentBlock = await logseq.Editor.getCurrentBlock()
      if (currentBlock) {
        await logseq.Editor.insertBlock(
          currentBlock.uuid,
          formatted,
          { sibling: false }
        )
      }

      logseq.App.showMsg(`Analyzed ${rawResults.length} unique tags! 📊`, 'success')
    } catch (error) {
      console.error('Error analyzing tag statistics:', error)
      logseq.App.showMsg('Failed to analyze tag statistics', 'error')
    }
  })

  // Plugin ready notification
  logseq.App.showMsg('🔍 Database Query Plugin is ready!', 'success')
  console.log('Available commands: Query Recent Blocks, Query by Property, Query Todo Items, Query Tag Statistics')
}

// Initialize plugin with proper error handling
logseq.ready(main).catch((error) => {
  console.error('Failed to initialize Database Query plugin:', error)
})