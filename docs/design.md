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
- 本文はGoogle FontsのInterとLINE Seed JPを使用する。フォントスタックは `"Inter", "LINE Seed JP", sans-serif` とし、英字はInter、日本語はLINE Seed JPで表示する。日英両サイトに共通で適用する。通常体400と太字700を読み込む。
- メニューバー・h1・h2はMontserratの通常体400を維持し、日本語はLINE Seed JPへフォールバックする。
- 共通のコンテンツ最大幅は、ひとまず1200pxとする。
- 最大幅はサイト全体で共有する変数として定義する。
- コンテンツを中央に配置する。
- 背景色のある領域は画面幅いっぱいに広げ、内側の内容に共通の最大幅を適用する。
- ヘッダーとフッターは全ページで共通とする。

### 実装状況

- CSS変数 `--content-max-width` と共通クラス `.container` がある。
- ヘッダーとフッターには適用済み。
- トップページのヒーローと各セクションにも適用済み。その他の本文領域への適用は未実装。
- 本文のフォントはInterとLINE Seed JP。行間、見出し、余白などの詳細は未確定。

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
- projectは `period_start`・`period_end` とビルド年月から状態を自動判定する。手動のstatusは使わない。

### ウィジェットの動作

| widget | 動作 |
| --- | --- |
| `section` | Markdown本文をそのまま表示する |
| `publications` | 共通YAMLから査読済み英語論文をdate降順で抽出し、Recentのカードを表示する |
| `news` | 本文の前に、現在の言語の `type: news` を日付の新しい順で、日付・タイトル・手動要約・続きを読む付きで表示する |
| `projects` | 本文の前に、現在の言語の `type: project` で期間から継続中と判定した課題を、開始年月の新しい順ですべて表示する |

- publications・newsの件数は、各home用Markdownの `limit` で指定する。省略時は3件。
- `limit` は1以上の整数。該当する公開ページが少ない場合は、その件数だけ表示する。
- 下書き・未来の公開ページなどは、通常のHugoビルドの公開条件に従う。
- 該当ページがない場合は、見出しとMarkdown本文だけを表示し、空の一覧は出力しない。
- 一覧をMarkdownへ手動で転記せず、種類別のパーシャルで抽出・描画する。
- 表示は `home/publications.html`・`home/news.html`・`home/projects.html` に分離する。
- 各セクションには `home-section--publications` などのクラス、各一覧には `home-publications-list` などの専用クラスを付ける。種類ごとのスタイル調整はこれらに対して行う。
- 今回は新しい配色やカードデザインを追加しない。既存の全幅交互配色と共通幅を維持する。
- publicationは日付とリンク、newsは日付・タイトルリンク・手動要約・続きを読むを表示する。projectは研究種別・番号・課題名・役割・必要時のみ代表者名・期間を表示する。

## 13. トップページの見出し表記

- 日本語版のトップページのセクション見出しは、英語版と同じResearch・Recent publications・Research projects・Newsとする。
- ヒーローは日英ともTomoya Kemmochi。本文の言語は変更しない。

## 14. CTAショートコードとリンクの色

### CTAの使い方

D案（背景・枠線なし、末尾に一重シェブロン）を `cta` ショートコードで表示する。
CTA自体にfont-familyを指定せず、本文のInter・LINE Seed JPを継承する。ウェイト・スタイルは通常体とする。シェブロンは空のCSS擬似要素 `::after` にSVGをマスクとして指定する装飾で、読み上げる文字は挿入しない。
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
| メニューバー背景 | `--header-background` | `#37ab5c` |
| メニューバー文字 | `--header-text-color` | `#ffffff` |
| メニューホバー | `--header-link-hover-color` | `#e6faec` |
| メニューフォーカス・押下・フォーカス枠 | `--header-text-color` | `#ffffff` |
| 通常リンク | `--link-color` | `#008000` |
| 訪問済みリンク | `--link-color` | `#008000` |
| ホバー | `--link-hover-color` | `#009900` |
| キーボードフォーカス | `--link-color` | `#008000` |
| 押下 | `--link-active-color` | `#006600` |
| フォーカス枠 | `--link-color` | `#008000` |

- 通常リンクは通常・訪問済みでは下線なし。ホバー時に下線を表示する。フォーカス・押下だけでは下線を追加しないが、ホバーと重なる場合は下線を表示する。
- メニューバーのホバーでは下線を追加せず、現在位置を示す下線は維持する。
- キーボードフォーカス時は2pxの枠を4px外側に表示する。
- CTAには `--cta-color`・`--cta-hover-color`・`--cta-active-color`・`--cta-focus-ring-color` を用意する。初期値は対応する通常リンク変数を参照する。
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

- CTAはinline-flexで文字とシェブロンを中央揃えし、間隔は0.3125rem（ルート16px時に5px）とする。本文20pxで半角スペース1個分程度を目安とし、SVG内部の左右余白も絞った状態を維持する。
- シェブロンの領域は幅0.625rem（10px）、高さ1.625rem（26px）。SVGのviewBoxを `8 0 9 24` とし、線の形・大きさを維持して横方向の余白を削る。文字列の後ろに配置する。

## 16. トップページのCTA配置

- ヒーローを除く4セクションの日英Markdownに `cta` ショートコードを配置する。
- ResearchはCVへリンクする（日本語 `/cv`、英語 `/about`）。研究紹介の独立ページは未作成のため、既存の略歴ページを案内する。
- publications・projects・newsは、それぞれ `/publication`・`/project`・`/news` の一覧へリンクする。
- 日本語の文言は「略歴を見る」「論文一覧を見る」「プロジェクト一覧を見る」「お知らせ一覧を見る」。英語は「View CV」「View all publications」「View all projects」「View all news」。
- 一覧型ウィジェットは、自動生成した一覧の後ろにMarkdown本文を表示し、本文末尾のCTAが一覧の下に来るようにする。
- ヒーローには今回CTAを追加しない。

- メニューバーの背景色 `#37ab5c` は、既存サイト `https://t-kemmochi.github.io/ja/` の公開用HTMLが読み込むCSSの `.navbar` に合わせた値。メニュー文字は白を維持する。

## 17. リセットCSS

- 外部依存を増やさず、サイト向けの軽量リセットを `assets/css/reset.css` に保存する。
- CSS読み込みパーシャルで `reset.css` → `main.css` の順に読み込む。両方に既存の圧縮・ハッシュ付与処理を適用する。
- 全要素と擬似要素にborder-boxを適用し、bodyの既定マージンを除く。これらはmain.cssから移した設定。
- モバイルブラウザの自動文字拡大を100%に揃える。ユーザーのズーム操作は制限しない。
- 画像・動画は最大幅100%・高さautoとし、縦横比を維持する。
- フォーム要素は周囲のフォント・文字色・文字間隔を継承する。
- hidden属性を維持し、`hidden="until-found"` の検索用動作は妨げない。
- 見出しh1〜h6・段落・リスト（ul・ol・li・dl・dt・dd）の既定のmargin・paddingを0にし、ul・olの記号もリセットする。キーボードフォーカス表示は維持する。
- main.cssで見出し前後の余白、段落末尾の余白、リストの余白・インデント・項目間隔を明示する。本文のulはdisc、入れ子のulはcircle、olはdecimal。メニューは記号と項目の縦余白を除く。
- サイト固有の色・書体・サイズ・レイアウトはmain.cssで管理する。

## 18. 余白・リストと長さの変数

- リセット後の見出し余白は前1.5rem・後0.75rem、段落末尾は1rem。
- リストの末尾は1rem、インデントは1.75rem、項目間は0.375rem、入れ子の前後は0.5rem。
- 定義リストの説明インデントは1.5rem、2項目目以降の見出し前は0.5rem。
- これらはmain.css冒頭の `--heading-margin-*`・`--paragraph-margin-after`・`--list-*`・`--nested-list-margin`・`--description-*` で変更できる。
- リスト記号はulにdisc、入れ子のulにcircle、olにdecimalをCSSで直接指定する。画面の最低高さも100vh・100dvhを直接指定し、これらの変数は設けない。
- 既存のコンテナ幅・余白、ヘッダー・メニューの間隔、言語切り替えの枠・余白、CTAの間隔・記号サイズ、フォーカス枠・下線位置、フッター余白もCSS変数に統一する。
- 長さはremを基本とし、画面の最低高さはvh・dvhを使う。ルートサイズのみpxで指定する。0・auto・割合やSVGの座標はそれぞれの用途に応じて維持する。
- コンテンツ最大幅は75rem（ルート16px時に従来どおり1200px）。それ以外の既存の間隔・サイズはルート16px時の表示を維持する。

## 19. 変数の整理方針

- 画面の最低高さとリスト記号は実装上の固定値として扱う。
- 通常リンクの通常・訪問済み・フォーカス・フォーカス枠は `--link-color` を共用する。
- メニューのフォーカス・押下・フォーカス枠は `--header-text-color` を共用する。
- CTAの通常・訪問済み・フォーカスは `--cta-color` を共用する。CTAのフォーカス枠は `--cta-focus-ring-color` を維持し、初期値は `var(--link-color)` とする。
- ホバー・押下の色は独立した変数を維持する。CTAの色は引き続き通常リンクと別に調整できる。
- 背景色など、役割が異なる値は現在の色が同じでも統合しない。

## 20. NEWSの表示とページ送り

- トップページとNEWS一覧ページは `news/item.html` を共用する。
- 日付は標準の `<time datetime="YYYY-MM-DD">`、タイトルは `<h3>` 内のリンクとする。
- タイトルのリンクは全状態で通常本文色を継承する。ホバー時の下線とキーボードフォーカス枠は維持する。
- 各項目は日付・タイトル・要約・「続きを読む」（英語はRead more）を表示する。Read moreは既存CTAの緑色と末尾シェブロンを使用する。
- 要約はMarkdownの `<!--more-->` までをHugoの `.Summary` で表示する。区切りがなければ全文を表示し、文字数指定の自動要約やCSSによる切り詰めは使用しない。
- 既存NEWSダミー記事には、最初の段落の後に区切りを追加する。
- 通常は下辺の区切り線、ホバー・focus-within時は四辺の枠を表示する。背景色は変えず、透明の枠をあらかじめ確保してサイズの変化を防ぐ。
- 項目全体をリンクにはせず、タイトルとRead moreだけをリンクにする。要約は選択・コピーできる。
- NEWS一覧専用テンプレートは `layouts/news/section.html`。新しい日付順にページ分割する。
- 1ページの件数は `content/news/_index.*.md` の `page_size` で指定する。初期値・省略時は3件。トップページの `limit` とは独立。
- ページ送りは前へ・ページ番号・次へ。1ページだけなら出さず、前後がない場合は非リンクの無効表示とする。
- 7ページ以下は全ページを表示する。8ページ以上は先頭・末尾・現在ページ前後1件だけを表示し、間に省略記号を置く。
- 例：全20ページの10ページ目は `前へ 1 … 9 10 11 … 20 次へ`。
- 現在ページには `aria-current="page"` を付ける。省略記号はリンクにしない。
- NEWSのスタイルは `assets/css/news.css` に分離し、reset.css・main.cssの後に読み込む。
- 部品内の余白・枠線色などはnews-list内、ページ送りの寸法・色はnews-pagination内のCSS変数で調整できる。
- 幅40rem以下ではNEWSの日付を本文の上へ配置する。ページ送りは必要に応じて折り返す。

### NEWSデザイン調整

- NEWS項目のホバー・focus-within枠はグレー `#a6a6a6`。日付列の右側にグレー `#d6d6d6` の縦線を表示する。狭い画面で1列に並べる場合は縦線を除く。
- ページ送りは前へ・次へに一重山括弧を添える。現在ページの背景は `var(--header-background)`、文字は白。
- その他のページ番号リンクは、訪問済み・ホバー・フォーカス・押下時も通常本文色を継承する。
- 前へ・次へはグレー `#737373`、移動先がない無効表示は `#8a8a8a` とする。無効表示はリンクにしない。
- 先頭・末尾・現在ページ前後と省略記号による表示は維持する。

- NEWSの横並びでは、外枠内側から日付、日付から区切り線、区切り線から記事本文、記事本文領域から外枠内側までを、すべて `--news-item-padding`（初期値1rem）で揃える。日付列は固定幅ではなくmax-contentとし、文字幅に追従させる。本文右側の余白は折り返した各行の文字末尾ではなく、本文領域の右端から測る。

## 21. プロジェクト（グラント）

### メタデータ

| パラメータ | 内容 |
| --- | --- |
| `title` | 課題名 |
| `type` | Hugoのコンテンツ種別。`project` を維持 |
| `grant_type` | 研究種別（例：科研費 若手研究） |
| `grant_id` | 課題番号。引用符を付けた文字列 |
| `role` | 自由な表示用文字列。例：研究代表者、研究分担者 |
| `is_PI` | 代表者かどうかの真偽値。Hugoテンプレートからは小文字の `is_pi` で参照 |
| `principal_investigator` | 代表者名。is_PI=falseの場合に必須・表示 |
| `period_start`・`period_end` | 引用符付きYYYY-MM。開始年月・終了年月 |
| `external` | 外部専用か。省略時true。ひな型にもtrueを明記 |
| `external_url` | 外部URL。external=trueの場合に必須。HTTP(S)のみ |

### HTML出力とリンク先

- 外部専用課題は `external = true` と `[build] render = 'never'` を組にする。`list = 'always'` で一覧からの取得を維持し、`publishResources = false` とする。
- 内部ページを作る課題は `external = false` と `[build] render = 'always'` を組にする。必要なら `publishResources = true` にする。
- externalだけではHugoの出力を変更できない。設定が不整合の場合はビルドエラーで通知する。
- カード全体が1つのリンク。外部専用ならexternal_url、内部ページなら言語別RelPermalinkへ移動する。外部リンクも同じタブで開く。
- 課題内にはCTAなど別のリンクを入れない。カードのリンク名は課題名で指定する。

### 状態と並び順

- Asia/Tokyoでビルドする運用（CI・クラウド起動手順のTZ設定）を前提に、ビルド年月と期間を比較する。
- 開始年月が翌月以降なら開始予定。開始済みで終了年月が当月以降なら継続中。終了年月が前月以前なら完了。
- 終了月全体を継続中に含める。月が変わっても自動配信更新はされず、再ビルドが必要。
- 不正な年月や開始・終了の逆転はビルドエラー。手動のstatusは廃止する。
- 開始年月の新しい順で表示する。トップページは継続中のみ。一覧は開始予定・継続中・完了を含める。

### 表示

- 研究種別と課題番号を横並びでグレー表示し、番号のラベルは付けない。
- 課題名は本文色・太字。トップページはh3、一覧ページはh2。
- 次の行にグレーのroleを表示し、is_PI=falseの場合だけ間隔を空けて「研究代表者：氏名」を添える。
- 最後に期間を小さめのグレー文字で表示する。
- 通常は下の区切り線のみ、ホバー時はグレーの四辺枠と課題名のみの下線を表示する。キーボードフォーカスでも枠と下線を表示する。
- トップはラベルなし、リスト末尾に既存CTAショートコードによる一覧へのリンクを1つ配置する。
- 一覧は継続中を緑の枠ラベル、完了を薄いグレー枠ラベルで表示する。開始予定は緑枠の別文言で表示する。
- ラベルの緑文字は読みやすい濃さとし、枠はヘッダー色を使う。
- 一覧のpage_sizeは `content/project/_index.*.md` で指定し、省略時3件。NEWSと同じページ送り部品・配色・省略規則を共用し、ナビゲーションのラベルはプロジェクト用にする。
- スタイルはprojects.css、共通カード・状態判定・リンク判定は `_partials/projects/` に置く。
- 既存ダミー課題を新メタデータに移行する。外部URLは架空例としてexample.comを使用し、実際の研究課題へのリンクとはしない。

## 22. 論文データとRecent publications

- 論文情報は日英共通の `data/publications.yaml` で管理する。ユーザー提供の旧サイト用publications.mdから転記した30件を保存する。
- トップページのRecentと日英の一覧ページは共通YAMLを参照する。既存のpublication個別ダミーページは削除せず保持するが、一覧には自動列挙しない。
- データにはid・title・authors配列・date・year・kind・language・peer_reviewed・journal・volume・number・pages・article_number・doi・links配列を持てる。
- dateは引用符付きYYYY-MM-DDで並び順に使用する。出典に年しかなければYYYYだけを保存し、月日を推測しない。yearは書誌情報の発行年として別に扱う。年も不明ならdate/yearを省略する。
- kind=article、language=en、peer_reviewed=trueの条件をすべて満たすものから、dateの新しい順に各home用Markdownのlimit件を表示する。日英トップは同じ論文を同じ順に表示する。
- Recentに該当する論文でdoiがないものは警告して除外する。不正形式のdoiはビルドエラー。doiにはURLではなく10.xxxx/から始まる文字列を記載する。
- タイトルはh3の本文色・太字。その下にbyと著者名、雑誌情報、その下に大文字の `DOI:` と識別子を表示する。
- journal・volume・number・pages・yearは存在する項目だけ表示し、欠落した項目のラベルや余分なカンマを出さない。article_numberがあればpagesに優先してArticle表記を使う。
- 雑誌名はcite要素で、論文のlanguage=enの場合だけ斜体とする。日本語論文は通常体。英語の著者は1名、2名、3名以上の連結を分け、日本語の著者は読点で連結する。Recentのメタデータはグレー。
- カード全体が `https://doi.org/識別子` へのリンクとなり、同じタブで開く。DOI表示部分を別のリンクにはせず、リンクの入れ子を作らない。
- 通常時は下の区切り線、ホバー・キーボードフォーカス時はグレーの外枠とタイトルだけの下線を表示する。透明な枠をあらかじめ確保し、配置を変えない。
- 各論文内にはCTAを置かず、リストの後ろに既存の一覧へのCTAを維持する。
- links配列にはlabelとurlを保存する。Recentには補足リンクを出さず、一覧ではDOIリンクの後ろにデータの順で表示する。
- 抽出・著者表示・書誌表示は `_partials/publications/`、スタイルはpublications.cssに分ける。

## 23. 論文一覧とショートコード

日英の `content/publication/_index.*.md` に見出しとショートコードを置く。論文情報そのものは共通YAMLだけを編集する。

```markdown
## Preprints
{{< publications kind="preprint" >}}

## Reviewed articles
{{< publications kind="article" language="en" peer_reviewed=true >}}

## Reviewed articles in Japanese
{{< publications kind="article" language="ja" peer_reviewed=true >}}

## Non-reviewed articles
{{< publications kind="article" peer_reviewed=false >}}
```

- 名前付き引数kind・language・peer_reviewedをAND条件で絞り込む。条件の省略時はその項目で絞り込まない。引数なしなら全件。
- peer_reviewed=falseも明示的な検索条件として扱う。
- dateの降順で表示する。任意のlimitは1以上の整数。未指定なら件数制限なし。
- 未対応引数や不正な真偽値・limitはビルドエラーとする。
- 結果がある場合だけ `<ol reversed start="件数">` を出力する。番号はカテゴリごとに件数から1へ減る。
- 一覧は著者名、太字タイトル、雑誌名、巻号ページまたは記事番号、発行年の順。省略された書誌項目はラベルごと省く。
- 色は通常本文色を継承し、雑誌名は論文が英語の場合のみ斜体とする。
- 項目に枠を付けず、ホバー・focus-within時は薄いグレー `#f5f5f5` の背景を表示する。項目全体をリンクにはしない。
- 書誌情報の後で改行し、doiがあれば大文字DOIリンク、その後にlinks配列のリンクを配置する。HTTP(S)の絶対URLとラベルを検証し、同じタブで開く。
- 補足リンクは白背景・通常リンク色の細枠と文字。ホバー・フォーカス・押下時にinset box-shadowで枠を内側へ太く見せ、font-weightを700にする。下線と塗りつぶしは行わない。
- 文字は本文と同じInter・LINE Seed JPを継承する。太字化による文字幅の変化は今回補正しない。
- スタイルはpublications.cssで管理し、一覧用テンプレートはpublication/section.htmlを使う。

- 論文一覧はolのreversed/startと標準のリストマーカーを使用し、liのdisplayはlist-itemを維持する。番号の直書きや表示用spanは設けない。背景だけを空の擬似要素で番号領域まで広げ、番号上のホバーとfocus-withinに対応する。折り返し行・補足リンクは通常のブロック配置で揃える。

### 旧サイトの論文データ取り込み

- 添付publications.mdからプレプリント1件、査読済み英語論文22件、査読済み日本語論文2件、査読なし日本語論文5件を転記する。
- DOI、arXiv番号、MR番号、zbMATH番号を保持する。Journal・arXiv・Movies・Read-only link・PDF・Preprintなどのリンクも保持する。
- 日本語の講究録記事は研究集会名eventと発行機関publisherも保存する。これらの追加項目は現時点の一覧では表示しない。
- staticrefのローカルPDFは旧サイトの絶対URLにする。PDFファイル自体の移行とリンクの到達確認は未実施。
- Shifted LOPBiCGのDOIがTensor product-type methodsのDOIと重複している点は原文どおり保存し、source_noteに確認事項を残す。
- Modified Strang splittingの最終著者名Siao-Liang Zhangも原文どおり保存する。他論文のShao-Liang Zhangとの表記差は未修正。
- 書誌情報は資料にない値を補わない。同一年のデータは資料の記載順を保持する。ページ範囲の二重ハイフンや数式記法も元の値を保持する。

### 標準番号とInterへの変更

- 通常本文と従来のOpen Sans指定箇所は `"Inter", "LINE Seed JP", sans-serif` とする。メニューバーとh1・h2は引き続きMontserratを優先する。
- Google FontsからInterのopsz 14〜32・wght 400〜700の可変フォントを読み込む。
- 論文の枠付き補足リンクには `font-optical-sizing: none` を指定する。その他の箇所の光学サイズ調整はブラウザの既定に従う。
- optical sizingの無効化だけで太字化時の字幅が一定になるとは限らない。従来どおり字幅変化の補正は行わない。
- 論文番号の余白は `--publication-archive-indent: 3.5rem`。擬似要素は空の装飾であり、番号や文字列は生成しない。親li内で独立した重なり順を確保し、背景を本文・標準マーカーの背面に描く。
