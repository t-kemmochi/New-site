# サイト仕様

この文書は、現在合意している仕様と実装状況を記録する。
「仕様」「実装済み」「未実装」「未確定」を区別する。
過去のプロンプトに含まれる提案を、すべて採用済みとは扱わない。

## 1. 目的と構成

### 仕様

- 研究者の個人サイトとする。
- Hugoで生成し、GitHub Pagesで公開する。
- 日本語版と英語版を提供する。
- 外部テーマは採用せず、テンプレートを自作する。
- 見た目の参考はHugo Blox。ただし、具体的なデザインは今後の指示で決定する。

### 現在の構成

- 公開先の設定は `https://t-kemmochi.github.io/New-site/`。
- 自作テンプレート・CSS・JavaScriptは `themes/mytheme/` にある。
- トップページ用コンテンツはルートの `content/` にある。
- 既存のサンプルコンテンツはテーマ内に保持している。トップページには列挙しない。
- 今後のディレクトリ整理は別途判断し、この文書だけを根拠に移動しない。

## 2. 多言語対応

### 仕様

- 日本語を既定言語とする。
- 日本語にも `/ja/` を付け、英語には `/en/` を付ける。
- ファイル名によって言語を区別する。
- ページバンドルでは、同じフォルダに `index.ja.md` と `index.en.md` を配置する。
- セクションの本文は `_index.ja.md` と `_index.en.md` で管理する。

### 実装済み

- 日本語・英語のサイト設定とURL生成。
- 翻訳ページが存在する場合は、そのページへの言語切り替え。
- 翻訳ページがない場合は、対象言語のトップページへの切り替え。

### 未実装

- 日英トップページと組み込み用セクションのファイルは作成済み。
- 自己紹介と各セクションの実際の本文・翻訳は未作成。

## 3. サイト全体のレイアウト

### 仕様

- メニューバー（サイトタイトル・メニュー・言語切り替え）と全ページの `h1`・`h2` に、Google FontsのMontserratを使用する。
- ウェイトはnormal（400）、font-styleもnormalとする。Google Fontsから通常体400のみを読み込む。
- Montserratに含まれない日本語の文字などは、ブラウザのsans-serifフォントへフォールバックする。
- 共通のコンテンツ最大幅は、ひとまず1200pxとする。
- 最大幅はサイト全体で共有する変数として定義する。
- コンテンツを中央に配置する。
- 背景色のある領域は画面幅いっぱいに広げ、内側の内容に共通の最大幅を適用する。
- ヘッダーとフッターは全ページで共通とする。

### 実装状況

- CSS変数 `--content-max-width` と共通クラス `.container` がある。
- ヘッダーとフッターには適用済み。
- トップページのヒーローと各セクションにも適用済み。その他の本文領域への適用は未実装。
- 本文のフォント、行間、見出し、余白などの詳細は未確定。

## 4. ヘッダー

### 仕様

- サイト上部に背景色付きのナビゲーションバーを配置する。
- 左にサイトタイトル、中央にメニュー、右に言語切り替えを配置する。
- サイトタイトルは、表示中の言語のトップページへのリンクとする。
- メニューの項目と順序はHugoの設定ファイルで管理する。
- ヘッダー内部とメニューの横並びにはFlexboxを使用する。
- 背景色は変数で管理する。

### 実装済み

- 上記の基本構造。
- 言語別メニューの描画。
- 現在のメニュー項目とその祖先を示すための処理。
- ナビゲーションのラベル、キーボード操作時のフォーカス表示。

### 現在のメニュー設定

| 日本語版 | 英語版 |
| --- | --- |
| CV | CV |
| Publications | Publications |
| Projects | Projects |
| Memo | Memo |
| News | News |

### 未完成・未確定

- メニューのリンク先は作成済み。CV（日本語）・About（英語）は準備中の通常ページ、publication・project・memo・newsは日英の一覧ページを出力する。
- 専用テンプレートは未作成で、既存の `page.html`・`section.html` を使用する。
- メニューの表示名は日英ともCV。リンク先は日本語 `/cv`、英語 `/about` を維持する。両ページを翻訳として対応させるかは未確定。
- 小さい画面での配置とハンバーガーメニューは未実装。

## 5. フッター

### 仕様

- 本文が短い場合も、フッターをウィンドウ下端に配置する。
- 本文が長い場合は、その後ろに続けて表示する。
- スクロール中も画面に固定する方式は想定しない。
- 全幅の背景色を付け、内側の内容には共通の最大幅を適用する。
- 背景色は変数で管理し、当面は薄いグレーとする。
- 著作権表示は小さめの文字とする。

### 現在の実装

- ページ全体のFlexboxによって下端に配置する。
- 著作権表示は `© {{ now.Year }} Tomoya Kemmochi`。
- 年はビルド時の現在年を使用し、名前はテンプレートに直接記述している。

### 過去の指示との差分

- 当初は著作権表示を設定ファイルから指定する案だった。
- 後の手動修正で、現在の直接記述になっている。
- 設定ファイルへの移動は未決定とし、自動で変更しない。

## 6. コード表示

### 仕様

- コードブロックを使用するページがある。
- コード表示用の追加アセットを読み込むかどうかは、ページのフロントマターで指定する。
- 既定は無効とし、有効なページだけ追加アセットを読み込む。

### 未確定・未実装

- トップページでは入口の `content/_index.ja.md`・`content/_index.en.md` の `code` で指定する予定。読み込み処理は未実装。
- シンタックスハイライトの方式と配色。
- 追加アセットの構成。
- コピーボタンなどの補助機能は要件に含めない。

## 7. 数式表示

### 仕様

- 数式用の追加アセットを読み込むかどうかは、ページのフロントマターで指定する。
- 既定は無効とし、有効なページだけ読み込む。
- MathJaxを想定する。
- CDNによる配信を許容する。
- `align` 環境などの複数行数式にも対応する。
- より適した代替案がある場合は、採用前に検討する。

### 未確定・未実装

- トップページでは入口の `content/_index.ja.md`・`content/_index.en.md` の `math` で指定する予定。読み込み処理は未実装。
- 使用バージョンとCDN。
- 数式の区切り記法、番号付け、マクロなどの詳細。

## 8. CSSとJavaScript

### 仕様

- 自作JavaScriptは最小限にする。
- 現時点の想定用途はハンバーガーメニュー。
- 数式ライブラリの利用は、自作JavaScriptの最小化とは別に扱う。
- Tailwind CSSとDart Sassは利用可能だが、導入必須ではない。

### 現在の実装

- 通常のCSSとHugoのアセット処理を使用している。
- Tailwind CSSとDart Sassはサイトのスタイル処理には使用していない。
- `assets/js/main.js` はコンソール出力のみ。
- `assets/css/components/` のCSSは現在読み込まれていない。

## 9. レスポンシブ対応

- 当初の方針として、詳細なレスポンシブ対応は後回しとする。
- 後から対応できる構造を保つ。
- 具体的なブレークポイントやモバイル表示は未確定。
- 未実装であることを、直ちに実装漏れとは扱わない。

## 10. 今後決める内容

- トップページの実際の本文。
- CV・About・Publications・Projects・Memo・Newsの内容とURL。
- 各ページの日英対応関係。
- ページ種別ごとの日付・タグの表示方針。
- 本文のデザインと画像・表・コード・数式の表示。
- レスポンシブ対応の詳細。
- description、OGP、faviconなどのメタ情報。
- サンプルコンテンツ、未使用ファイル、重複設定の整理。

## 11. トップページのコンテンツ構成

- `content/_index.ja.md` と `content/_index.en.md` は、ページ全体の設定を持つ薄い入口とする。
- `content/home/_index.ja.md` と `content/home/_index.en.md` にヒーローのタイトル、所属、職名、自己紹介を書く。
- 所属・職名は未入力で、値がある場合だけ表示する。
- `content/home/` に research・publications・projects・news の日英Markdownを配置する。
- 各セクションの表示順は `weight` で指定する。初期値は順に10・20・30・40。
- トップページは現在の言語の `/home` を取得し、ヒーローと配下の通常ページを組み合わせる。
- 各セクションは共通の `section`・`h2`・`.container` で囲む。
- ファイル名から言語サフィックスを除いた名前をIDとする。例：`research.ja.md` は `#research`。
- `widget` は `section`・`publications`・`projects`・`news` を指定する。省略時は `section`。以前の `text` も `section` として扱う。
- 未対応の `widget` はビルドエラーにする。ヒーローはhomeの `_index.*.md` で管理し、独立した `home/hero.html` パーシャルで描画する。
- homeのcascadeで `build.list: local`、`build.render: never`、`build.publishResources: false` を両言語に設定する。
- home配下をローカルなページ一覧から取得できる状態に保ち、独立したページとリソースを出力しない。
- 画像などをhome配下へ配置する場合は、リソースの公開方法を別途検討する。
- ヒーローより後のセクションは、表示順に白・薄いグレーの背景を交互に適用する。ヒーローは交互配色の対象外。
- 背景色はCSS変数 `--home-section-background-odd`（初期値 `#ffffff`）と `--home-section-background-even`（初期値 `#f2f2f2`）で指定する。
- 背景は画面幅いっぱいに広げ、内容は既存の `.container` で中央寄せする。見出しなどのマージンは背景領域の内側に収める。
- ヒーロー・本文のその他の詳細デザインは未実装。
- トップページ用homeが存在しない場合は、ビルドエラーで通知する。

## 12. コンテンツ種別とトップページの一覧

### コンテンツの分類

- `publication`・`project`・`news`・`memo` はHugoのコンテンツ種別（`type`）として扱う。
- 推奨配置は、それぞれ `content/publication/`・`content/project/`・`content/news/`・`content/memo/`。
- 通常のページは従来のデフォルトarchetypeを利用できる。
- news・memoはカテゴリではなく種別で区別する。記事の表示自体は既存の `page.html` を共用する。
- カテゴリやタグは、必要に応じて種別とは別に付けられる。
- 個別ページの専用デザインや論文固有の書誌情報は、今回の実装には含めない。

### 作成方法

リポジトリのルートで、以下のように作成する。`hugo` にPATHが通っていない場合、このクラウド環境では `/workspace/.local/hugo/hugo` を使用する。

```sh
hugo new content --kind publication publication/example.ja.md
hugo new content --kind project project/example.ja.md
hugo new content --kind news news/example.ja.md
hugo new content --kind memo memo/example.ja.md
```

- 英語版は同じファイル名の `.en.md` とする。
- 各archetypeは `type`・`date`・`draft: true` を設定する。公開する場合はdraftをfalseにする。
- projectの初期状態は `status: current`。終了したものは、たとえば `status: completed` に変更する。

### ウィジェットの動作

| widget | 動作 |
| --- | --- |
| `section` | Markdown本文をそのまま表示する |
| `publications` | 本文の前に、現在の言語の `type: publication` を日付の新しい順で表示する |
| `news` | 本文の前に、現在の言語の `type: news` を日付の新しい順で表示する |
| `projects` | 本文の前に、現在の言語の `type: project` かつ `status: current` を日付の新しい順ですべて表示する |

- publications・newsの件数は、各home用Markdownの `limit` で指定する。省略時は3件。
- `limit` は1以上の整数。該当する公開ページが少ない場合は、その件数だけ表示する。
- 下書き・未来の公開ページなどは、通常のHugoビルドの公開条件に従う。
- 該当ページがない場合は、見出しとMarkdown本文だけを表示し、空の一覧は出力しない。
- 一覧をMarkdownへ手動で転記せず、種類別のパーシャルで抽出・描画する。
- 表示は `home/publications.html`・`home/news.html`・`home/projects.html` に分離する。
- 各セクションには `home-section--publications` などのクラス、各一覧には `home-publications-list` などの専用クラスを付ける。種類ごとのスタイル調整はこれらに対して行う。
- 今回は新しい配色やカードデザインを追加しない。既存の全幅交互配色と共通幅を維持する。
- publication・newsは日付とリンク、projectはリンクと、設定されていればdescriptionを表示する。

## 13. トップページの見出し表記

- 日本語版のトップページのセクション見出しは、英語版と同じResearch・Recent publications・Research projects・Newsとする。
- ヒーローは日英ともTomoya Kemmochi。本文の言語は変更しない。

## 14. CTAショートコードとリンクの色

### CTAの使い方

D案（背景・枠線なし、末尾に一重シェブロン）を `cta` ショートコードで表示する。
文字はMontserratの通常体とする。シェブロンは空のCSS擬似要素 `::after` にSVGをマスクとして指定する装飾で、読み上げる文字は挿入しない。
SVGはCSS内のデータURIとして保持し、文字色に追従させる。追加の通信や公開先サブディレクトリに依存しない。

```markdown
{{< cta text="View publications" url="/publication" >}}
{{< cta text="View news" url="/news" external=false >}}
{{< cta text="Jump to research" url="#research" >}}
{{< cta text="External website" url="https://example.com/" external=true >}}
```

- `text` と `url` は必須の名前付き引数。
- `external` は省略時false。true・false以外はビルドエラーとする。
- 内部ページはHugoの `relref` で解決し、現在の言語と公開先サブディレクトリを反映する。存在しないページはビルドエラーにする。
- ページ内アンカーも指定できる。アンカー先の存在確認は編集者が行う。
- 内部リンクはコンテンツページを対象とし、静的ファイルへのリンクは今回の対象外。
- 外部URLを指定する場合は `external=true` が必要。HTTP(S)の絶対URLだけを許可し、別タブで開く。
- 外部リンクには `rel="external noopener noreferrer"` を付ける。
- ショートコード自体は全ページ共通のCSSを使い、追加JavaScriptは使用しない。

### 色と状態

色は `assets/css/main.css` の `:root` で設定する。ショートコードへの色引数は設けず、CSSカスタムプロパティで変更する。必要なら特定のコンテナ内だけ変数を上書きできる。

| 対象 | CSS変数 | 初期値 |
| --- | --- | --- |
| メニューバー背景 | `--header-background` | `#22d46a` |
| メニューバー文字 | `--header-text-color` | `#ffffff` |
| メニューホバー | `--header-link-hover-color` | `#e6faec` |
| メニューフォーカス・押下・フォーカス枠 | `--header-link-focus-color`・`--header-link-active-color`・`--header-link-focus-ring-color` | `#ffffff` |
| 通常リンク | `--link-color` | `#008000` |
| 訪問済みリンク | `--link-visited-color` | `#008000` |
| ホバー | `--link-hover-color` | `#009900` |
| キーボードフォーカス | `--link-focus-color` | `#008000` |
| 押下 | `--link-active-color` | `#006600` |
| フォーカス枠 | `--link-focus-ring-color` | `#008000` |

- 通常リンクは通常・訪問済み・ホバー・フォーカス・押下のいずれも下線なし。
- キーボードフォーカス時は2pxの枠を4px外側に表示する。
- CTAには `--cta-color`・`--cta-visited-color`・`--cta-hover-color`・`--cta-focus-color`・`--cta-active-color`・`--cta-focus-ring-color` を用意する。初期値は対応する通常リンク変数を参照する。
- CTAは通常・訪問済みは下線なし、ホバー・押下時に下線を表示する。フォーカス時は枠を表示する。
- ヘッダーの現在位置を示す下線は維持する。

## 15. フォントサイズと文字関連の単位

- ルート要素 `html` のフォントサイズは `--font-size-root` で指定する。初期値は16px。
- 本文の既定サイズは `--font-size-base: 1.25rem`（20px）とする。
- フォントサイズ、記号の大きさ・間隔、下線のオフセットはremで指定する。既存のem指定はremへ統一する。
- フォントサイズは `:root` の以下のCSS変数で指定する。

| 用途 | CSS変数 | 初期値（ルート16px時） |
| --- | --- | --- |
| ルート | `--font-size-root` | `16px` |
| 本文・継承するメニュー | `--font-size-base` | `1.25rem`（20px） |
| h1 | `--font-size-h1` | `2.5rem`（40px） |
| h2 | `--font-size-h2` | `1.875rem`（30px） |
| メニューのサイトタイトル | `--font-size-site-title` | `1.25rem`（20px） |
| フッター | `--font-size-footer` | `0.875rem`（14px） |
| CTA | `--font-size-cta` | `var(--font-size-base)` |

- CTAはinline-flexで文字とシェブロンを中央揃えし、間隔は0.5remとする。
- シェブロンの領域は幅・高さとも1.625rem（26px）。文字列の後ろに配置する。

## 16. トップページのCTA配置

- ヒーローを除く4セクションの日英Markdownに `cta` ショートコードを配置する。
- ResearchはCVへリンクする（日本語 `/cv`、英語 `/about`）。研究紹介の独立ページは未作成のため、既存の略歴ページを案内する。
- publications・projects・newsは、それぞれ `/publication`・`/project`・`/news` の一覧へリンクする。
- 日本語の文言は「略歴を見る」「論文一覧を見る」「プロジェクト一覧を見る」「お知らせ一覧を見る」。英語は「View CV」「View all publications」「View all projects」「View all news」。
- 一覧型ウィジェットは、自動生成した一覧の後ろにMarkdown本文を表示し、本文末尾のCTAが一覧の下に来るようにする。
- ヒーローには今回CTAを追加しない。
