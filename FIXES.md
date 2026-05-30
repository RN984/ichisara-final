# 修正指示書 — ichisara-site2 (feature/redesign)

作成日: 2026-05-30

---

## 1. トップ ヒーロー: 改行を削除

### 問題
`src/pages/Home.jsx:80–82` の `hero-title` と `hero-meta` に `<br/>` があり、
"の一皿を。" と "Shisui, Chiba" が改行されている。

### 修正

**Home.jsx:80** — `<br/>` を削除してテキストをインラインにする
```jsx
// Before
<h1 className="hero-title jp">光が差し込む空間で、<br/><em>元ファーストクラスシェフ</em>の一皿を。</h1>

// After
<h1 className="hero-title jp">光が差し込む空間で、<em>元ファーストクラスシェフ</em>の一皿を。</h1>
```

**Home.jsx:82** — `hero-meta` の `<br/>` を `·` 区切りに変更
```jsx
// Before
<div className="hero-meta en">Est. 2024<br/>Shisui, Chiba</div>

// After
<div className="hero-meta en">Est. 2024 · Shisui, Chiba</div>
```

---

## 2. Updates: 全件表示（件数上限を撤廃）

### 問題
`src/components/Updates.jsx:80–84` の `displayRows` に `.slice()` が入っており、
最大 6 件しか表示されない。また削除フィルターは既に正しく実装済み（`削除 !== 'TRUE'`）。

### 修正

```jsx
// Before (Updates.jsx:80–84)
const displayRows = [
  ...grouped['シェフの気まぐれランチ'].slice(0, 3),
  ...grouped['営業日の変更'].slice(0, 3),
  ...grouped['その他'].slice(0, 2),
].sort((a, b) => new Date(cleanDate(b['日付'])) - new Date(cleanDate(a['日付']))).slice(0, 6);

// After — 全件を日付降順で表示（削除=TRUEはすでにrowsで除外済み）
const displayRows = rows
  .filter(r => cleanDate(r['日付']))
  .sort((a, b) => new Date(cleanDate(b['日付'])) - new Date(cleanDate(a['日付'])));
```

---

## 3. メニュー: スプレッドシート連動（T_メニュー表 + T_メニューアイテム）

### 現状
`src/pages/Menu.jsx` はデータがすべてハードコード。

### 要件
- **左側の画像**: `T_メニュー表` シートのサムネイル列（画像URL）を使用
- **画像クリック**: 同シートの PDF 列のURLを新タブで開く
- **右側のメニュー一覧**: `T_メニューアイテム` シートを `並び順` 列で昇順ソートして表示

### スプレッドシート列（確認要）
`T_メニュー表` 想定列: `カテゴリ`, `サムネイルURL`, `PDFURL`（実際の列名を要確認）
`T_メニューアイテム` 想定列: `カテゴリ`, `商品名`, `英語名`, `説明`, `価格`, `並び順`（実際の列名を要確認）

### 修正方針

```jsx
// src/pages/Menu.jsx の先頭に追加
import useSWR from 'swr';

const SHEET_ID = import.meta.env.VITE_SHEET_ID ?? '1PmoyxBgJjLUjbgjEKyUrpJ3xEdVXugq9tLbxRYzYwPw';
const fetcher = url => fetch(url).then(r => r.json());

// コンポーネント内
const { data: menuImages } = useSWR(
  `https://opensheet.elk.sh/${SHEET_ID}/T_%E3%83%A1%E3%83%8B%E3%83%A5%E3%83%BC%E8%A1%A8`,
  fetcher
);
const { data: menuItems } = useSWR(
  `https://opensheet.elk.sh/${SHEET_ID}/T_%E3%83%A1%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%A2%E3%82%A4%E3%83%86%E3%83%A0`,
  fetcher
);
```

- `tab` に対応する `T_メニュー表` の行を参照 → `サムネイルURL` を `<img src>` に
- `<img>` を `<a href={PDFURL} target="_blank">` でラップ
- メニュー一覧は `T_メニューアイテム` を `並び順` 昇順で表示

> **実装前に**: スプレッドシートの実際の列名を `opensheet.elk.sh` で確認してから列名を確定すること

---

## 4. シェフ: 料理写真を削除してデザイン修正

### 問題
`src/pages/Chef.jsx` の各シェフに料理写真が3枚目として入っている。
不要なので削除し、画像グリッドを2枚（cf-main + cf-sub ×1）に変更。

### 修正

**Chef.jsx** — `humberger2` と `curry` の import と `<div class="cf-sub">` を削除

```jsx
// Before (西尾シェフ画像)
<div className="chef-feature-images">
  <div className="cf-main"><img src={nishioMain} alt="西尾シェフ" /></div>
  <div className="cf-sub"><img src={nishioSub} alt="西尾シェフ 調理風景" /></div>
  <div className="cf-sub"><img src={humberger2} alt="シグネチャーハンバーグ" /></div>
</div>

// After
<div className="chef-feature-images">
  <div className="cf-main"><img src={nishioMain} alt="西尾シェフ" /></div>
  <div className="cf-sub"><img src={nishioSub} alt="西尾シェフ 調理風景" /></div>
</div>
```

```jsx
// Before (尾身シェフ画像)
<div className="chef-feature-images">
  <div className="cf-main"><img src={omiMain} alt="尾身シェフ" /></div>
  <div className="cf-sub"><img src={omiSub} alt="尾身シェフ 調理風景" /></div>
  <div className="cf-sub"><img src={curry} alt="秘伝のカレー" /></div>
</div>

// After
<div className="chef-feature-images">
  <div className="cf-main"><img src={omiMain} alt="尾身シェフ" /></div>
  <div className="cf-sub"><img src={omiSub} alt="尾身シェフ 調理風景" /></div>
</div>
```

**Chef.css** — `chef-feature-images` のグリッドを1列にするか cf-sub を縦長に調整

```css
/* Before */
.chef-feature-images { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.cf-main { grid-column: 1 / 3; aspect-ratio: 16/10; overflow: hidden; }
.cf-sub { aspect-ratio: 4/5; overflow: hidden; }

/* After — 2枚構成（main フル幅 + sub 半幅）*/
.chef-feature-images { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.cf-main { grid-column: 1 / 3; aspect-ratio: 16/10; overflow: hidden; }
.cf-sub { grid-column: 1 / 2; aspect-ratio: 3/4; overflow: hidden; }
```

---

## 実装順序（推奨）

1. **#1** トップ改行修正（1分）
2. **#4** シェフ料理写真削除（5分）
3. **#2** Updates 全件表示（5分）
4. **#3** メニュースプレッドシート連動（最も複雑 — シート列名確認から着手）
