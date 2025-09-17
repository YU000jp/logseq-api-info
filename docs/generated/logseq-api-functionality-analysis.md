# Logseq Application API Functionality Analysis

*Deep analysis of Logseq's core API implementation*

## Overview | 概要

This document provides a comprehensive analysis of the Logseq application's API functionality, extracted directly from the ClojureScript implementation. Unlike the TypeScript SDK documentation, this analyzes the actual core functionality that powers Logseq.

このドキュメントは、ClojureScript実装から直接抽出されたLogseqアプリケーションのAPI機能の包括的な分析を提供します。TypeScript SDKドキュメントとは異なり、Logseqを動かす実際のコア機能を分析します。

## API Statistics | API統計

- **Total Exported Functions**: 68
- **API Modules**: 7
- **Function Categories**: 10

## Core API Categories | コアAPI カテゴリ

### Block Management

*19 functions available*

#### Key Functions

**`convert?to-built-in-property-name`**
- Parameters: `property-name`
- Namespace: `logseq.api.block`
- Source: `api/block.cljs`

**`sanitize-user-property-name`**
- Parameters: `k`
- Namespace: `logseq.api.block`
- Source: `api/block.cljs`

**`resolve-property-prefix-for-db`**
- Parameters: `plugin`
- Namespace: `logseq.api.block`
- Source: `api/block.cljs`

**`get-db-ident-for-user-property-name`**
- Namespace: `logseq.api.block`
- Source: `api/block.cljs`

**`plugin-property-key?`**
- Parameters: `ident`
- Namespace: `logseq.api.block`
- Source: `api/block.cljs`

**`into-readable-db-properties`**
- Parameters: `properties`
- Namespace: `logseq.api.block`
- Source: `api/block.cljs`

**`into-properties`**
- Namespace: `logseq.api.block`
- Source: `api/block.cljs`

**`parse-property-json-value-if-need`**
- Parameters: `ident, property-value`
- Namespace: `logseq.api.block`
- Source: `api/block.cljs`

**`infer-property-value-type-to-save!`**
- Parameters: `ident, value`
- Namespace: `logseq.api.block`
- Source: `api/block.cljs`

**`save-db-based-block-properties!`**
- Namespace: `logseq.api.block`
- Source: `api/block.cljs`

*...and 9 more functions*

---

### Page Operations

*11 functions available*

#### Key Functions

**`get_page`**
- Parameters: `id-or-page-name`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`get_all_pages`**
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`create_page`**
- Parameters: `name, properties, opts`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`create_journal_page`**
- Parameters: `date`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`delete_page`**
- Parameters: `name`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`get_page_properties`**
- Parameters: `id-or-page-name`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`get_page_linked_references`**
- Parameters: `page-name-or-uuid`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`get_pages_from_namespace`**
- Parameters: `ns`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`get_pages_tree_from_namespace`**
- Parameters: `ns`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`download_graph_pages`**
- Namespace: `^:no-doc`
- Source: `api.cljs`

*...and 1 more functions*

---

### Database Queries

*5 functions available*

#### Key Functions

**`datascript_query`**
- Parameters: `query, &, inputs`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`custom_query`**
- Parameters: `query-string`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`download_graph_db`**
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`query_element_rect`**
- Parameters: `selector`
- Namespace: `logseq.sdk.ui`
- Source: `sdk/ui.cljs`

**`query_element_by_id`**
- Parameters: `id`
- Namespace: `logseq.sdk.ui`
- Source: `sdk/ui.cljs`

---

### File System

*5 functions available*

#### Key Functions

**`write_dotdir_file`**
- Parameters: `file, content, sub-root`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`write_assetsdir_file`**
- Parameters: `file, content, sub-root`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`list_files_of_current_graph`**
- Parameters: `exts`
- Namespace: `logseq.sdk.assets`
- Source: `sdk/assets.cljs`

**`load_ignore_file`**
- Namespace: `logseq.sdk.git`
- Source: `sdk/git.cljs`

**`save_ignore_file`**
- Parameters: `content`
- Namespace: `logseq.sdk.git`
- Source: `sdk/git.cljs`

---

### Plugin System

*11 functions available*

#### Key Functions

**`install-plugin-hook`**
- Parameters: `pid, hook, opts`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`uninstall-plugin-hook`**
- Parameters: `pid, hook-or-all`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`should-exec-plugin-hook`**
- Parameters: `pid, hook`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`load_installed_web_plugins`**
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`save_installed_web_plugin`**
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`unlink_installed_web_plugin`**
- Parameters: `key`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`unregister_plugin_simple_command`**
- Parameters: `pid`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`get_external_plugin`**
- Parameters: `pid`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`invoke_external_plugin_cmd`**
- Parameters: `pid, cmd-group, cmd-key, cmd-args`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`validate_external_plugins`**
- Parameters: `urls`
- Namespace: `^:no-doc`
- Source: `api.cljs`

*...and 1 more functions*

---

### UI Components

*10 functions available*

#### Key Functions

**`built_in_open`**
- Parameters: `asset-file`
- Namespace: `logseq.sdk.assets`
- Source: `sdk/assets.cljs`

**`register_fenced_code_renderer`**
- Parameters: `pid, type, opts`
- Namespace: `logseq.sdk.experiments`
- Source: `sdk/experiments.cljs`

**`register_route_renderer`**
- Parameters: `pid, key, opts`
- Namespace: `logseq.sdk.experiments`
- Source: `sdk/experiments.cljs`

**`register_daemon_renderer`**
- Parameters: `pid, key, opts`
- Namespace: `logseq.sdk.experiments`
- Source: `sdk/experiments.cljs`

**`show_msg`**
- Parameters: `&, args`
- Namespace: `logseq.sdk.ui`
- Source: `sdk/ui.cljs`

**`close_msg`**
- Parameters: `key`
- Namespace: `logseq.sdk.ui`
- Source: `sdk/ui.cljs`

**`check_slot_valid`**
- Parameters: `slot`
- Namespace: `logseq.sdk.ui`
- Source: `sdk/ui.cljs`

**`resolve_theme_css_props_vals`**
- Parameters: `props`
- Namespace: `logseq.sdk.ui`
- Source: `sdk/ui.cljs`

**`show_msg`**
- Namespace: `logseq.sdk.ui`
- Source: `sdk/ui.cljs`

**`uuid-or-throw-error`**
- Parameters: `s`
- Namespace: `logseq.sdk.utils`
- Source: `sdk/utils.cljs`

---

### State Management

*4 functions available*

#### Key Functions

**`get_state_from_store`**
- Parameters: `path`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`set_state_from_store`**
- Parameters: `path, value`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`set_focused_settings`**
- Parameters: `pid`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`log_app_state`**
- Parameters: `path`
- Namespace: `^:no-doc`
- Source: `sdk/debug.cljs`

---

### Search Functions

*3 functions available*

#### Key Functions

**`register_search_service`**
- Parameters: `pid, name, opts`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`unregister_search_services`**
- Parameters: `pid`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`search`**
- Parameters: `q', &, [opts`
- Namespace: `^:no-doc`
- Source: `api.cljs`

---

### Utilities

*2 functions available*

#### Key Functions

**`normalize-keyword-for-json`**
- Namespace: `logseq.sdk.utils`
- Source: `sdk/utils.cljs`

**`jsx->clj`**
- Parameters: `obj`
- Namespace: `logseq.sdk.utils`
- Source: `sdk/utils.cljs`

---

### Other

*19 functions available*

#### Key Functions

**`get_app_info`**
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`open_in_right_sidebar`**
- Parameters: `block-id-or-uuid`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`get_property`**
- Parameters: `k`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`upsert_property`**
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`remove_property`**
- Parameters: `k`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`q`**
- Parameters: `query-string`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`exec_git_command`**
- Parameters: `args`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`exper_load_scripts`**
- Parameters: `pid, &, scripts`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`exper_request`**
- Parameters: `pid, options`
- Namespace: `^:no-doc`
- Source: `api.cljs`

**`http_request_abort`**
- Parameters: `req-id`
- Namespace: `^:no-doc`
- Source: `api.cljs`

*...and 9 more functions*

---

