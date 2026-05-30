# CLAUDE.md

ICHISARA レストランの公式サイト。React + Vite の静的SPA。
データは Google スプレッドシートを `opensheet.elk.sh` 経由で取得（`useSWR`）。
このファイルは、リポジトリ内で作業する際に**必ず守るルール**を定めるものです。

## 技術スタック

- React + Vite（ビルド出力は `dist/`）
- ルーティング: `react-router-dom`（SPA。クライアント側ルーティング）
- データ取得: `useSWR` + `opensheet.elk.sh`、設定は `VITE_SHEET_API`(.env)
- ホスティング: **Firebase Hosting**（コード保管は GitHub）

## ブランチと公開の鉄則（最重要）

- `main` = **本番**。`dev` = **開発・作業用**。
- **`main` に直接コミット・push しない。** 作業は必ず `dev`（または `dev` から切った feature ブランチ）で行う。
- 本番反映は「**`dev` を `main` にマージする**」ことで行う（手動でのファイルコピーはしない）。
- 変更は本番に出す前に、必ず dev 環境（ローカル or プレビューURL）で確認する。

## コマンド

```bash
npm run dev        # ローカル開発: http://localhost:5173
npm run build      # 本番ビルド → dist/

firebase hosting:channel:deploy dev   # dev をプレビューURLに公開（確認用）
firebase deploy                        # 本番に公開（main で実行）
```

## 壊してはいけない設定（デプロイの不変条件）

- **`firebase.json` の SPA rewrite を維持する**。これが無いと `/menu` などの直リンクが404になる:
  ```json
  "rewrites": [{ "source": "**", "destination": "/index.html" }]
  ```
- **`vite.config.js` の `base` は `'/'`**。GitHub Pages 時代の `'/リポジトリ名/'` に戻さないこと（戻すと表示が崩れる）。
- **`.env*` はコミットしない**（`.gitignore` 済み）。環境変数は `VITE_` 接頭辞が必須。CI で使う値は GitHub の Actions Secrets に置く。
- 環境ごとの値: ローカル/開発は `.env.development`、本番ビルドは `.env.production` を使う。

## 変更を加えるときのチェックリスト

1. いま `dev`（または feature ブランチ）にいるか確認する。`main` で作業しない。
2. 変更後 `npm run dev` で動作確認する。
3. ルーティング・`useSWR` でのデータ取得・既存の表示を壊していないか確認する。
4. `npm run build` が通ることを確認する。
5. 必要なら `firebase hosting:channel:deploy dev` でプレビュー確認してから `main` にマージする。

## やってはいけないこと

- `main` への直接コミット／push。
- `firebase.json` の rewrites 削除、`vite.config.js` の `base` 変更。
- `.env` 系ファイルや機密値のコミット。
- 確認なしの本番デプロイ。