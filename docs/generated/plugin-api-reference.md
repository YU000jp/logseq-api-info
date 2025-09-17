# Logseq Plugin API Reference

*Auto-generated from TypeScript definitions*

## Table of Contents

- [Interfaces](#interfaces)
- [Type Aliases](#type-aliases)
- [Classes](#classes)

## Interfaces

### AppGraphInfo

*Source: `LSPlugin.ts`*

#### Properties

| Name | Type | Optional | Description |
|------|------|----------|-------------|
| `name` | `string` | No | |
| `url` | `string` | No | |
| `path` | `string` | No | |
| `key` | `string]: unknown` | No | |

#### Full Definition

```typescript
export interface AppGraphInfo {
  name: string
  url: string
  path: string

  [key: string]: unknown
}
```

---

### AppInfo

*Source: `LSPlugin.ts`*

#### Properties

| Name | Type | Optional | Description |
|------|------|----------|-------------|
| `version` | `string` | No | |
| `supportDb` | `boolean` | No | |
| `key` | `string]: unknown` | No | |

#### Full Definition

```typescript
export interface AppInfo {
  version: string
  supportDb: boolean

  [key: string]: unknown
}
```

---

### AppUserConfigs

*Source: `LSPlugin.ts`*

#### Properties

| Name | Type | Optional | Description |
|------|------|----------|-------------|
| `preferredThemeMode` | `ThemeMode` | No | |
| `preferredFormat` | `'markdown' | 'org'` | No | |
| `preferredDateFormat` | `string` | No | |
| `preferredStartOfWeek` | `string` | No | |
| `preferredLanguage` | `string` | No | |
| `preferredWorkflow` | `string` | No | |
| `currentGraph` | `string` | No | |
| `showBracket` | `boolean` | No | |
| `enabledFlashcards` | `boolean` | No | |
| `enabledJournals` | `boolean` | No | |
| `key` | `string]: unknown` | No | |

#### Full Definition

```typescript
export interface AppUserConfigs {
  preferredThemeMode: ThemeMode
  preferredFormat: 'markdown' | 'org'
  preferredDateFormat: string
  preferredStartOfWeek: string
  preferredLanguage: string
  preferredWorkflow: string

  currentGraph: string
  showBracket: boolean
  enabledFlashcards: boolean
  enabledJournals: boolean

  [key: string]: unknown
}
```

---

### AppUserInfo

*Source: `LSPlugin.ts`*

#### Properties

| Name | Type | Optional | Description |
|------|------|----------|-------------|
| `key` | `string]: any` | No | |

#### Full Definition

```typescript
export interface AppUserInfo {
  [key: string]: any
}
```

---

### BlockEntity

*Source: `LSPlugin.ts`*

#### Properties

| Name | Type | Optional | Description |
|------|------|----------|-------------|
| `id` | `EntityID // db id` | No | |
| `uuid` | `BlockUUID` | No | |
| `order` | `string` | No | |
| `format` | `'markdown' | 'org'` | No | |
| `parent` | `IEntityID` | No | |
| `title` | `string` | No | |
| `content` | `string // @deprecated. Use :title instead!` | Yes | |
| `page` | `IEntityID // owner page` | No | |
| `createdAt` | `number` | No | |
| `updatedAt` | `number` | No | |
| `ident` | `string // ident for property block` | Yes | |
| `properties` | `Record<string, any>` | Yes | |
| `anchor` | `string` | Yes | |
| `body` | `any` | Yes | |
| `children` | `Array<BlockEntity | BlockUUIDTuple>` | Yes | |
| `container` | `string` | Yes | |
| `file` | `IEntityID` | Yes | |
| `level` | `number` | Yes | |
| `meta` | `{ timestamps: any; properties: any; startPos: number; endPos: number` | Yes | |

#### Full Definition

```typescript
export interface BlockEntity {
  id: EntityID // db id
  uuid: BlockUUID
  order: string
  format: 'markdown' | 'org'
  parent: IEntityID
  title: string
  content?: string // @deprecated. Use :title instead!
  page: IEntityID // owner page
  createdAt: number
  updatedAt: number
  ident?: string // ident for property block
  properties?: Record<string, any>
  'collapsed?': boolean

  // optional fields in dummy page
  anchor?: string
  body?: any
  children?: Array<BlockEntity | BlockUUIDTuple>
  container?: string
  file?: IEntityID
  level?: number
  meta?: { timestamps: any; properties: any; startPos: number; endPos: number }
```

---

### IAppProxy

*Source: `LSPlugin.ts`*

#### Properties

| Name | Type | Optional | Description |
|------|------|----------|-------------|
| `registerCommand` | `(` | No | |
| `type` | `string` | No | |
| `opts` | `{` | No | |
| `key` | `string` | No | |
| `label` | `string` | No | |
| `desc` | `string` | Yes | |
| `palette` | `boolean` | Yes | |
| `keybinding` | `SimpleCommandKeybinding` | Yes | |

#### Methods

##### registerSearchService

```typescript
registerSearchService(s: T): void
```

#### Full Definition

```typescript
export interface IAppProxy {
  /**
   * @added 0.0.4
   * @param key
   */
  getInfo: (key?: keyof AppInfo) => Promise<AppInfo | any>

  getUserInfo: () => Promise<AppUserInfo | null>
  getUserConfigs: () => Promise<AppUserConfigs>

  // services
  registerSearchService<T extends IPluginSearchServiceHooks>(s: T): void

  // commands
  registerCommand: (
    type: string,
    opts: {
      key: string
      label: string
      desc?: string
      palette?: boolean
      keybinding?: SimpleCommandKeybinding
    }
```

---

### IAssetsProxy

*Source: `LSPlugin.ts`*

#### Properties

| Name | Type | Optional | Description |
|------|------|----------|-------------|
| `path` | `string` | No | |
| `size` | `number` | No | |
| `accessTime` | `number` | No | |
| `modifiedTime` | `number` | No | |
| `changeTime` | `number` | No | |
| `birthTime` | `number` | No | |

#### Methods

##### listFilesOfCurrentGraph

```typescript
listFilesOfCurrentGraph(exts?: string | string[]): Promise<
```

#### Full Definition

```typescript
export interface IAssetsProxy {
  /**
   * @added 0.0.2
   * @param exts
   */
  listFilesOfCurrentGraph(exts?: string | string[]): Promise<
    Array<{
      path: string
      size: number
      accessTime: number
      modifiedTime: number
      changeTime: number
      birthTime: number
    }
```

---

### IAsyncStorage

*Source: `modules/LSPlugin.Storage.ts`*

#### Methods

##### getItem

```typescript
getItem(key: string): Promise<string | undefined>
```

##### setItem

```typescript
setItem(key: string, value: string): Promise<void>
```

##### removeItem

```typescript
removeItem(key: string): Promise<void>
```

##### hasItem

```typescript
hasItem(key: string): Promise<boolean>
```

##### allKeys

```typescript
allKeys(): Promise<Array<string>>
```

##### clear

```typescript
clear(): Promise<void>
```

#### Full Definition

```typescript
export interface IAsyncStorage {
  getItem(key: string): Promise<string | undefined>

  setItem(key: string, value: string): Promise<void>

  removeItem(key: string): Promise<void>

  hasItem(key: string): Promise<boolean>

  allKeys(): Promise<Array<string>>

  clear(): Promise<void>
}
```

---

### IDBProxy

*Source: `LSPlugin.ts`*

#### Properties

| Name | Type | Optional | Description |
|------|------|----------|-------------|
| `onChanged` | `IUserHook<{` | No | |
| `blocks` | `Array<BlockEntity>` | No | |
| `txData` | `Array<IDatom>` | No | |
| `txMeta` | `{ outlinerOp: string; [key: string]: any` | Yes | |

#### Full Definition

```typescript
export interface IDBProxy {
  /**
   * Run a DSL query
   * @link https://docs.logseq.com/#/page/queries
   * @param dsl
   */
  q: <T = any>(dsl: string) => Promise<Array<T> | null>

  /**
   * Run a datascript query
   */
  datascriptQuery: <T = any>(query: string, ...inputs: Array<any>) => Promise<T>

  /**
   * Hook all transaction data of DB
   *
   * @added 0.0.2
   */
  onChanged: IUserHook<{
    blocks: Array<BlockEntity>
    txData: Array<IDatom>
    txMeta?: { outlinerOp: string; [key: string]: any }
```

---

### IEditorProxy

*Source: `LSPlugin.ts`*

#### Full Definition

```typescript
export interface IEditorProxy extends Record<string, any> {
  /**
   * register a custom command which will be added to the Logseq slash command list
   * @param tag - displayed name of command
   * @param action - can be a single callback function to run when the command is called, or an array of fixed commands with arguments
   *
   *
   * @example https://github.com/logseq/logseq-plugin-samples/tree/master/logseq-slash-commands
   *
   * @example
   * ```ts
   * logseq.Editor.registerSlashCommand("Say Hi", () => {
   *   console.log('Hi!')
   * }
```

---

### IGitProxy

*Source: `LSPlugin.ts`*

#### Full Definition

```typescript
export interface IGitProxy {
  /**
   * @added 0.0.2
   * @link https://github.com/desktop/dugite/blob/master/docs/api/exec.md
   * @param args
   */
  execCommand: (args: string[]) => Promise<IGitResult>

  loadIgnoreFile: () => Promise<string>
  saveIgnoreFile: (content: string) => Promise<void>
}
```

---

### ILSPluginThemeManager

*Source: `LSPlugin.ts`*

#### Properties

| Name | Type | Optional | Description |
|------|------|----------|-------------|
| `opt` | `Theme | LegacyTheme` | No | |
| `options` | `{ effect?: boolean; emit?: boolean` | No | |

#### Methods

##### get

```typescript
get(): Map<PluginLocalIdentity, Theme[]>
```

##### registerTheme

```typescript
registerTheme(id: PluginLocalIdentity, opt: Theme): Promise<void>
```

##### unregisterTheme

```typescript
unregisterTheme(id: PluginLocalIdentity, effect?: boolean): Promise<void>
```

#### Full Definition

```typescript
export interface ILSPluginThemeManager {
  get themes(): Map<PluginLocalIdentity, Theme[]>

  registerTheme(id: PluginLocalIdentity, opt: Theme): Promise<void>

  unregisterTheme(id: PluginLocalIdentity, effect?: boolean): Promise<void>

  selectTheme(
    opt: Theme | LegacyTheme,
    options: { effect?: boolean; emit?: boolean }
```

---

### ILSPluginUser

*Source: `LSPlugin.ts`*

#### Properties

| Name | Type | Optional | Description |
|------|------|----------|-------------|
| `connected` | `boolean` | No | |
| `caller` | `LSPluginCaller` | No | |
| `baseInfo` | `LSPluginBaseInfo` | No | |
| `settings` | `LSPluginBaseInfo['settings']` | Yes | |

#### Methods

##### ready

```typescript
ready(model?: Record<string, any>): Promise<any>
```

#### Full Definition

```typescript
export interface ILSPluginUser extends EventEmitter<LSPluginUserEvents> {
  /**
   * Connection status with the main app
   */
  connected: boolean

  /**
   * Duplex message caller
   */
  caller: LSPluginCaller

  /**
   * The plugin configurations from package.json
   */
  baseInfo: LSPluginBaseInfo

  /**
   * The plugin user settings
   */
  settings?: LSPluginBaseInfo['settings']

  /**
   * The main Logseq app is ready to run the plugin
   *
   * @param model - same as the model in `provideModel`
   */
  ready(model?: Record<string, any>): Promise<any>

  /**
   * @param callback - a function to run when the main Logseq app is ready
   */
  ready(callback?: (e: any) => void | {}
```

---

### IPluginSearchServiceHooks

*Source: `LSPlugin.ts`*

#### Properties

| Name | Type | Optional | Description |
|------|------|----------|-------------|
| `name` | `string` | No | |
| `options` | `Record<string, any>` | Yes | |
| `onQuery` | `(` | No | |
| `graph` | `string` | No | |
| `key` | `string` | No | |
| `opts` | `Partial<{ limit: number` | No | |

#### Full Definition

```typescript
export interface IPluginSearchServiceHooks {
  name: string
  options?: Record<string, any>

  onQuery: (
    graph: string,
    key: string,
    opts: Partial<{ limit: number }
```

---

### IUIProxy

*Source: `LSPlugin.ts`*

#### Properties

| Name | Type | Optional | Description |
|------|------|----------|-------------|
| `showMsg` | `(` | No | |
| `content` | `string` | No | |
| `status` | `'success' | 'warning' | 'error' | string` | Yes | |
| `opts` | `Partial<UIMsgOptions>` | Yes | |

#### Full Definition

```typescript
export interface IUIProxy {
  showMsg: (
    content: string,
    status?: 'success' | 'warning' | 'error' | string,
    opts?: Partial<UIMsgOptions>
  ) => Promise<UIMsgKey>
  closeMsg: (key: UIMsgKey) => void
  queryElementRect: (selector: string) => Promise<DOMRectReadOnly | null>
  queryElementById: (id: string) => Promise<string | boolean>
  checkSlotValid: (slot: UISlotIdentity['slot']) => Promise<boolean>
  resolveThemeCssPropsVals: (props: string | Array<string>) => Promise<Record<string, string | undefined> | null>
}
```

---

### IUtilsProxy

*Source: `LSPlugin.ts`*

#### Properties

| Name | Type | Optional | Description |
|------|------|----------|-------------|
| `toJs` | `<R = unknown>(obj: {` | No | |

#### Full Definition

```typescript
export interface IUtilsProxy {
  toJs: <R = unknown>(obj: {}
```

---

### LegacyTheme

*Source: `LSPlugin.ts`*

#### Properties

| Name | Type | Optional | Description |
|------|------|----------|-------------|
| `name` | `string` | No | |
| `url` | `string` | No | |
| `description` | `string` | Yes | |
| `mode` | `ThemeMode` | Yes | |
| `pid` | `PluginLocalIdentity` | No | |

#### Full Definition

```typescript
export interface LegacyTheme {
  name: string
  url: string
  description?: string
  mode?: ThemeMode
  pid: PluginLocalIdentity
}
```

---

### LSPluginBaseInfo

*Source: `LSPlugin.ts`*

#### Properties

| Name | Type | Optional | Description |
|------|------|----------|-------------|
| `id` | `string` | No | |
| `mode` | `'shadow' | 'iframe'` | No | |
| `settings` | `{` | No | |
| `disabled` | `boolean` | No | |

#### Full Definition

```typescript
export interface LSPluginBaseInfo {
  /**
   * Must be unique.
   */
  id: string
  mode: 'shadow' | 'iframe'
  settings: {
    disabled: boolean
  }
```

---

### LSPluginPkgConfig

*Source: `LSPlugin.ts`*

#### Properties

| Name | Type | Optional | Description |
|------|------|----------|-------------|
| `id` | `PluginLocalIdentity` | No | |
| `main` | `string` | No | |
| `entry` | `string // alias of main` | No | |
| `title` | `string` | No | |
| `mode` | `'shadow' | 'iframe'` | No | |
| `themes` | `Theme[]` | No | |
| `icon` | `string` | No | |
| `devEntry` | `unknown` | No | |
| `theme` | `unknown` | No | |

#### Full Definition

```typescript
export interface LSPluginPkgConfig {
  id: PluginLocalIdentity
  main: string
  entry: string // alias of main
  title: string
  mode: 'shadow' | 'iframe'
  themes: Theme[]
  icon: string
  /**
   * Alternative entrypoint for development.
   */
  devEntry: unknown
  /**
   * For legacy themes, do not use.
   */
  theme: unknown
}
```

---

### PageEntity

*Source: `LSPlugin.ts`*

#### Properties

| Name | Type | Optional | Description |
|------|------|----------|-------------|
| `id` | `EntityID` | No | |
| `uuid` | `BlockUUID` | No | |
| `name` | `string` | No | |
| `format` | `'markdown' | 'org'` | No | |
| `type` | `'page' | 'journal' | 'whiteboard' | 'class' | 'property' | 'hidden'` | No | |
| `updatedAt` | `number` | No | |
| `createdAt` | `number` | No | |
| `title` | `string` | Yes | |
| `file` | `IEntityID` | Yes | |
| `originalName` | `string` | Yes | |
| `namespace` | `IEntityID` | Yes | |
| `children` | `Array<PageEntity>` | Yes | |
| `properties` | `Record<string, any>` | Yes | |
| `journalDay` | `number` | Yes | |
| `key` | `string]: unknown` | No | |

#### Full Definition

```typescript
export interface PageEntity {
  id: EntityID
  uuid: BlockUUID
  name: string
  format: 'markdown' | 'org'
  type: 'page' | 'journal' | 'whiteboard' | 'class' | 'property' | 'hidden'
  updatedAt: number
  createdAt: number
  'journal?': boolean

  title?: string
  file?: IEntityID
  originalName?: string
  namespace?: IEntityID
  children?: Array<PageEntity>
  properties?: Record<string, any>
  journalDay?: number

  [key: string]: unknown
}
```

---

### Theme

*Source: `LSPlugin.ts`*

#### Properties

| Name | Type | Optional | Description |
|------|------|----------|-------------|
| `mode` | `ThemeMode` | No | |

#### Full Definition

```typescript
export interface Theme extends LegacyTheme {
  mode: ThemeMode
}
```

---

## Type Aliases

### BlockIdentity

*Source: `LSPlugin.ts`*

```typescript
export type BlockIdentity = BlockUUID | Pick<BlockEntity, 'uuid'>
export type BlockPageName = string
export type PageIdentity = BlockPageName | BlockIdentity
export type SlashCommandActionCmd =
  | 'editor/input'
  | 'editor/hook'
  | 'editor/clear-current-slash'
  | 'editor/restore-saved-cursor'
export type SlashCommandAction = [cmd: SlashCommandActionCmd, ...args: any]
export type SimpleCommandCallback<E = any> = (e: IHookEvent & E) => void
export type BlockCommandCallback = (
  e: IHookEvent & { uuid: BlockUUID }
) => Promise<void>
export type BlockCursorPosition = {
  left: number
  top: number
  height: number
  pos: number
  rect: DOMRect
}

export type Keybinding = string | Array<string>
export type SimpleCommandKeybinding = {
  mode?: 'global' | 'non-editing' | 'editing'
  binding: Keybinding
  mac?: string // special for Mac OS
}

export type SettingSchemaDesc = {
  key: string
  type: 'string' | 'number' | 'boolean' | 'enum' | 'object' | 'heading'
  default: string | number | boolean | Array<any> | object | null
  title: string
  description: string // support markdown
  inputAs?: 'color' | 'date' | 'datetime-local' | 'range' | 'textarea'
  enumChoices?: Array<string>
  enumPicker?: 'select' | 'radio' | 'checkbox' // default: select
}

export type ExternalCommandType =
  | 'logseq.command/run'
  | 'logseq.editor/cycle-todo'
  | 'logseq.editor/down'
  | 'logseq.editor/up'
  | 'logseq.editor/expand-block-children'
  | 'logseq.editor/collapse-block-children'
  | 'logseq.editor/open-file-in-default-app'
  | 'logseq.editor/open-file-in-directory'
  | 'logseq.editor/select-all-blocks'
  | 'logseq.editor/toggle-open-blocks'
  | 'logseq.editor/zoom-in'
  | 'logseq.editor/zoom-out'
  | 'logseq.editor/indent'
  | 'logseq.editor/outdent'
  | 'logseq.editor/copy'
  | 'logseq.editor/cut'
  | 'logseq.go/home'
  | 'logseq.go/journals'
  | 'logseq.go/keyboard-shortcuts'
  | 'logseq.go/next-journal'
  | 'logseq.go/prev-journal'
  | 'logseq.go/search'
  | 'logseq.go/tomorrow'
  | 'logseq.go/backward'
  | 'logseq.go/forward'
  | 'logseq.search/re-index'
  | 'logseq.sidebar/clear'
  | 'logseq.sidebar/open-today-page'
  | 'logseq.ui/goto-plugins'
  | 'logseq.ui/select-theme-color'
  | 'logseq.ui/toggle-brackets'
  | 'logseq.ui/toggle-contents'
  | 'logseq.ui/toggle-document-mode'
  | 'logseq.ui/toggle-help'
  | 'logseq.ui/toggle-left-sidebar'
  | 'logseq.ui/toggle-right-sidebar'
  | 'logseq.ui/toggle-settings'
  | 'logseq.ui/toggle-theme'
  | 'logseq.ui/toggle-wide-mode'

export type UserProxyNSTags = 'app' | 'editor' | 'db' | 'git' | 'ui' | 'assets' | 'utils'

export type SearchIndiceInitStatus = boolean
export type SearchBlockItem = {
  id: EntityID
  uuid: BlockIdentity
  content: string
  page: EntityID
}
export type SearchPageItem = string
export type SearchFileItem = string

export interface IPluginSearchServiceHooks {
  name: string
  options?: Record<string, any>

  onQuery: (
    graph: string,
    key: string,
    opts: Partial<{ limit: number }>
  ) => Promise<{
    graph: string
    key: string
    blocks?: Array<Partial<SearchBlockItem>>
    pages?: Array<SearchPageItem>
    files?: Array<SearchFileItem>
  }>

  onIndiceInit: (graph: string) => Promise<SearchIndiceInitStatus>
  onIndiceReset: (graph: string) => Promise<void>
  onBlocksChanged: (
    graph: string,
    changes: {
      added: Array<SearchBlockItem>
      removed: Array<EntityID>
    }
  ) => Promise<void>
  onGraphRemoved: (graph: string, opts?: {}) => Promise<any>
}

/**
 * App level APIs
 */
export interface IAppProxy {
  /**
   * @added 0.0.4
   * @param key
   */
  getInfo: (key?: keyof AppInfo) => Promise<AppInfo | any>

  getUserInfo: () => Promise<AppUserInfo | null>
  getUserConfigs: () => Promise<AppUserConfigs>

  // services
  registerSearchService<T extends IPluginSearchServiceHooks>(s: T): void

  // commands
  registerCommand: (
    type: string,
    opts: {
      key: string
      label: string
      desc?: string
      palette?: boolean
      keybinding?: SimpleCommandKeybinding
    },
    action: SimpleCommandCallback
  ) => void

  registerCommandPalette: (
    opts: {
      key: string
      label: string
      keybinding?: SimpleCommandKeybinding
    },
    action: SimpleCommandCallback
  ) => void

  /**
   * Supported key names
   * @link https://gist.github.com/xyhp915/d1a6d151a99f31647a95e59cdfbf4ddc
   * @param keybinding
   * @param action
   */
  registerCommandShortcut: (
    keybinding: SimpleCommandKeybinding | string,
    action: SimpleCommandCallback,
    opts?: Partial<{
      key: string
      label: string
      desc: string
      extras: Record<string, any>
    }>
  ) => void

  /**
   * Supported all registered palette commands
   * @param type
   * @param args
   */
  invokeExternalCommand: (
    type: ExternalCommandType,
    ...args: Array<any>
  ) => Promise<void>

  /**
   * Call external plugin command provided by models or registered commands
   * @added 0.0.13
   * @param type `xx-plugin-id.commands.xx-key`, `xx-plugin-id.models.xx-key`
   * @param args
   */
  invokeExternalPlugin: (type: string, ...args: Array<any>) => Promise<unknown>

  /**
   * @added 0.0.13
   * @param pid
   */
  getExternalPlugin: (pid: string) => Promise<{} | null>

  /**
   * Get state from app store
   * valid state is here
   * https://github.com/logseq/logseq/blob/master/src/main/frontend/state.cljs#L27
   *
   * @example
   * ```ts
   * const isDocMode = await logseq.App.getStateFromStore('document/mode?')
   * ```
   * @param path
   */
  getStateFromStore: <T = any>(path: string | Array<string>) => Promise<T>
  setStateFromStore: (path: string | Array<string>, value: any) => Promise<void>

  // native
  relaunch: () => Promise<void>
  quit: () => Promise<void>
  openExternalLink: (url: string) => Promise<void>

  /**
   * @deprecated Using `logseq.Git.execCommand`
   * @link https://github.com/desktop/dugite/blob/master/docs/api/exec.md
   * @param args
   */
  execGitCommand: (args: string[]) => Promise<string>

  // graph
  getCurrentGraph: () => Promise<AppGraphInfo | null>
  checkCurrentIsDbGraph: () => Promise<Boolean>
  getCurrentGraphConfigs: (...keys: string[]) => Promise<any>
  setCurrentGraphConfigs: (configs: {}) => Promise<void>
  getCurrentGraphFavorites: () => Promise<Array<string | PageEntity> | null>
  getCurrentGraphRecent: () => Promise<Array<string | PageEntity> | null>
  getCurrentGraphTemplates: () => Promise<Record<string, BlockEntity> | null>

  // router
  pushState: (
    k: string,
    params?: Record<string, any>,
    query?: Record<string, any>
  ) => void
  replaceState: (
    k: string,
    params?: Record<string, any>,
    query?: Record<string, any>
  ) => void

  // templates
  getTemplate: (name: string) => Promise<BlockEntity | null>
  existTemplate: (name: string) => Promise<Boolean>
  createTemplate: (
    target: BlockUUID,
    name: string,
    opts?: { overwrite: boolean }
  ) => Promise<any>
  removeTemplate: (name: string) => Promise<any>
  insertTemplate: (target: BlockUUID, name: string) => Promise<any>

  setZoomFactor: (factor: number) => void
  setFullScreen: (flag: boolean | 'toggle') => void
  setLeftSidebarVisible: (flag: boolean | 'toggle') => void
  setRightSidebarVisible: (flag: boolean | 'toggle') => void
  clearRightSidebarBlocks: (opts?: { close: boolean }) => void

  registerUIItem: (
    type: 'toolbar' | 'pagebar',
    opts: { key: string;
```

---

### IBatchBlock

*Source: `LSPlugin.ts`*

```typescript
export type IBatchBlock = {
  content: string

  /**
   * @NOTE: not supported for DB graph
   */
  properties?: Record<string, any>

  children?: Array<IBatchBlock>
}
export type IDatom = [e: number, a: string, v: any, t: number, added: boolean]

export type IGitResult = { stdout: string;
```

---

### LSPluginUserEvents

*Source: `LSPlugin.ts`*

```typescript
export type LSPluginUserEvents = 'ui:visible:changed' | 'settings:changed'

export interface ILSPluginUser extends EventEmitter<LSPluginUserEvents> {
  /**
   * Connection status with the main app
   */
  connected: boolean

  /**
   * Duplex message caller
   */
  caller: LSPluginCaller

  /**
   * The plugin configurations from package.json
   */
  baseInfo: LSPluginBaseInfo

  /**
   * The plugin user settings
   */
  settings?: LSPluginBaseInfo['settings']

  /**
   * The main Logseq app is ready to run the plugin
   *
   * @param model - same as the model in `provideModel`
   */
  ready(model?: Record<string, any>): Promise<any>

  /**
   * @param callback - a function to run when the main Logseq app is ready
   */
  ready(callback?: (e: any) => void | {}): Promise<any>

  ready(
    model?: Record<string, any>,
    callback?: (e: any) => void | {}
  ): Promise<any>

  beforeunload: (callback: () => Promise<void>) => void

  /**
   * Create a object to hold the methods referenced in `provideUI`
   *
   * @example
   * ```ts
   * logseq.provideModel({
   *  openCalendar () {
   *    console.log('Open the calendar!')
   *  }
   * })
   * ```
   */
  provideModel(model: Record<string, any>): this

  /**
   * Set the theme for the main Logseq app
   */
  provideTheme(theme: Theme): this

  /**
   * Inject custom css for the main Logseq app
   *
   * @example https://github.com/logseq/logseq-plugin-samples/tree/master/logseq-awesome-fonts
   * @example
   * ```ts
   *   logseq.provideStyle(`
   *    @import url("https://at.alicdn.com/t/font_2409735_r7em724douf.css");
```

---

### PluginLocalIdentity

*Source: `LSPlugin.ts`*

```typescript
export type PluginLocalIdentity = string

export type ThemeMode = 'light' | 'dark'

export interface LegacyTheme {
  name: string
  url: string
  description?: string
  mode?: ThemeMode
  pid: PluginLocalIdentity
}

export interface Theme extends LegacyTheme {
  mode: ThemeMode
}

export type StyleString = string
export type StyleOptions = {
  key?: string
  style: StyleString
}

export type UIContainerAttrs = {
  draggable: boolean
  resizable: boolean
}

export type UIBaseOptions = {
  key?: string
  replace?: boolean
  template: string | null
  style?: CSS.Properties
  attrs?: Record<string, string>
  close?: 'outside' | string
  reset?: boolean // reset slot content or not
}

export type UIPathIdentity = {
  /**
   * DOM selector
   */
  path: string
}

export type UISlotIdentity = {
  /**
   * Slot key
   */
  slot: string
}

export type UISlotOptions = UIBaseOptions & UISlotIdentity

export type UIPathOptions = UIBaseOptions & UIPathIdentity

export type UIOptions = UIBaseOptions | UIPathOptions | UISlotOptions

export interface LSPluginPkgConfig {
  id: PluginLocalIdentity
  main: string
  entry: string // alias of main
  title: string
  mode: 'shadow' | 'iframe'
  themes: Theme[]
  icon: string
  /**
   * Alternative entrypoint for development.
   */
  devEntry: unknown
  /**
   * For legacy themes, do not use.
   */
  theme: unknown
}

export interface LSPluginBaseInfo {
  /**
   * Must be unique.
   */
  id: string
  mode: 'shadow' | 'iframe'
  settings: {
    disabled: boolean
  } & Record<string, unknown>
  effect: boolean
  /**
   * For internal use only. Indicates if plugin is installed in dot root.
   */
  iir: boolean
  /**
   * For internal use only.
   */
  lsr: string
}

export type IHookEvent = {
  [key: string]: any
}

export type IUserOffHook = () => void
export type IUserHook<E = any, R = IUserOffHook> = (
  callback: (e: IHookEvent & E) => void
) => IUserOffHook
export type IUserSlotHook<E = any> = (
  callback: (e: IHookEvent & UISlotIdentity & E) => void
) => void
export type IUserConditionSlotHook<C = any, E = any> = (
  condition: C,
  callback: (e: IHookEvent & UISlotIdentity & E) => void
) => void

export type EntityID = number
export type BlockUUID = string
export type BlockUUIDTuple = ['uuid', BlockUUID]

export type IEntityID = { id: EntityID;
```

---

### PostMateOptions

*Source: `postmate/index.ts`*

```typescript
export type PostMateOptions = {
  container: HTMLElement
  url: string
  id?: string
  classListArray?: Array<string>
  name?: string
  model?: any
}

/**
 * The entry point of the Parent.
 */
export class Postmate {
  static debug = false // eslint-disable-line no-undef
  public container?: HTMLElement
  public parent: Window
  public frame: HTMLIFrameElement
  public child?: Window
  public childOrigin?: string
  public url: string
  public model: any
  static Model: any

  /**
   * @param opts
   */
  constructor(opts: PostMateOptions) {
    this.container = opts.container
    this.url = opts.url
    this.parent = window
    this.frame = document.createElement('iframe')
    if (opts.id) this.frame.id = opts.id
    if (opts.name) this.frame.name = opts.name
    this.frame.classList.add.apply(
      this.frame.classList,
      opts.classListArray || []
    )
    this.container.appendChild(this.frame)
    this.child = this.frame.contentWindow
    this.model = opts.model || {}
  }

  /**
   * Begins the handshake strategy
   * @param  {String} url The URL to send a handshake request to
   * @return {Promise}     Promise that resolves when the handshake is complete
   */
  sendHandshake(url?: string) {
    url = url || this.url
    const childOrigin = resolveOrigin(url)
    let attempt = 0
    let responseInterval
    return new Promise((resolve, reject) => {
      const reply = (e: any) => {
        if (!sanitize(e, childOrigin)) return false
        if (e.data.postmate === 'handshake-reply') {
          clearInterval(responseInterval)
          if (process.env.NODE_ENV !== 'production') {
            log('Parent: Received handshake reply from Child')
          }
          this.parent.removeEventListener('message', reply, false)
          this.childOrigin = e.origin
          if (process.env.NODE_ENV !== 'production') {
            log('Parent: Saving Child origin', this.childOrigin)
          }
          return resolve(new ParentAPI(this))
        }

        // Might need to remove since parent might be receiving different messages
        // from different hosts
        if (process.env.NODE_ENV !== 'production') {
          log('Parent: Invalid handshake reply')
        }
        return reject('Failed handshake')
      }

      this.parent.addEventListener('message', reply, false)

      const doSend = () => {
        attempt++
        if (process.env.NODE_ENV !== 'production') {
          log(`Parent: Sending handshake attempt ${attempt}`, { childOrigin })
        }
        this.child.postMessage(
          {
            postmate: 'handshake',
            type: messageType,
            model: this.model,
          },
          childOrigin
        )

        if (attempt === maxHandshakeRequests) {
          clearInterval(responseInterval)
        }
      }

      const loaded = () => {
        doSend()
        responseInterval = setInterval(doSend, 500)
      }

      this.frame.addEventListener('load', loaded)

      if (process.env.NODE_ENV !== 'production') {
        log('Parent: Loading frame', { url })
      }
      this.frame.src = url
    })
  }

  destroy() {
    if (process.env.NODE_ENV !== 'production') {
      log('Postmate: Destroying Postmate instance')
    }
    this.frame.parentNode.removeChild(this.frame)
  }
}

/**
 * The entry point of the Child
 */
export class Model {
  public child: Window
  public model: any
  public parent: Window
  public parentOrigin: string

  /**
   * Initializes the child, model, parent, and responds to the Parents handshake
   * @param {Object} model Hash of values, functions, or promises
   * @return {Promise}       The Promise that resolves when the handshake has been received
   */
  constructor(model) {
    this.child = window
    this.model = model
    this.parent = this.child.parent
  }

  /**
   * Responds to a handshake initiated by the Parent
   * @return {Promise} Resolves an object that exposes an API for the Child
   */
  sendHandshakeReply() {
    return new Promise((resolve, reject) => {
      const shake = (e: MessageEvent<any>) => {
        if (!e.data.postmate) {
          return
        }
        if (e.data.postmate === 'handshake') {
          if (process.env.NODE_ENV !== 'production') {
            log('Child: Received handshake from Parent')
          }
          this.child.removeEventListener('message', shake, false)
          if (process.env.NODE_ENV !== 'production') {
            log('Child: Sending handshake reply to Parent')
          }
          ;
```

---

### UIMsgOptions

*Source: `LSPlugin.ts`*

```typescript
export type UIMsgOptions = {
  key: string
  timeout: number // milliseconds. `0` indicate that keep showing
}

export type UIMsgKey = UIMsgOptions['key']

export interface IUIProxy {
  showMsg: (
    content: string,
    status?: 'success' | 'warning' | 'error' | string,
    opts?: Partial<UIMsgOptions>
  ) => Promise<UIMsgKey>
  closeMsg: (key: UIMsgKey) => void
  queryElementRect: (selector: string) => Promise<DOMRectReadOnly | null>
  queryElementById: (id: string) => Promise<string | boolean>
  checkSlotValid: (slot: UISlotIdentity['slot']) => Promise<boolean>
  resolveThemeCssPropsVals: (props: string | Array<string>) => Promise<Record<string, string | undefined> | null>
}

export interface IUtilsProxy {
  toJs: <R = unknown>(obj: {}) => Promise<R>
}

/**
 * Assets related APIs
 */
export interface IAssetsProxy {
  /**
   * @added 0.0.2
   * @param exts
   */
  listFilesOfCurrentGraph(exts?: string | string[]): Promise<
    Array<{
      path: string
      size: number
      accessTime: number
      modifiedTime: number
      changeTime: number
      birthTime: number
    }>
  >

  /**
   * @example https://github.com/logseq/logseq/pull/6488
   * @added 0.0.10
   */
  makeSandboxStorage(): IAsyncStorage

  /**
   * make assets scheme url based on current graph
   * @added 0.0.15
   * @param path
   */
  makeUrl(path: string): Promise<string>

  /**
   * try to open asset type file in Logseq app
   * @added 0.0.16
   * @param path
   */
  builtInOpen(path: string): Promise<boolean | undefined>
}

export interface ILSPluginThemeManager {
  get themes(): Map<PluginLocalIdentity, Theme[]>

  registerTheme(id: PluginLocalIdentity, opt: Theme): Promise<void>

  unregisterTheme(id: PluginLocalIdentity, effect?: boolean): Promise<void>

  selectTheme(
    opt: Theme | LegacyTheme,
    options: { effect?: boolean;
```

---

## Classes

### ChildAPI

*Source: `postmate/index.ts`*

---

### LSPluginExperiments

*Source: `modules/LSPlugin.Experiments.ts`*

---

### LSPluginRequest

*Source: `modules/LSPlugin.Request.ts`*

---

### LSPluginSearchService

*Source: `modules/LSPlugin.Search.ts`*

---

### LSPluginUser

*Source: `LSPlugin.user.ts`*

---

### Model

*Source: `postmate/index.ts`*

---

### ParentAPI

*Source: `postmate/index.ts`*

---

### PluginLogger

*Source: `helpers.ts`*

---

### Postmate

*Source: `postmate/index.ts`*

---

