# Logseq API 情報

<p align="center">
    <a href="https://logseq.com" alt="Logseq Logo">
    <img src="https://user-images.githubusercontent.com/25513724/220608753-f33db466-af72-4611-b603-411440c15ed0.png?sanatize=true" height="120"/></a>
</p>

<h3 align="center">
    Logseq プラグイン・テーマ開発者向け情報ハブ
</h3>

<div align="center">
    <a href="https://logseq.com">Logseq ホーム</a> |
    <a href="https://docs.logseq.com/">ドキュメント</a> |
    <a href="https://plugins-doc.logseq.com/">プラグイン API ドキュメント</a> |
    <a href="https://github.com/logseq/logseq">メインリポジトリ</a>
</div>
<br>

<p align="center">
    <a href="https://github.com/logseq/logseq" alt="Fork of">
        <img src="https://img.shields.io/badge/Fork%20of-logseq/logseq-blue?style=for-the-badge&logo=github"/></a>
    <a href="https://github.com/YU000jp/logseq-api-info/blob/master/LICENSE.md" alt="License">
        <img src="https://img.shields.io/github/license/YU000jp/logseq-api-info?color=%2385c8c8&style=for-the-badge"/></a>
</p>

## 目次

* [🎯 目的](#-目的)
* [🔌 プラグイン開発](#-プラグイン開発)
* [🎨 テーマ開発](#-テーマ開発)
* [📖 リポジトリ情報](#-リポジトリ情報)
* [🚀 はじめ方](#-はじめ方)
* [📚 リソース](#-リソース)

## 🎯 目的

このリポジトリは、**Logseq プラグインおよびテーマ開発者**のための包括的な情報ハブとして機能します。アプリケーションのソースコードを含むメインの Logseq リポジトリとは異なり、このリポジトリは開発者向けに以下の情報提供に焦点を当てています：

- **プラグイン API 解析**：Logseq のプラグイン API の詳細な分析
- **DOM 構造ドキュメント**：テーマ開発のための UI 要素と CSS クラス
- **開発コンテキスト**：アーキテクチャパターン、規約、ベストプラクティス
- **コード例**：一般的なプラグイン開発タスクの実践的な例
- **AI 強化ドキュメント**：AI ツールを活用した Logseq 内部の分析とドキュメント化

### このリポジトリの特徴

- **開発者重視**：拡張機能開発者向けに特別に設計
- **生きたドキュメント**：Logseq のコードベースの継続的な分析と更新
- **AI 支援**：Copilot などの AI ツールを使用した包括的な分析
- **コミュニティ主導**：プラグイン開発コミュニティからの貢献

## 🔌 プラグイン開発

### プラグイン API 概要

Logseq はプラグイン開発者向けに包括的な **JavaScript/TypeScript API** を提供しています。API はグローバルな `logseq` オブジェクトを通じて公開され、完全な TypeScript サポートと型定義を含みます。

#### 主要な API カテゴリ
- **ブロック操作**：ブロックの作成、読み取り、更新、削除
- **ページ管理**：ページの作成、ナビゲーション、メタデータ
- **データベースクエリ**：複雑なデータ取得のための DataScript クエリ
- **UI 統合**：カスタム UI コンポーネントとエディタ拡張
- **イベントシステム**：アプリケーションイベントとユーザーインタラクションへの反応
- **ファイルシステム**：アセット管理とファイル操作
- **設定・構成**：プラグイン設定とユーザー設定

#### TypeScript プラグイン開発

**完全な TypeScript サポート**: このリポジトリには完全な TypeScript SDK（`libs/` ディレクトリ）が含まれます：
- 📘 **完全な型定義**: TypeScript インターフェースと型（`libs/index.d.ts`）
- 🔧 **TypeScript ソース**: TypeScript でのプラグイン API 実装（`libs/src/`）
- ⚙️ **ビルド構成**: すぐに使える `tsconfig.json` とビルドスクリプト
- 🛠️ **開発ツール**: デバッグユーティリティと開発ヘルパー

#### TypeScript プラグイン開発の開始方法

```typescript
// 完全な型安全性を持つ TypeScript プラグイン構造
import { LSPluginBaseInfo, BlockEntity } from '@logseq/libs'

const main = async () => {
  // 型付きスラッシュコマンドの登録
  logseq.Editor.registerSlashCommand('My Command', async () => {
    const block: BlockEntity | null = await logseq.Editor.getCurrentBlock();
    if (block) {
      await logseq.Editor.updateBlock(block.uuid, 'Hello from my TypeScript plugin!');
    }
  });
  
  // 型安全なオプションでUI コンポーネントの登録
  logseq.App.registerUIItem('toolbar', {
    key: 'my-plugin-button',
    template: `<button data-on-click="handleClick">My Plugin</button>`
  });
  
  // 型安全なイベント処理
  logseq.App.onMacroRendererSlotted(({ slot, payload }) => {
    console.log('Slot:', slot, 'Payload:', payload);
  });
}

// エラーハンドリングで初期化
logseq.ready(main).catch(console.error);
```

#### JavaScript プラグイン開発

```javascript
// 基本的な JavaScript プラグイン構造
function main() {
  // スラッシュコマンドの登録
  logseq.Editor.registerSlashCommand('My Command', async () => {
    const block = await logseq.Editor.getCurrentBlock();
    if (block) {
      await logseq.Editor.updateBlock(block.uuid, 'Hello from my plugin!');
    }
  });
  
  // UI コンポーネントの登録
  logseq.App.registerUIItem('toolbar', {
    key: 'my-plugin-button',
    template: `<button onclick="handleClick()">My Plugin</button>`
  });
}

// プラグインの初期化
logseq.ready(main).catch(console.error);
```

### 主要な開発リソース

- **TypeScript SDK**: `libs/` ディレクトリに完全な TypeScript サポート
  - 📘 **型定義**: `libs/index.d.ts` - 完全な API 型
  - 🔧 **ソースコード**: `libs/src/` - TypeScript 実装
  - ⚙️ **設定**: `libs/tsconfig.json` - TypeScript 設定
  - 📦 **パッケージ**: `@logseq/libs` - プラグイン開発用 NPM パッケージ
- **API ドキュメント**：`.copilot/api-info.md` で利用可能
- **コード例**：このリポジトリ全体の TypeScript と JavaScript の実践的な例
  - 📁 **`examples/typescript-plugins/`** - 完全な TypeScript プラグイン例
  - 🔰 **基本プラグイン** - シンプルな TypeScript プラグインテンプレート
  - 🔍 **データベースクエリプラグイン** - 型を使った高度な DataScript クエリ
- **プラグインテンプレート**：一般的なプラグインタイプのスターターテンプレート
- **開発ツール**：デバッグとテストユーティリティ

#### TypeScript 開発セットアップ

1. **SDK のインストール**:
   ```bash
   npm install @logseq/libs
   # または
   yarn add @logseq/libs
   ```

2. **TypeScript 設定** (`tsconfig.json`):
   ```json
   {
     "compilerOptions": {
       "target": "ESNext",
       "module": "ESNext",
       "moduleResolution": "node",
       "allowJs": true,
       "jsx": "react",
       "declaration": true,
       "esModuleInterop": true,
       "skipLibCheck": true
     },
     "include": ["src/**/*.ts"]
   }
   ```

3. **プラグインマニフェスト** (`package.json`):
   ```json
   {
     "logseq": {
       "id": "your-plugin-id",
       "title": "Your Plugin Title",
       "main": "dist/index.js"
     },
     "main": "dist/index.js",
     "dependencies": {
       "@logseq/libs": "latest"
     }
   }
   ```

## 🎨 テーマ開発

### CSS アーキテクチャ

Logseq は主要なスタイリングフレームワークとして **TailwindCSS** を使用し、以下を提供します：
- **ユーティリティクラス**：包括的なユーティリティクラスセット
- **カスタムプロパティ**：テーマカスタマイズのための CSS 変数
- **ダーク/ライトモード**：組み込みのテーマ切り替えサポート
- **コンポーネントスタイル**：Logseq 固有の UI コンポーネントクラス

#### テーマ構造

```css
/* メインテーマカスタマイズ */
.light-theme, .dark-theme {
  /* カラースキーム変数 */
  --ls-primary-background-color: #ffffff;
  --ls-secondary-background-color: #f7f7f7;
  --ls-tertiary-background-color: #eeeeee;
  
  /* テキストカラー */
  --ls-primary-text-color: #433e38;
  --ls-secondary-text-color: #7c7c7c;
  
  /* アクセントカラー */
  --ls-active-primary-color: #045591;
  --ls-active-secondary-color: #866300;
}

/* コンポーネント固有のスタイリング */
.block-content { /* ブロックスタイリング */ }
.page-title { /* ページタイトルスタイリング */ }
.sidebar { /* サイドバースタイリング */ }
```

### テーマ開発ワークフロー

1. **既存テーマの分析**：パターンを理解するため人気テーマを研究
2. **CSS クラスの特定**：ブラウザ開発者ツールを使用して構造を理解
3. **カスタム CSS の作成**：テーマでデフォルトスタイルを上書き
4. **モード間のテスト**：ダーク/ライトモードとの互換性を確保
5. **パッケージ化と配布**：マーケットプレイス用のテーマパッケージを作成

## 📖 リポジトリ情報

### リポジトリ構造

これはメインの [logseq/logseq](https://github.com/logseq/logseq) リポジトリの**フォーク**で、以下を含みます：

- **完全なソースコード**：完全な Logseq アプリケーションソース
- **分析ドキュメント**：`.copilot/` ディレクトリ内
- **開発者リソース**：例、ガイド、リファレンス
- **コミュニティ貢献**：プラグイン開発リソース

### 開発者向け主要ディレクトリ

- **`src/main/logseq/`** - プラグイン API 実装
- **`src/main/frontend/`** - コアアプリケーションコード
- **`deps/`** - モジュラーライブラリとユーティリティ
- **`packages/`** - UI コンポーネントとフレームワーク
- **`.copilot/`** - 開発者向けドキュメントと分析

### 技術スタック

- **フロントエンド**：ClojureScript + React（Rum 経由）
- **データベース**：DataScript（グラフデータベース）
- **スタイリング**：TailwindCSS + PostCSS
- **デスクトップ**：Electron
- **モバイル**：Capacitor
- **ビルド**：Shadow-cljs + Webpack

## 🚀 はじめ方

### プラグイン開発者向け

1. **API を学習**：包括的な API ドキュメントについては `.copilot/api-info.md` を確認
2. **言語を選択**：
   - **TypeScript**: 型安全性のために [TypeScript テンプレート](https://github.com/logseq/logseq-plugin-template-typescript) を使用
   - **JavaScript**: シンプルさのために [JavaScript テンプレート](https://github.com/logseq/logseq-plugin-template) を使用
3. **依存関係をインストール**: TypeScript サポートや API アクセスのために `@logseq/libs` を追加
4. **例を探索**：コミュニティのプラグイン例と `libs/src/` ディレクトリを見る
5. **コミュニティに参加**：Discord で他の開発者とつながる

### テーマ開発者向け

1. **CSS 構造を理解**：`.copilot/development-context.md` を確認
2. **既存テーマの分析**：インスピレーションのため人気テーマを研究
3. **開発者ツールを使用**：Logseq の DOM 構造を検査
4. **カスタムスタイルを作成**：テーマでデフォルト CSS を上書き

### 貢献者向け

1. **コードベースを探索**：`.copilot/` ディレクトリのドキュメントを使用
2. **アーキテクチャを理解**：技術スタックとパターンを確認
3. **貢献する**：例、ドキュメント、分析を追加
4. **知識を共有**：コミュニティの他の開発者を支援

## 📚 リソース

### 公式リソース
- **[Logseq メインリポジトリ](https://github.com/logseq/logseq)** - メインアプリケーションソースコード
- **[プラグイン API ドキュメント](https://plugins-doc.logseq.com/)** - 公式 API ドキュメント
- **[Logseq ドキュメント](https://docs.logseq.com/)** - ユーザードキュメントとガイド
- **[Awesome Logseq](https://github.com/logseq/awesome-logseq)** - コミュニティ拡張機能とリソース

### コミュニティリソース
- **[Discord](https://discord.gg/KpN4eHY)** - コミュニティチャットに参加
- **[フォーラム](https://discuss.logseq.com/)** - コミュニティディスカッションとサポート
- **[プラグインマーケットプレイス](https://github.com/logseq/marketplace)** - プラグインの閲覧と投稿
- **[テーマギャラリー](https://github.com/logseq/awesome-logseq#-themes)** - コミュニティテーマ

### 開発者ツール
- **[プラグインテンプレート (JavaScript)](https://github.com/logseq/logseq-plugin-template)** - 公式 JavaScript プラグインスターターテンプレート
- **[TypeScript プラグインテンプレート](https://github.com/logseq/logseq-plugin-template-typescript)** - 公式 TypeScript プラグインテンプレート
- **[プラグイン SDK](https://github.com/logseq/logseq-plugin-sdk)** - 開発ツールとユーティリティ
- **[Vite プラグインテンプレート](https://github.com/logseq/vite-plugin-template)** - Vite を使ったモダンなプラグイン開発テンプレート
- **[@logseq/libs](https://www.npmjs.com/package/@logseq/libs)** - NPM の TypeScript SDK パッケージ
- **[プラグインサンプル](https://github.com/logseq/logseq-plugin-samples)** - プラグインの例とコードサンプル

---

*このリポジトリは Logseq 開発者向けのコミュニティリソースとして維持されています。メインの Logseq アプリケーションについては、[logseq/logseq](https://github.com/logseq/logseq) をご覧ください。*