# Google作業報告自動入力 Chrome拡張機能

## 📋 概要

このChrome拡張機能は、Googleフォームでの作業報告入力を自動化し、日々の作業報告業務を効率化することを目的としています。特定のGoogleフォームにアクセスした際に、事前に設定したユーザー情報を自動で入力し、作業日を今日の日付に設定します。

## ✨ 主な機能

### 自動入力機能
- **メールアドレス確認**: 返信表示用のメールアドレス（masaru.takeyoshi@aitravel.jp）のチェックボックスを自動チェック
- **名前入力**: 事前に設定したユーザー名を自動入力
- **作業日設定**: 作業日を今日の日付（YYYY-MM-DD形式）に自動設定

### 設定機能
- **ユーザー名設定**: 拡張機能のポップアップから名前を設定・保存
- **設定保存**: Chrome拡張機能のストレージに設定を永続化

## 🚀 インストール方法

### 開発者モードでのインストール
1. Chromeブラウザで `chrome://extensions/` にアクセス
2. 右上の「デベロッパーモード」をオンにする
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. このプロジェクトのフォルダを選択

## 🔧 使用方法

### 初期設定
1. Chrome拡張機能アイコンをクリック（またはツールバーから選択）
2. ポップアップが表示されるので、「名前（自動入力用）」欄に自分の名前を入力
3. 「設定を保存」ボタンをクリック
4. 「設定を保存しました！」のメッセージが表示されれば設定完了

### 自動入力の実行
1. 対象のGoogleフォーム（https://docs.google.com/forms/d/e/1FAIpQLSchhGFYZ1w4QX_kOFG_bRdTeYK2K7nSCRrNZrgthSpjLRcbGQ/viewform）にアクセス
2. ページが読み込まれると自動的に以下の処理が実行されます：
   - メールアドレスのチェックボックスにチェックが入る
   - 設定した名前が名前欄に自動入力される
   - 作業日が今日の日付に設定される
3. 必要に応じて他の項目を手動で入力し、フォームを送信

## 📁 ファイル構成

```
google_work_report_automation/
├── manifest.json          # Chrome拡張機能の設定ファイル
├── content.js            # フォーム自動入力のメインスクリプト
├── popup.html            # 設定画面のHTML
├── popup.js              # 設定画面のJavaScript
├── background.js         # バックグラウンドスクリプト（必要に応じて）
└── README.md             # このファイル
```

## 🔍 技術仕様

### 対応ブラウザ
- Google Chrome（Manifest V3対応）

### 権限
- `storage`: 設定データの保存
- `activeTab`: アクティブなタブへのアクセス
- `scripting`: スクリプトの実行
- `https://docs.google.com/forms/*`: Googleフォームへのアクセス

### 対象フォーム
- URL: `https://docs.google.com/forms/d/e/1FAIpQLSchhGFYZ1w4QX_kOFG_bRdTeYK2K7nSCRrNZrgthSpjLRcbGQ/viewform`

## 🛠️ 開発者向け情報

### ファイル詳細

#### manifest.json
Chrome拡張機能の設定ファイル。Manifest V3形式で作成されています。

#### content.js
- フォーム自動入力のメインロジック
- ページロード時に対象フォームを検出し、1秒後に自動入力を実行
- エラーハンドリングを含む

#### popup.html / popup.js
- 設定画面のUI
- ユーザー名の設定・保存機能
- Chrome storage APIを使用した設定の永続化

### 主要なセレクター
- **メールチェックボックス**: `div[jsname="MPu53c"][aria-label*="返信に表示するメールアドレスとして masaru.takeyoshi@aitravel.jp を記録する"]`
- **名前入力欄**: `input.whsOnd.zHQkBf[jsname="YPqjbf"][aria-labelledby*="i8"]`
- **日付入力欄**: `input[type="date"].whsOnd.zHQkBf`

### カスタマイズ方法

#### 対象フォームの変更
`content.js`の`FORM_URL`定数を変更してください：
```javascript
const FORM_URL = '新しいフォームのURL';
```

#### 自動入力項目の追加
`content.js`の`autoFillForm()`関数内に新しい入力処理を追加してください：
```javascript
// 新しい項目の自動入力
const newField = document.querySelector('セレクター');
if (newField) {
    newField.value = '値';
    newField.dispatchEvent(new Event('input', { bubbles: true }));
}
```

## 🐛 トラブルシューティング

### よくある問題

#### 自動入力が動作しない
- **原因**: フォームの構造が変更された可能性
- **解決方法**: 開発者ツールでセレクターを確認し、`content.js`のセレクターを更新

#### 設定が保存されない
- **原因**: Chrome拡張機能の権限が不足している可能性
- **解決方法**: 拡張機能を再インストールし、権限を確認

#### 名前が入力されない
- **原因**: 設定画面で名前が保存されていない
- **解決方法**: 拡張機能のポップアップから名前を再設定

### デバッグ方法
1. Chromeの開発者ツールを開く（F12）
2. Consoleタブでエラーメッセージを確認
3. `content.js`のconsole.logメッセージを確認

## 📝 更新履歴

### v1.0
- 初回リリース
- 基本的な自動入力機能を実装
- 設定画面を追加

## 👥 開発チーム

このプロジェクトは作業報告業務の効率化を目的として開発されました。

## 📄 ライセンス

このプロジェクトは社内利用を目的としています。

---

## 🔗 関連リンク

- [Chrome拡張機能開発ガイド](https://developer.chrome.com/docs/extensions/)
- [Manifest V3移行ガイド](https://developer.chrome.com/docs/extensions/mv3/intro/)
