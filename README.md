# ビンゴカード

Figmaデザインを基にしたアクセシブルな5×5ビンゴカードのReact実装です。

## 機能

- **5×5グリッド**: 25個のセルからなるビンゴカード
- **FREEマス**: 中央のセルは常に選択状態
- **クリック選択**: セルをクリックして選択/解除
- **ビンゴ判定**: 横・縦・斜めのライン完成を自動検出
- **リーチ検出**: 4/5達成ラインの表示
- **カウンター**: リーチ数とビンゴ数の表示
- **リセット機能**: カードを初期状態に戻す（新しい番号で再生成）
- **多言語対応**: 日本語/英語の切り替え機能

## アクセシビリティ機能

### WCAG 2.2 準拠
- **キーボード操作**: Tab、Enter、Spaceキーでの操作
- **スクリーンリーダー対応**: ARIA属性による適切な情報提供
- **コントラスト比**: 4.5:1以上の色彩設計
- **フォーカス表示**: 明確なフォーカスインジケーター

### WAI-ARIA 実装
- `role="application"`: ビンゴカード全体
- `role="grid"`: グリッド構造
- `role="gridcell"`: 各セル
- `aria-label`: 詳細な説明
- `aria-selected`: 選択状態
- `aria-live="polite"`: ビンゴ達成の通知

### ユーザビリティ配慮
- **高コントラストモード**: システム設定に対応
- **動きを減らす設定**: アニメーション無効化
- **レスポンシブデザイン**: モバイル端末対応

## 技術仕様

- **React 18**: 関数コンポーネント + Hooks
- **CSS**: バニラCSS（Tailwind不使用）
- **フォント**: Inter（Figmaデザイン準拠）
- **ブラウザ対応**: モダンブラウザ
- **Fisher-Yates アルゴリズム**: 重複のない数字生成

## 起動方法

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm start
```

ブラウザで `http://localhost:3000` を開いてください。

## 参考資料

- [WCAG 2.2](https://waic.jp/translations/WCAG22/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [eslint jsx a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/)
