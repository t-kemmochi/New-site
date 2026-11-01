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
- 職位・所属・研究分野・キーワード・連絡先は日英とも記入済み。Projects・Newsは表示確認用データを保持しており、実際の本文の整備は今後行う。

## 3. サイト全体のレイアウト

### 仕様

- メニューバー（サイトタイトル・メニュー・言語切り替え）と全ページの `h1`・`h2` に、Google FontsのMontserratを使用する。
- ウェイトはnormal（400）、font-styleもnormalとする。Google Fontsから通常体400を読み込む。講演一覧のInvitedバッジ用にMontserratの300も追加するが、メニューとh1・h2は400を維持する。
- 本文はGoogle FontsのOpen SansとLINE Seed JPを使用する。フォントスタックは `"Open Sans", "LINE Seed JP", sans-serif` とし、英字はOpen Sans、日本語はLINE Seed JPで表示する。日英両サイトに共通で適用する。通常体400と太字700を読み込む。
- メニューバー・h1・h2はMontserratの通常体400を維持し、日本語はLINE Seed JPへフォールバックする。
- 共通のコンテンツ最大幅は、ひとまず1200pxとする。
- 最大幅はサイト全体で共有する変数として定義する。
- コンテンツを中央に配置する。
- 背景色のある領域は画面幅いっぱいに広げ、内側の内容に共通の最大幅を適用する。
- ヘッダーとフッターは全ページで共通とする。

### 実装状況

- CSS変数 `--content-max-width` と共通クラス `.container` がある。
- ヘッダーとフッターには適用済み。
- トップページのヒーロー・各セクションと、通常ページ・専用一覧の本文領域にも適用済み。
- 本文のフォントはOpen SansとLINE Seed JP。行間、見出し、余白などの詳細は未確定。

## 4. ヘッダー

### 仕様

- サイト上部に背景色付きのナビゲーションバーを配置する。
- PC（1200px以上）では左にサイトタイトル、中央にメニュー、右に言語切り替えを配置する。
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

- メニューのリンク先は作成済み。CV（日英）はダミー本文の通常ページ、publication・project・memo・newsは日英の一覧ページを出力する。
- 専用のHTMLページテンプレートを使うのはトップページ・project一覧・news一覧・memo一覧・memo個別ページ。memo個別は共通の本文部品に日付だけを追加する。CV・publication一覧・talks一覧と通常の個別ページは共通テンプレートを使用する。
- メニューの表示名・pageRefは日英ともCV・`/cv`。content/cv/index.ja.mdとindex.en.mdを翻訳ペアとして管理する。英語版の旧aboutページはcvへ移動する。
- レスポンシブヘッダーとハンバーガーメニューを実装済み。詳細は§30。JavaScriptを無効にした場合はナビゲーションを折り返して表示する。

## 5. フッター

### 仕様

- 本文が短い場合も、フッターをウィンドウ下端に配置する。
- 本文が長い場合は、その後ろに続けて表示する。
- スクロール中も画面に固定する方式は想定しない。
- 全幅の背景色を付け、内側の内容には共通の最大幅を適用する。
- 背景色は変数で管理し、現在は本文と同じ白にする。
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

- コードフェンスに言語名（例：`c`）を指定すると、Hugo内蔵のChromaでビルド時にハイライトする。配色はMonokai。
- hugo.tomlのmarkup.highlightでcodeFences=true、noClasses=true、style='monokai'を指定する。色は生成HTMLのインラインスタイルに含める。
- 追加のコード用CSS・JavaScriptを読み込まないため、codeフロントマターは不要。未指定のページでもコードフェンスを表示できる。mathの条件付き読み込みとは独立する。
- コードブロックの書体は--font-family-monospace。文字サイズ・内側余白・角丸はmain.cssの--font-size-code・--code-block-padding・--code-block-radiusで指定する。長い行はブロック内だけを横スクロールする。
- 内側余白の初期値は四辺とも1.5rem（ルート16px時に24px）。通常のpreとHugoが生成する.highlight直下のpreに明示して適用する。noClasses=true・Monokaiの配色を維持する。
- 日英のcontent/memo/sample-memo-2.*.mdにC・Bash・PowerShell（pwsh）・LaTeX・Juliaのサンプルを記載する。PowerShellのコードフェンスにはpowershellを指定する。手動要約の区切りより後に置き、一覧の要約には含めない。

### 補助機能

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

- トップページでは入口の `content/_index.ja.md`・`content/_index.en.md` の `math: true` で有効化する。読み込み処理は実装済み。
- MathJax 3.2.2のtex-chtmlをjsDelivrから読み込む。
- 区切りはインライン `$…$`、別行立て `\[…\]`。AMS環境に対応。独自マクロや番号付けの追加設定は未指定。

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
- CV・Publications・Projects・Memo・Newsの内容とURL。
- 各ページの日英対応関係。
- ページ種別ごとの日付・タグの表示方針。
- 本文のデザインと画像・表・コード・数式の表示。
- レスポンシブ対応の詳細。
- description、OGP、faviconなどのメタ情報。
- サンプルコンテンツ、未使用ファイル、重複設定の整理。

## 11. トップページのコンテンツ構成

- `content/_index.ja.md`・`content/_index.en.md` はページ全体の設定を持つ入口とする。
- `content/home/_index.*.md` にヒーロー用Markdownとショートコードを書く。
- `content/home/` にresearch・work・projects・news・contactの日英Markdownを配置する。表示順はweightの10・20・30・40・50。
- 現在の言語の `/home` を取得し、ヒーローと配下の通常ページを組み合わせる。
- 各セクションはsection・h2・.containerで囲む。ファイル名から言語サフィックスを除いた名前をIDにする（例：#research・#work・#contact）。
- ヒーロー以外は左にh2、右に内容を置く共通グリッド。見出しと内容の間、セクション間に区切り線を置かない。
- ヒーローの内容開始位置は右の内容列に揃える。画像は配置しない。
- 交互配色は保留し、背景は共通の白。セクション間の余白は `--home-section-gap: 6rem`。列幅・列間隔などはhome.cssの変数で調整する。
- 55rem以下では見出しを内容の上に配置する。
- widgetはsection・publications・projects・news。省略時はsection、以前のtextもsectionとして扱う。未対応値はビルドエラー。
- Research・Work・Contactは汎用section。Workの論文はfeatured_articlesショートコードから共通YAMLを参照する。
- homeのcascadeは両言語でbuild.list: local・render: never・publishResources: false。単独HTMLやリソースは出力しない。
- トップページ用homeが存在しない場合はビルドエラー。
- 画像などのアイコンはthemes/mytheme/assets/iconsに置き、Hugoのアセットとして公開する。旧home/publicationsウィジェットは互換性のため保持する。

## 12. コンテンツ種別とトップページの一覧

### コンテンツの分類

- `publication`・`project`・`news`・`memo` はHugoのコンテンツ種別（`type`）として扱う。
- 推奨配置は、それぞれ `content/publication/`・`content/project/`・`content/news/`・`content/memo/`。
- 通常のページは従来のデフォルトarchetypeを利用できる。
- news・memoはカテゴリではなく種別で区別する。news個別記事は共通のpage.html、memo個別記事は日付欄を加えるmemo/page.htmlを使う。本文は同じ共通部品で表示する。
- カテゴリやタグは、必要に応じて種別とは別に付けられる。
- Talksはcontent/talks/_index.*.mdによる日英の一覧ページを用意し、共通のdata/talks.yamlからtalksショートコードで年別に表示する。

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
| `news` | 本文の前に、現在の言語の `type: news` を日付の新しい順で、日付を見出し兼リンクとして、その右に手動要約を表示する |
| `projects` | 本文の前に、現在の言語の `type: project` で期間から継続中と判定した課題を、開始年月の新しい順ですべて表示する |

- publications・newsの件数は、各home用Markdownの `limit` で指定する。省略時は3件。
- `limit` は1以上の整数。該当する公開ページが少ない場合は、その件数だけ表示する。
- 下書き・未来の公開ページなどは、通常のHugoビルドの公開条件に従う。
- 該当ページがない場合は、見出しとMarkdown本文だけを表示し、空の一覧は出力しない。
- 一覧をMarkdownへ手動で転記せず、種類別のパーシャルで抽出・描画する。
- 表示は `home/publications.html`・`home/news.html`・`home/projects.html` に分離する。
- 各セクションには `home-section--publications` などのクラス、各一覧には `home-publications-list` などの専用クラスを付ける。種類ごとのスタイル調整はこれらに対して行う。
- 共通幅を維持し、トップの配置は11節、論文は22節に従う。
- Workでは選択した論文の書誌情報、newsは日付リンクと手動要約を表示する。projectは研究種別・番号・課題名・役割・必要時のみ代表者名・期間を表示する。

## 13. トップページの見出し表記

- 日本語版のトップページのセクション見出しは、英語版と同じResearch・Work・Research projects・News・Contactとする。
- ヒーローは日英ともTomoya Kemmochi。本文の言語は変更しない。

## 14. CTAショートコードとリンクの色

### CTAの使い方

D案（背景・枠線なし、末尾に一重シェブロン）を `cta` ショートコードで表示する。
CTA自体にfont-familyを指定せず、本文のOpen Sans・LINE Seed JPを継承する。ウェイト・スタイルは通常体とする。シェブロンは空のCSS擬似要素 `::after` にSVGをマスクとして指定する装飾で、読み上げる文字は挿入しない。
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
- メニューバーもホバー時に下線を表示する。現在位置はaria-currentで示し、通常時の下線は付けない。
- キーボードフォーカス時は2pxの枠を4px外側に表示する。
- CTAには `--cta-color`・`--cta-hover-color`・`--cta-active-color`・`--cta-focus-ring-color` を用意する。初期値は対応する通常リンク変数を参照する。
- CTAは通常・訪問済み・押下・フォーカスのみでは下線なし、ホバー時だけ下線を表示する。フォーカス時は枠を表示する。
- 言語切り替えは地球アイコンと切り替え先の言語名だけを表示する。日本語版はEnglish、英語版は日本語。翻訳があれば同じページ、なければ対象言語のホームへ移動する。

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
| h3 | `--font-size-h3` | `1.5rem`（24px） |
| h4 | `--font-size-h4` | `1.25rem`（20px） |
| メニューのサイトタイトル | `--font-size-site-title` | `1.25rem`（20px） |
| フッター | `--font-size-footer` | `0.875rem`（14px） |
| CTA | `--font-size-cta` | `var(--font-size-base)` |

- CTAはinline-flexで文字とシェブロンを中央揃えし、間隔は0.3125rem（ルート16px時に5px）とする。本文20pxで半角スペース1個分程度を目安とし、SVG内部の左右余白も絞った状態を維持する。
- シェブロンの領域は幅0.625rem（10px）、高さ1.625rem（26px）。SVGのviewBoxを `8 0 9 24` とし、線の形・大きさを維持して横方向の余白を削る。文字列の後ろに配置する。

## 16. トップページのCTA配置

- ヒーローを除く4セクションの日英Markdownに `cta` ショートコードを配置する。
- ResearchはCVへリンクする（日英とも `/cv`）。研究紹介の独立ページは未作成のため、既存の略歴ページを案内する。
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

- トップとNEWS一覧はnews/item.htmlを共用する。トップは日付の下に概要を置き、日付は通常のh3と同じ--font-size-h3（1.5rem）とする。独立した一覧はarticleで囲み、h2の日付リンクの下に要約を縦に置く。日付が記事タイトルとなり、front matterのtitleは指定不要。指定されていても表示・HTMLのtitle・RSSでは無視する。
- 一覧の日付は `<h2><a><time datetime="YYYY-MM-DD">YYYY-MM-DD</time></a></h2>`。個別ページは共通ページのh1内にtimeで表示し、重複する日付欄は置かない。Newsの日付をタイトルにする既存ルールは共通のタイトル処理で維持する。
- トップページの日付リンクは全状態で通常本文色。一覧ページの日付リンクは通常リンク色の緑とする。通常時は下線なし、項目ホバー時は日付に下線、キーボードフォーカス時は枠を表示する。
- 個別項目に「続きを読む」は置かず、項目全体もリンクにしない。日付が個別ページへのリンクとなる。要約は選択・コピーできる。
- 要約はMarkdownの `<!--more-->` までをHugoの.Summaryで表示する。区切りがなければ全文を表示し、文字数指定の自動要約やCSSによる切り詰めは使わない。
- 日付横の縦線・項目間の区切り線は置かない。項目ホバー・focus-within時だけグレー#a6a6a6の四辺枠を表示する。透明枠を確保して位置ずれを防ぐ。
- トップページの余白は--news-item-padding（1rem）、項目間は--news-item-gap（1rem）。独立した一覧は§29の共通カードスタイルを使う。
- 既存ダミー記事は保持する。titleが残っていても日付を優先し、新規archetypeからはtitleを外す。
- news/section.htmlで新しい日付順にページ分割する。page_sizeはcontent/news/_index.*.mdで指定し、初期値・省略時3件。トップのlimitとは独立。
- ページ送りは前へ・ページ番号・次へ。1ページなら非表示、前後がない場合は非リンクの無効表示。
- 7ページ以下は全件、8ページ以上は先頭・末尾・現在ページ前後1件と省略記号。例：全20ページの10ページ目は「前へ 1 … 9 10 11 … 20 次へ」。
- 現在ページにaria-current、背景は--header-background、文字は白。他の番号は通常本文色、前後は#737373、無効は#8a8a8a。
- projects・memoも同じページ送り部品を共用する。スタイルはnews.css。

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
- トップページの課題名はh3・本文色・太字。一覧ページはarticle内のh2を通常リンク色の緑で表示し、サイズはMemo・News一覧のh2と共通にする。
- 次の行にグレーのroleを表示し、is_PI=falseの場合だけ間隔を空けて「研究代表者：氏名」を添える。
- 最後に期間をグレー文字で表示する。トップページでは従来どおり小さめの文字、独立した一覧では通常本文と同じ--font-size-baseで表示する。
- 通常は区切り線なし、ホバー時はグレーの四辺枠と課題名のみの下線を表示する。キーボードフォーカスでは枠を表示する。
- トップはラベルなし、リスト末尾に既存CTAショートコードによる一覧へのリンクを1つ配置する。
- 一覧は期間と同じ行の右端に状態バッジを置く。研究種別・課題番号の行には置かない。全デバイスで同じ2列のGridを使い、期間欄は必要なら折り返すが、バッジは右列に保つ。バッジの文字サイズは従来のままとする。
- 一覧は継続中を緑の枠ラベル、完了を薄いグレー枠ラベルで表示する。開始予定は緑枠の別文言で表示する。
- ラベルの緑文字は読みやすい濃さとし、枠はヘッダー色を使う。
- 一覧のpage_sizeは `content/project/_index.*.md` で指定し、省略時3件。NEWSと同じページ送り部品・配色・省略規則を共用し、ナビゲーションのラベルはプロジェクト用にする。
- スタイルはprojects.css、共通カード・状態判定・リンク判定は `_partials/projects/` に置く。
- 既存ダミー課題を新メタデータに移行する。外部URLは架空例としてexample.comを使用し、実際の研究課題へのリンクとはしない。

## 22. 論文データと注目論文

- 論文情報は日英共通の `data/publications.yaml` で管理する。ユーザー提供の旧サイト用publications.mdから転記した30件を保存する。
- トップページのWorkと日英の一覧ページは共通YAMLを参照する。既存のpublication個別ダミーページは削除せず保持するが、一覧には自動列挙しない。
- データにはid・title・authors配列・date・year・kind・language・peer_reviewed・journal・volume・number・pages・article_number・doi・links配列を持てる。
- dateは引用符付きYYYY-MM-DDで並び順に使用する。出典に年しかなければYYYYだけを保存し、月日を推測しない。yearは書誌情報の発行年として別に扱う。年も不明ならdate/yearを省略する。
- WorkはYAMLのfeaturedが真偽値trueの論文をdateの降順で、featured_articlesショートコードのlimit件だけ表示する。limitの省略時は1件、複数の場合も縦並び。現在は以前の表示対象2件だけfeatured: trueにし、日英トップは引数なしで新しい1件を表示する。featuredの省略・falseは対象外。旧publicationsウィジェットの自動抽出（article/en/peer_reviewed=true、date降順、limit件）は互換用に保持する。
- Recentに該当する論文でdoiがないものは警告して除外する。不正形式のdoiはビルドエラー。doiにはURLではなく10.xxxx/から始まる文字列を記載する。
- WorkのFeatured articleはh3、各論文タイトルはh4の本文色・太字。その下にbyと著者名、雑誌情報、大文字DOIと識別子を表示する。旧Recentのタイトルはh3のまま保持する。
- journal・volume・number・pages・yearは存在する項目だけ表示し、欠落した項目のラベルや余分なカンマを出さない。article_numberがあればpagesに優先してArticle表記を使う。
- 雑誌名はcite要素で、論文のlanguage=enの場合だけ斜体とする。日本語論文は通常体。英語の著者は1名、2名、3名以上の連結を分け、日本語の著者は読点で連結する。Recentのメタデータはグレー。
- カード全体が `https://doi.org/識別子` へのリンクとなり、同じタブで開く。DOI表示部分を別のリンクにはせず、リンクの入れ子を作らない。
- Workの論文は通常時から細いグレー外枠を表示し、ホバー時は枠を濃くしてタイトルだけに下線を付ける。フォーカス時も枠を表示する。位置ずれは起こさない。
- 各論文内にCTAは置かない。リスト後にh3のExplore moreを置き、論文一覧・講演一覧へのCTAを並べる。
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
- 補足リンクのラベルは前後の空白を除き、リンク要素同士の間にはテンプレート由来の空白・改行を出力しない。表示上の間隔はpublication-linksのCSSのgapで指定する。ラベル内の単語間スペースは維持する。
- 補足リンクは白背景・通常リンク色の細枠と文字。ホバー・フォーカス・押下時にinset box-shadowで枠を内側へ太く見せ、font-weightを700にする。下線と塗りつぶしは行わない。
- 枠付き補足リンクのパディングは上下0.25rem・左右0.5rem（ルート16px時に4px・8px）とし、--publication-link-padding-block・--publication-link-padding-inlineで指定する。行高は本文と独立した--publication-link-line-heightで指定し、初期値は1.1。文字サイズ20pxでは行ボックス22px・枠を含む全高32pxとなる。
- 論文の枠付き補足リンクはGoogle FontsのInconsolataを使い、日本語文字はLINE Seed JPへフォールバックする。その他の本文・CTAはOpen Sans・LINE Seed JPを継承する。太字化による文字幅の変化は補正しない。
- スタイルはpublications.cssで管理する。一覧ページは通常の共通テンプレートでMarkdownとpublicationsショートコードを描画し、専用のページテンプレートは使わない。

- 論文一覧はolのreversed/startと標準のリストマーカーを使用し、liのdisplayはlist-itemを維持する。番号の直書きや表示用spanは設けない。背景だけを空の擬似要素で番号領域まで広げ、番号上のホバーとfocus-withinに対応する。折り返し行・補足リンクは通常のブロック配置で揃える。

### 旧サイトの論文データ取り込み

- 添付publications.mdからプレプリント1件、査読済み英語論文22件、査読済み日本語論文2件、査読なし日本語論文5件を転記する。
- DOI、arXiv番号、MR番号、zbMATH番号を保持する。Journal・arXiv・Movies・Read-only link・PDF・Preprintなどのリンクも保持する。
- 日本語の講究録記事は研究集会名eventと発行機関publisherも保存する。これらの追加項目は現時点の一覧では表示しない。
- staticrefのローカルPDFは旧サイトの絶対URLにする。PDFファイル自体の移行とリンクの到達確認は未実施。
- Shifted LOPBiCGのDOIがTensor product-type methodsのDOIと重複している点は原文どおり保存し、source_noteに確認事項を残す。
- Modified Strang splittingの最終著者名Siao-Liang Zhangも原文どおり保存する。他論文のShao-Liang Zhangとの表記差は未修正。
- 書誌情報は資料にない値を補わない。同一年のデータは資料の記載順を保持する。ページ範囲の二重ハイフンや数式記法も元の値を保持する。

### 標準番号とフォント設定

- 通常本文は `"Open Sans", "LINE Seed JP", sans-serif` とする。メニューバーとh1・h2は引き続きMontserratを優先する。
- Google FontsからOpen SansとInconsolataの通常体400・太字700を読み込む。Interは読み込まない。
- 論文の枠付き補足リンクには `font-optical-sizing: auto` を指定する。その他の箇所の光学サイズ調整はブラウザの既定に従う。
- optical sizingはフォントが対応している場合に働く。太字化時の字幅変化の補正は行わない。
- 論文番号の余白は `--publication-archive-indent: 3.5rem`。擬似要素は空の装飾であり、番号や文字列は生成しない。親li内で独立した重なり順を確保し、背景を本文・標準マーカーの背面に描く。

## 24. MathJaxの条件付き読み込み

- ページのフロントマターに真偽値 `math: true` を指定した場合だけMathJaxを読み込む。省略・falseの場合は読み込まない。文字列の"true"などはビルドエラー。
- YAMLでは `math: true`、TOMLでは `math = true` と書く。通常ページのindex・単独Markdownと、一覧・トップの_indexのいずれにも適用する。
- `head/math.html` はページごとに判定し、キャッシュしない。設定JS→MathJax本体の順にdeferで実行する。
- 設定はassets/js/mathjax-config.jsに置き、Hugoで圧縮・ハッシュ付与する。本体は `https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-chtml.js` を使う。
- インラインは `$…$`、別行立ては `\[…\]`。AMSのalign・align*・equation・equation*・gather・gather*・alignat・multlineなどに対応する。
- GoldmarkのPassthroughを有効にし、数式内のアンダースコア・バックスラッシュ・改行・アラインメント記号を保持する。インライン用レンダーフックではHTMLエスケープして出力する。
- 行列やcases・alignedなどは別行立て数式またはAMS環境の内側で使う。別行立ての中でHTMLとして解釈されうる不等号を書く場合は `\lt`・`\gt` を使うと確実。
- コードブロック・インラインコード・script・styleなどはMathJaxの処理対象から除く。
- トップページの組み込み本文に数式がある場合は、入口のcontent/_index.*.mdで有効化する。組み込み元のmathだけではトップにスクリプトを追加しない。
- NEWSなどの一覧に数式入り要約を表示する場合も、表示先の_index.*.mdでmathを有効にする。個別ページのmathは一覧へ自動伝播させない。
- 現在は日英のトップページ・論文一覧・CVでmath=trueを指定する。その他のページは必要に応じて編集者が明示する。

```markdown
---
title: 数式を含むページ
math: true
---

インライン数式は $a_b + c_d$ です。

\[
\sum_{i=1}^{n} x_i
\]

\begin{align*}
a_b &= c_d + 1 \\
x &= y + 2
\end{align*}
```


## 25. トップページ用ショートコード

### hero_header

```markdown
{{< hero_header >}}
准教授

[名城大学](https://www.meijo-u.ac.jp/) [理工学部](https://www.meijo-u.ac.jp/academics/sci_tech/) [数学科](https://sites.gmath.meijo-u.ac.jp/)
{{< /hero_header >}}
```

- ページのtitleをh1として自動出力し、内部Markdownと一緒にheader要素で囲む。左の緑の線はheaderの範囲だけに付ける。
- 所属の3つのリンクは半角スペースで区切る。画像は置かない。アイコンリンクはheaderの外に書く。

### icon_link

```markdown
{{< icon_link icon="icons/mail.svg" url="#contact" label="連絡先" >}}
{{< icon_link icon="icons/scholar.svg" url="https://scholar.google.co.jp/citations?user=tNnJyuMAAAAJ" label="Google Scholar" >}}
```

- icon・url・labelが必須。labelはアイコンのみのリンクのアクセシブル名とツールチップに使用する。
- iconはthemes/mytheme/assetsからの相対パス。透過SVG等をCSSマスクとして使用し、文字色を継承する。既存の図形を再利用でき、新規JS・アイコンライブラリは不要。
- urlは内部ページ・#アンカー・HTTP(S)。内部ページは現在言語と/New-site/を反映。外部は同じタブで開く。
- メール・学帽・ORCID・住所・地球の5アイコンを同梱する。

### keywords

```markdown
{{< keywords >}}
- 有限要素法
- 構造保存解法
{{< /keywords >}}
```

- 内部Markdownのul/liを保ち、Flexboxで横並び・折り返し。リスト記号を消し、無彩色の枠を付ける。色付きボタンにはしない。

### featured_articles

```markdown
### Featured article

{{< featured_articles >}}

<!-- 複数表示する場合：{{< featured_articles limit=3 >}} -->

### Explore more

{{< cta text="論文一覧" url="/publication" >}}
{{< cta text="講演一覧" url="/talks" >}}
```

- data/publications.yamlの各論文にfeatured: true/falseを指定する（省略時は対象外）。trueの論文だけをdateの降順で表示し、同じdateならデータの記載順を保つ。タイトルはh4。本文の書誌情報は転記しない。
- limitは省略時1、1以上の整数。表示件数は対象論文数を上限とし、該当なしなら空のulも出さない。日付不明の論文は日付があるものの後に置く。
- 旧ids引数は使わない。未対応引数・不正なlimit・表示対象の有効なDOIなしはビルドエラー。単一・複数とも同じテンプレート。
- Workそのものは汎用section。headingやCTAはMarkdownに記述する。

### contact

```markdown
{{< contact icon="icons/mail.svg" text="kemmochi [at] gmath.meijo-u.ac.jp" kind="email" address=false >}}
{{< contact icon="icons/location.svg" text="〒468-8502\n名古屋市天白区塩釜口1-501" address=true >}}
```

- icon・textが必須。addressは省略時false、trueのときだけ項目をaddress要素で囲む。住所も通常体で表示する。
- textの\nは改行として扱う。文字列はHTMLとして解釈しない。
- urlは省略可能。指定した場合だけ文字をリンクにし、HTTP(S)・内部ページ・#アンカー・mailtoを使える。アイコンは常に非リンクの装飾。
- kind="email"を指定すると専用クラスを付け、--font-family-monospace（Inconsolata、LINE Seed JP、monospace）を継承する。リンクなしのメールも同じ方法で表示する。code要素は使わない。
- 現在のメールは旧サイトと同じ[at]表記・リンクなし。大学の住所はaddress=true。アイコンは通常本文色。
- 本文は日英のcontent/home/contact.*.mdで編集する。


## 26. 講演データと年別一覧

### データ

- 日英共通のdata/talks.yamlを使用する。講演一覧ページは共通の通常ページテンプレートにMarkdownとtalksショートコードを記述し、専用ページテンプレートは使わない。ユーザー提供の旧日本語サイトindex.mdから2014〜2025年の83件を転記した。招待講演36件、英語題目25件、キャンセル2件。languageは題目の表記をもとに分類し、実際の発表言語は外部確認していない。
- ページの表示言語と講演そのもののlanguageは別。日英ページは同じデータを参照し、日本語の題名や固有名詞を勝手に英訳しない。日付・「発表」等のラベルだけページの言語に合わせる。
- 招待フラグはinviteに統一する（invitedという別フィールドは設けない）。

| 項目 | 形式・意味 |
| --- | --- |
| id | 講演ごとの識別子 |
| invite | 真偽値。省略時false |
| authors | 著者名の配列。原文の○・◯も保持 |
| title | 講演題目。Markdown・インライン数式も使用可 |
| workshop | 研究集会名 |
| url | 研究集会へのリンク。任意 |
| venue | 開催会場。原文にない場合は省略 |
| city | 開催都市・地域。原文にない場合は省略 |
| period_start | 開催初日。引用符付きYYYY-MM-DD |
| period_end | 最終日。1日開催の場合は省略 |
| date | 発表日。任意、引用符付きYYYY-MM-DD |
| language | 講演言語。省略時ja |
| year | 年別一覧への分類に使う4桁の年 |
| canceled | 任意。キャンセル理由の文字列（真偽値ではない） |

- 元資料のリンクをurl・venue_url・links配列で保持する。ポスター発表はformat: poster、原文の不整合はsource_noteに保存する。
- 日付・期間は推測で補わない。原文の2017年RIMS講演の発表日が開催期間外、2015年A3講演の開催年が2016年となっている点は未修正。yearは原文の年見出しを維持する。

```yaml
- id: example-talk
  year: 2025
  invite: true
  authors:
    - 剱持智哉
  title: 講演題目
  workshop: 研究集会名
  venue: 開催会場
  city: 開催都市
  period_start: '2025-03-18'
  # 複数日ならperiod_end、発表日が分かればdateも指定する。
  # language: ja
  # canceled: キャンセルの理由
```

### ショートコード

```markdown
{{< talks year=2025 >}}
{{< talks year=2024 language="en" >}}
{{< talks year=2024 language="ja" >}}
```

- yearは必須。languageは省略するとその年の全言語、指定すると講演のlanguageと一致するものだけを表示する。データのlanguage省略はjaとして抽出する。
- 日本語版一覧はlanguage引数を省略して全83件を表示し、英語版一覧はlanguage="en"を指定して英語の25件だけを表示する。英語の言語コードはenに統一する。
- yearをh2にし、日付の新しい順で標準のol/liを出力する。番号は1から増える。該当なしでも年見出しは出すが、空のolは出さない。
- ソートはdateがあればdate、なければperiod_startの降順。同日のものはデータの記載順を保つ。年の分類はyearを使う。
- 複数の同年ショートコードを置いても見出しIDが重複しない。
- 表示は先頭の招待バッジ、著者、太字題目、集会・会場・都市、開催期間・任意の発表日。元の補足リンクも表示する。
- talks/date.htmlはtime要素の前後に空白・改行を出力しない。開催期間の区切り「–」の前後や発表日の閉じカッコ直前に意図しない空白を入れず、英語の日付表記内など必要なスペースは保つ。
- invite=trueだけにピンク背景のInvitedバッジ。Montserratの300（細字）、背景色・文字色・寸法はtalks.cssの変数で指定。メニューと通常見出しの400は維持する。
- canceled指定時は講演情報全体（招待バッジ・著者・題目・集会・会場・都市・日付・補足リンク）に取り消し線を付ける。各段落のテキストをs要素で囲み、標準のリスト番号を維持する。「中止／Canceled」と理由は別行に取り消し線なしで表示する。キャンセルされた講演も年別一覧に保持する。
- データ由来のHTMLをそのまま挿入しない。titleだけHugoのMarkdown処理を通し、ほかはテキストとして出力。数式を含むので日英のTalksでmath: trueを指定する。
- talks.cssは講演一覧とショートコードのスタイルを担当する。リスト記号はブラウザ標準を使用し、番号の直書きはしない。
- Invitedバッジの内側余白は旧サイトに合わせて上下0・左右0.25rem（4px）。色・書体・ウェイトは維持する。
- 講演項目のホバー・focus-within時に論文一覧と同じ#f5f5f5背景を表示する。空の擬似要素で番号領域まで背景を広げ、通常時の文字位置・標準のol/liを維持する。

## 27. CVと経歴用ショートコード

### ページ構成

- content/cv/index.ja.md・index.en.mdにMarkdownで記述する。typeはpageのまま共通の通常ページテンプレートを使用し、layout指定は置かない。
- h1はページタイトル、Career・Education・Academic service・Awards・Grantsは通常のMarkdownの `##` でh2を出力する。見出しは内容の上に置き、左右の列には分けない。
- タイムライン・縦リストだけをcv_listで出力する。各項目はcv_entryで記述し、表示形式は親から引き継ぐ。旧cv_sectionはcv_listへ置き換える。
- 職歴・学歴はtimeline、委員歴・受賞歴・外部資金獲得歴はlist。Markdownの記載順を維持し、自動並べ替えはしない。
- 本文は表示確認用のダミー。職歴3件・学歴3件・委員歴5件・受賞歴3件・外部資金獲得歴3件を日英で同じ年月・順序に揃え、架空であることをページ先頭に明記する。
- 在籍・役職・助成期間はstart/end、学位取得・受賞はdate。委員歴は活動ごとに別のcv_listを置き、重複する期間も独立した項目として表示する。
- 外部資金は研究代表者・研究分担者に分け、架空の助成名・役割・課題番号を本文に記述する。プロジェクトデータとの自動連携は設けない。
- 元のmath: trueを維持する。通常ページは作成日を自動表示せず、CVではentryに指定した時期だけを表示する。

### cv_list

```markdown
## Career

{{< cv_list layout="timeline" >}}

{{< cv_entry start="2025-04" end="present" >}}
**所属名**

職位
{{< /cv_entry >}}

{{< /cv_list >}}
```

- layoutはtimelineまたはlist。省略時はtimeline。title引数や見出し生成は設けない。
- cv_listの中にはcv_entryだけを記述する。セクション見出しや活動グループのh3・h4は外側に通常のMarkdownで書く。
- timelineはol/liで時期を本文の前に表示し、点と線をCSSで装飾する。end="present"の点だけ緑。隣り合う項目だけをつなぎ、別のリストまで線を延ばさない。
- listはul/liで本文の下に時期を表示し、点・線は付けない。
- 標準のリスト要素を使い、番号や記号はCSSで非表示。role="list"を明示して読み上げ時のリスト構造を保つ。
- cv_entryがない空のリストは出力しない。

### cv_entry

```markdown
## Academic service

### 学会名

#### 研究部会名

{{< cv_list layout="list" >}}

{{< cv_entry start="2025-04" end="present" >}}
主査
{{< /cv_entry >}}

{{< cv_entry start="2023-04" end="2025-03" >}}
幹事運営委員
{{< /cv_entry >}}

{{< /cv_list >}}
```

- cv_listの直接の子として使う。本文はHugoのMarkdownで描画し、太字・斜体・リンク・見出し・箇条書き・コード・数式などを記述できる。数式は表示先ページのmath: trueで有効化する。
- 期間はstart="YYYY-MM"とend="YYYY-MM"、継続中はend="present"。単一時点はdate="YYYY-MM"のみ。dateとstart/endは混在させず、終了年月の省略を継続中とは解釈しない。
- 年月はYYYY-MMで管理し、YYYY.MMで表示する。presentは日本語版で「現在」、英語版で「Present」。年月はtime要素、presentは通常のテキスト。
- 不正な年月、期間の逆転、日付指定の不足・混在、親リストなし、未対応引数・layoutはビルドエラー。
- 追加時はentryを希望の位置へ追記する。役職変更時は旧entryのpresentを終了年月に置き換え、新しいentryを先頭に追加する。
- entryが生成した安全なHTMLを内部プレースホルダー経由でリストに組み立てる。Goldmarkのunsafe設定は変更しない。
- スタイルはassets/css/cv.css。リスト間・項目間の余白、時期の文字サイズ、点・線の寸法と色をCSS変数で指定する。見出しやページ幅は通常ページの共通スタイルに従う。


## 28. 通常ページと専用一覧テンプレートの境界

- 通常ページのHTMLはlayouts/_partials/page-content.htmlに集約する。単独ページのpage.htmlと汎用セクションのsection.htmlは、どちらもこの共通部品を呼び出す。taxonomy.html・term.htmlも共通部品に統一し、分類一覧を自動挿入しない。
- 共通部品は既存の.container（最大幅--content-max-width: 75rem）でh1とMarkdown本文だけを表示する。h1・h2のMontserrat 400、共通ヘッダー・フッターは既存のmain.css・baseof.htmlから継承する。
- 作成日・タグ一覧・子ページ一覧を通常ページへ自動追加しない。必要な内容はMarkdownまたはショートコードで明示する。
- News個別記事は、既存の「dateをタイトルに使い、titleは無視する」ルールを共通のタイトル処理で維持する。これはh1の内容であり、別の日付欄は追加しない。

| 対象 | ページテンプレート・内容の置き場所 |
| --- | --- |
| CV | 共通page.html、content/cv/index.*.mdのMarkdown見出しとcv_list/cv_entry |
| 論文一覧 | 共通section.html、content/publication/_index.*.mdとpublications |
| 講演一覧 | 共通section.html、content/talks/_index.*.mdとtalks |
| 通常の個別記事・任意の汎用セクション | 共通page.html/section.htmlとMarkdown本文 |
| メモ個別ページ | 専用memo/page.htmlから共通本文部品を呼び出し、日付のみ追加 |
| トップページ | 専用home.html |
| プロジェクト一覧 | 専用project/section.html |
| NEWS一覧 | 専用news/section.html（ページ送りも維持） |
| メモ一覧 | 専用memo/section.html（手動要約・日付・ページ送り） |

- CV・publication一覧・talks一覧・News個別記事の専用ページテンプレートは削除する。CVのlayout: cvも削除する。
- 経歴、論文、講演のデータ抽出・項目デザインは既存のショートコード・パーシャル・CSSで維持する。ページ専用ラッパーのクラスには依存させない。
- CVと講演一覧の末尾余白は各ショートコード自身が担当する。Hugoの_index.mdはセクションとして管理するまま、URLや既存コンテンツは移動しない。


## 29. Memoと一覧ページの共通デザイン

- Memo個別ページはmemo/page.htmlを使い、共通のpage-content.htmlへ日付欄を渡す。h1・本文・幅・ヘッダー・フッターは通常ページと共通。日付以外の装飾・自動情報は追加しない。
- 公開日はdate、更新日はlastmodで指定する。Hugoはlastmod未指定時にdateを使うため、公開日より新しいlastmodがある場合だけ更新欄を表示する。同日時・過去の日時は重複表示しない。日付はtime要素とRFC3339形式のdatetime属性を使う。
- Memo一覧は新しい公開日順。各記事はarticle、タイトルはh2内のリンク、その下に日付欄・手動要約・グレーの「続きを読む」（英語ではRead more）を置く。
- 要約はNewsとcontent/summary.htmlを共用し、`<!--more-->`までを表示する。区切りがない場合は全文を表示する。文字数指定の自動要約はしない。
- カード全体はリンクにせず、タイトルと「続きを読む」がそれぞれ個別ページへリンクする。項目ホバー時はグレーの枠とタイトルの下線を表示。「続きを読む」は自身のホバー時だけ下線を出す。
- Memo・News・Projectsの独立した一覧はarchive.cssの共通カードを使う。h2のサイズは--archive-title-size（初期値--font-size-h2）、Montserrat 400。タイトルは通常リンク色、ホバー時は通常リンクのホバー色と下線を使う。トップページにはこのスタイルを適用しない。
- 共通の余白・間隔・枠色は--archive-card-padding、--archive-card-gap、--archive-item-gap、--archive-border-color、--archive-border-radiusで指定する。透明枠を先に確保し、ホバー時の位置ずれを防ぐ。
- News一覧ではh2の日付をタイトルとし、独立した日付欄・更新日・続きを読むは置かない。Projects一覧では種別・課題番号をh2の上に置き、状態バッジとカード全体のリンクを維持する。各課題はarticleとし、続きを読むは置かない。
- Memo一覧のpage_sizeはcontent/memo/_index.*.mdで指定し、省略時3件。News・Projectsと同じ省略表示付きページ送りを使う。
- Memoの日付と続きを読むの文字色・サイズはmemo.cssの--memo-meta-color・--memo-meta-sizeで指定する。
- 日英の既存ダミーMemoに手動区切りを追加し、sample-memo-2には更新日の例を設定する。


## 30. レスポンシブヘッダーとモバイルメニュー

- ブレークポイントは75rem（通常1200px）と48rem（通常768px）。75rem以上は既存のPC横並び、48rem以上75rem未満はタブレット、48rem未満はスマートフォンとして扱う。CSSとJavaScriptの75rem判定を揃える。
- タブレット・スマートフォンの緑の帯には左側の名前と、右上のハンバーガーボタンだけを表示する。帯の高さはタブレット4.5rem、スマートフォン4rem。ボタンは2.75rem角、緑背景・白いSVGアイコンとし、通常時の枠線と影は付けない。スクロールしても画面右上に固定する。配色は--menu-toggle-color・--menu-toggle-backgroundで指定する。
- ハンバーガーの3本線の間隔は狭めにする。ボタン本体と緑背景は2.75rem角（ルート16px時に44×44px）。背景は擬似要素で描き、--menu-toggle-background-inset-block・--menu-toggle-background-inset-inlineの初期値はともに0。角丸は--menu-toggle-background-radiusで指定し初期値0.375rem（6px）。操作範囲は44×44px。画面端からの位置は維持する。
- 右側にヘッダーと同じ緑背景のパネルを表示する。幅はタブレット22rem、スマートフォン20remを上限とし、狭い画面でも左側に最低3remの背景を残す。閉じるボタンは開くボタンと同じ位置に置き、通常時の枠と背景をなくした白いバツ印とする。操作範囲は2.75rem角を保ち、ハンバーガーと閉じるボタンのSVGは--menu-icon-size（初期値2rem）を共用する。
- パネルは画面の高さいっぱいに表示する。下端の余白にはsafe-area-inset-bottomを加え、言語リンクをホームインジケーターと重ねない。高さ30rem未満では段間の余白を縮め、ナビゲーション部分だけをスクロールする。
- 上段左側にサイト名（.Site.Title）と現在の言語のトップページへのリンク、右側に閉じるボタンを置く。その下にCV・Publications・Projects・Memo・Newsを縦に並べ、地球アイコン付きの言語リンクを最下部左側に置く。言語の表示・リンク先・現在位置の判定はPCと共通のパーシャルを使う。ハンバーガーと閉じるボタンのアイコンは既存のインラインSVGを使う。
- ナビゲーションの文字はMontserrat 400・白。言語リンクの文字・地球アイコン・枠も白。ホバー時のみ既存のヘッダーと同じ淡い白緑色と下線を使う。現在の項目・祖先の項目はパネル背景に白を12%混ぜた、少し明るい緑背景とする。色は--drawer-background・--drawer-text-color・--drawer-link-hover-color・--drawer-current-backgroundで指定する。言語リンクは1rem、メニュー項目は--font-size-h3。高さの小さい画面ではナビゲーション部分だけをスクロールし、閉じるボタンは上部、言語リンクは下部に残す。
- パネル外は黒・不透明度45%で覆う。標準のdialog.showModal()で背景を操作不可にし、bodyを固定して背景スクロールを止める。閉じたら元のスクロール位置へ戻す。
- 背景タップ・閉じるボタン・Escで閉じる。リンク選択時も閉じる。開いた際は閉じるボタンへフォーカスし、Tab/Shift+Tabはパネル内で循環させる。閉じたら開くボタンへフォーカスを戻す。PC幅へ広げた場合はパネルとスクロール固定を解除する。
- 開閉はCSSで200msの移動と背景のフェードを行う。prefers-reduced-motion: reduceでは動きを省略する。閉じるアニメーションが終わるまでモーダル状態を維持する。
- 外側のdialogはoverflow: clipとし、スクロールコンテナーにしない。overflow: hiddenでは、画面外にある閉じるボタンへのautofocusがdialogを横スクロールさせ、スライド中の位置がぶれるため。ナビゲーション部分の縦スクロールは維持する。
- スタイルはassets/css/header.css。色・寸法・時間はCSS変数で指定する。開閉制御はassets/js/main.jsのvanilla JavaScriptだけを使用し、deferで読み込む。ライブラリは追加しない。
- JavaScriptが使えない場合はハンバーガーボタンを隠し、従来のリンクをヘッダー内で折り返して表示する。
