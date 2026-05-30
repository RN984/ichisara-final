# CLAUDE.md

React + Vite SPA（Firebase Hosting）。データは Google スプレッドシート → `opensheet.elk.sh` → `useSWR`（`VITE_SHEET_API`）。

## ブランチ運用

- `main`=本番 / `dev`=開発。**`main` に直接 push しない**。
- 本番反映は `dev` → `main` マージのみ。確認なしのデプロイ禁止。

## コマンド

```bash
npm run dev                              # http://localhost:5173
npm run build                            # dist/ に出力
firebase hosting:channel:deploy dev     # プレビュー確認
firebase deploy                          # 本番公開（main で実行）
```

## ファイルマップ（非自明なものだけ）

- デザイン切り替えエントリー → `src/entry/RootChooser.jsx`（App.jsx=旧 / App2.jsx=新デザイン）
- お知らせ表示（スプレッドシート連動）→ `src/components/Updates.jsx`
- ページ一覧 → `src/pages/` (Home, Menu, Chef, Faq, Gallery)
- ホスティング設定 → `firebase.json` / ビルド設定 → `vite.config.js`

## 不変条件（壊してはいけない）

- `firebase.json` の SPA rewrite を維持。削除すると `/menu` などの直リンクが 404 になる:
  ```json
  "rewrites": [{ "source": "**", "destination": "/index.html" }]
  ```
- `vite.config.js` の `base` は `'/'` 固定（`'/リポジトリ名/'` に戻さない）。
- `.env*` をコミットしない（環境変数は `VITE_` 接頭辞必須。CI 値は Actions Secrets に置く）。
