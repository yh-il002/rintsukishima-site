# 引き継ぎ資料：月島 凛 公式サイト

作成日: 2026-11-02（kindle-publishing リポジトリでの相談内容をまとめたもの）
更新日: 2026-11-02（アカウント作成・ドメイン取得・GitHub の所有確認まで完了。次は Astro サイトの作成）

## 次のセッションでやること（ここから読む）

**タスク：Astro プロジェクトを作り、GitHub Pages で `https://rintsukishima.com` として公開できる状態にする。**

作業を始める前に、ユーザーに次の2点を確認すること（どちらも未確定）。

1. **ページ構成と URL**。叩き台は下表のとおりで、まだユーザーの承認を得ていない。GitHub Pages では 301 リダイレクトができないため、公開前に確定させる

   | 日本語 | 英語 | 内容 |
   |---|---|---|
   | `/` | `/en/` | トップ（プロフィール要約・新刊・作品一覧） |
   | `/books/<slug>/` | `/en/books/<slug>/` | 作品詳細 |
   | `/about/` | `/en/about/` | プロフィール |

   ブログは作らない。将来 `/blog/` を足しても既存の URL に影響はない
2. **デザインの方向性**（下の「未決事項」3）。決まっていなければ、まず骨組みとデプロイを通し、デザインはあとで肉付けしてよい

進め方の推奨：

1. 最低限のページ・i18n・`public/CNAME`・sitemap・デプロイ用 workflow を作り、まず公開まで通す
2. 公開できたら、DNS（下の「GitHub Pages との接続」）を Cloudflare に設定し、カスタムドメインと HTTPS を有効にする
3. そのあとで JSON-LD・OGP・デザインを肉付けする

## 現在の状況（2026-11-02 時点）

| 項目 | 状況 |
|---|---|
| リポジトリ | `git@github.com:yh-il002/rintsukishima-site.git`（origin 設定済み）。**まだコミットが1つもない**。`CLAUDE.md` と `docs/` が未追跡 |
| ドメイン | `rintsukishima.com` を Cloudflare Registrar で取得済み。DNS は TXT レコード（GitHub の所有確認）だけで、A/AAAA/CNAME はまだ |
| GitHub の所有確認 | `yh-il002` で Verified |
| リポジトリの Pages 設定 | 未設定（Settings → Pages → Source を「GitHub Actions」にする必要あり） |
| Google アカウント | 作成済み（作家用の Gmail）。Cloudflare もこのアカウントの Google ログインで作成 |
| YouTube | ハンドル `@rin_tsukishima` を確保済み |
| X / note / Instagram / Threads / TikTok | 未作成（ユーザーが作る予定）。ハンドルは `rin_tsukishima` に統一する方針 |

## 作業上の注意

- **GitHub アカウントを取り違えない**。ブラウザーには `yh-il002` 以外のアカウントでログインしていることがある。サイト関連の操作はすべて `yh-il002` で行い、操作前にログイン中のアカウントを確認する。業務用アカウントと作家活動を結びつけない
- アカウント作成・支払い・本名や住所の入力は、Claude ではなくユーザーが行う。Claude in Chrome では画面の案内と確認だけをする
- Claude in Chrome の拡張機能には `github.com` と Cloudflare の操作が許可済み
- 著者名の表記ルールは `CLAUDE.md` にもある（「凛」が正しく、「凜」は誤り）


## 目的

作家「月島 凛 / Rin Tsukishima」の公式サイトを作る。Kindle（KDP）で出版した作品の紹介と著者プロフィールが中心。

## 決まっていること

| 項目 | 方針 |
|---|---|
| フレームワーク | Astro（静的サイト生成、JS は原則ゼロ） |
| ホスティング | GitHub Pages（このリポジトリ。無料枠のため public） |
| デプロイ | GitHub Actions：`withastro/action` → `actions/deploy-pages` |
| ドメイン | `rintsukishima.com`（2026-11-02 に Cloudflare Registrar で取得済み。期限 2027-11-02、自動更新オン） |
| レジストラ | Cloudflare Registrar（推奨）。お名前.com は使わない（GMO 系のムームードメインも除外） |
| 言語 | 日本語（`/`）と英語（`/en/`）の2言語 |

## 著者名の表記ルール（厳守）

- 和名：**月島 凛**（姓と名のあいだに半角スペース。「凛」であって「凜」ではない）、読みは ツキシマ リン
- 英名：**Rin Tsukishima**（`Tsukishima Rin` などの語順は使わない）
- 本名は使わない。顔出しをせず、性別も伏せる方針なので、プロフィール文・写真・構造化データにもこれらを出さない
- サイト・Amazon・SNS で表記を揃える（検索エンジンに同じ人物として認識させるため）
- SNS：YouTube の `@rintsukishima` は他人が使用中のため、全サービスでハンドル `rin_tsukishima` に統一する（YouTube は 2026-11-02 に確保済み）

## ドメイン取得の手順（Cloudflare Registrar、2026-11-02 完了。記録として残す）

1. https://dash.cloudflare.com でアカウントを作る
2. Domain Registration → Register Domains で `rintsukishima.com` を購入する（.com は 2026-11-01 から年 $11.17、更新料も同額）
3. 登録者情報には本名と住所が必要（ICANN の規則）。WHOIS では自動で非公開になる
4. Auto-renew をオンにする

制約として、Cloudflare Registrar ではネームサーバーを Cloudflare から変更できない（今回の用途では問題ない）。

## GitHub Pages との接続

Cloudflare の DNS に次を追加する（**未設定**。サイトのデプロイが通ってから入れる）。**Proxy は「DNS only」（グレーの雲）**にする。オレンジのままだと HTTPS 証明書の発行に失敗することがある。

```
A     @    185.199.108.153
A     @    185.199.109.153
A     @    185.199.110.153
A     @    185.199.111.153
AAAA  @    2606:50c0:8000::153
AAAA  @    2606:50c0:8001::153
AAAA  @    2606:50c0:8002::153
AAAA  @    2606:50c0:8003::153
CNAME www  yh-il002.github.io
```

- `www` なしのドメイン（apex）を正とし、`www` はそこへ向ける
- GitHub の Settings → Pages → Add a domain でドメインの所有確認（TXT レコード）をして、乗っ取りを防ぐ
  - 2026-11-02 に `yh-il002` アカウントで確認済み（Verified）。Cloudflare の TXT レコード `_github-pages-challenge-yh-il002` は消さない
- Astro 側の設定：
  - `public/CNAME` に `rintsukishima.com` と1行だけ書く
  - `astro.config.mjs` で `site: 'https://rintsukishima.com'` とし、`base` は設定しない
  - lockfile をコミットする（`withastro/action` が lockfile からパッケージマネージャーを判定するため）
- リポジトリの Settings → Pages → Source を「GitHub Actions」にする

## SEO 方針

主な狙いは「月島 凛」「Rin Tsukishima」「作品名」での検索。ブログで集客するより、著者と作品を検索エンジンに正しく認識させることを優先する。

- **JSON-LD**（効果が最も大きい）
  - トップページに `Person`（`name`、`alternateName`、`url`、`sameAs` に Amazon 著者ページと SNS）
  - 作品ページに `Book`（`name`、`author`、`image`、`inLanguage`、ASIN や Amazon の URL）
- **i18n**：Astro の i18n ルーティングで `/` と `/en/` を作り、`hreflang`（`ja` / `en` / `x-default`）を付ける
- **基本設定**：`@astrojs/sitemap`、canonical、`robots.txt`、OGP と Twitter Card（表紙画像を使う）、ページごとに固有の title と description
- **公開後**：Google Search Console と Bing Webmaster Tools に登録し、sitemap を送信する。Amazon の著者セントラル（Author Central）の日本と米国の両方からサイトへリンクを張る

## GitHub Pages の制約

- サーバー側のリダイレクト（301）やレスポンスヘッダーは設定できないので、URL 設計を最初に固めてから変えない
- フォームは置けないため、問い合わせは Google フォームなどの外部サービスを使う
- 将来リダイレクトやヘッダーが必要になったら Cloudflare Pages に移行できる（ドメインはすでに Cloudflare にある）

## 書誌データの取り込み元

原稿リポジトリ `../kindle-publishing`（このリポジトリと同じ階層。`yh-il002/kindle-publishing`）にある。このリポジトリには**原稿が入っているので、サイトのリポジトリとは分けておく**。

- 日本語版：`books/<slug>/book.yaml`（`title`、`author`、`description`）、表紙は `books/<slug>/assets/cover.jpg`（1600x2560）
- 英語版：`books/<slug>/en/book.yaml`、表紙は `books/<slug>/en/assets/cover.jpg`
- 現在の作品は1冊（`closing-soon`）
  - 『閉店まであと七日の和菓子屋さん』（連作短編集・5話、ハートウォーミング）
  - 英題は *Closing Soon at the Daifuku Shop*（**仮題**）
- 方針：必要なデータと表紙だけをこのリポジトリの content collection（例：`src/content/books/`）にコピーする。原稿リポジトリをまるごと参照しない。将来はコピー用のスクリプトにしてもよい
- ASIN や Amazon の URL は出版後に追記する

## 未決事項（次にやること）

1. サイトに載せる内容を決める：作品一覧／作品詳細／プロフィール／新刊情報／SNS リンク（ブログは作らない方向で提案済み、未承認）
2. ページ構成と URL 設計を決める（叩き台は冒頭の「次のセッションでやること」を参照）
3. デザインの方向性を決める。表紙は kindle-publishing の `writing/cover/brand.md` のブランド（窓の構成・ジャンル色）で作っているので、それに合わせるか検討する
4. ~~ドメインを取得する~~（2026-11-02 完了）
5. Astro プロジェクトを作成し、デプロイの workflow と CNAME を用意して公開する（**次のセッションの作業**）
6. SNS アカウントの名前を確保する：X → note → Instagram/Threads → TikTok（ユーザーの作業）。電話帳の同期はオフにする
