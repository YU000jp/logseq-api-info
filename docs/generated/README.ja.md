# Logseq 開発者ドキュメント

*Logseq プラグインおよびテーマ開発のための完全なドキュメント*

## 📚 ドキュメント概要

このディレクトリには、プラグインおよびテーマ開発者を支援するために Logseq コードベースから自動生成されたドキュメントが含まれています。

## 🔌 プラグイン開発

### API リファレンス
- **[Plugin API Reference](./plugin-api-reference.md)** - 完全な TypeScript API ドキュメント
- **[Plugin API Definitions JSON](./plugin-api-definitions.json)** - 機械可読な API 定義

### 主要な API
- **IAppProxy** - アプリケーションレベルの機能
- **IEditorProxy** - エディターとブロック操作
- **IDBProxy** - データベースクエリと操作
- **IUIProxy** - UI コンポーネントとインタラクション

## 🎨 テーマ開発

### CSS リファレンス
- **[CSS Variables Reference](./css-variables-reference.md)** - カスタマイズ可能なすべての CSS 変数
- **[CSS Classes Reference](./css-classes-reference.md)** - 完全なクラスリファレンス
- **[DOM Structure Reference](./dom-structure-reference.md)** - HTML 構造とデータ属性

### 開発ガイド
- **[Theme Development Guide](./theme-development-guide.md)** - 完全なテーマ開発ガイド

## 🛠 開発ツール

### ドキュメント生成
このドキュメントは以下のスクリプトを使用して自動生成されます：

```bash
# すべてのドキュメントを生成
npm run docs:generate

# API ドキュメントのみ生成
node scripts/generate-api-docs.js

# CSS/DOM ドキュメントのみ生成
node scripts/generate-css-docs.js
```

### ビルド統合
これらのスクリプトを `package.json` に追加します：

```json
{
  "scripts": {
    "docs:generate": "node scripts/generate-all-docs.js",
    "docs:api": "node scripts/generate-api-docs.js", 
    "docs:css": "node scripts/generate-css-docs.js"
  }
}
```

## 📖 このドキュメントの使用方法

### プラグイン開発者向け
1. [Plugin API Reference](./plugin-api-reference.md) から始める
2. 型安全性のために TypeScript インターフェースを確認
3. メインリポジトリドキュメントで使用例を確認

### テーマ開発者向け
1. [Theme Development Guide](./theme-development-guide.md) から始める
2. カスタマイズのために [CSS Variables](./css-variables-reference.md) を参照
3. 具体的なスタイリングのために [CSS Classes](./css-classes-reference.md) を使用

### 貢献者向け
1. `scripts/` の生成スクリプトを確認
2. 新しい API が追加されたときにジェネレータを更新
3. コード変更後にドキュメントを再生成

## 🔄 ドキュメントの更新

以下の場合にこのドキュメントを再生成する必要があります：
- 新しいプラグイン API が追加されたとき
- CSS 構造が変更されたとき
- UI コンポーネントが変更されたとき  
- TypeScript インターフェースが更新されたとき

すべてのドキュメントを更新するには `npm run docs:generate` を実行してください。

---

*最終生成日時: 2025-09-17T14:38:10.478Z*
*Logseq コードベースから生成*
