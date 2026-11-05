このテーマ及びREADMEは、ユーザーの指示・レビューのもと、Codexにより作られました。

# Hugoによる研究者向け個人サイト

[English README](README.en.md)

日本語・英語に対応した、研究者の個人サイトです。既存テーマを採用せず、`themes/mytheme/`に自作のテンプレート・CSS・最小限のJavaScriptを置いています。論文・講演の情報は、日英で共通のYAMLデータを参照します。

## 目次

- [起動とビルド](#起動とビルド)
- [主なファイル](#主なファイル)
- [hugo.tomlの設定](#hugotomlの設定)
- [トップページの編集](#トップページの編集)
- [通常ページ・News・Memo・Project](#通常ページnewsmemoproject)
- [ショートコード](#ショートコード)
- [論文データ](#論文データ)
- [講演データ](#講演データ)
- [見た目の調整](#見た目の調整)
- [公開と更新時の確認](#公開と更新時の確認)

## 起動とビルド

動作確認済みのHugoは**0.168.0**です。GitHub Actionsでもこのバージョンを使用しています。現在のサイトのCSS・JS処理に、Node.js・Tailwind CSS・Dart Sassの導入は不要です。

リポジトリのルートで実行します。

```sh
hugo server        # 開発用サーバー
hugo server -D     # draft: trueの下書きも表示
hugo --minify      # 本番用ビルド。出力先はpublic/
```

既定では`hugo server`は開発環境、`hugo`は本番環境です。`-D`は下書きを含める指定で、環境の切り替えとは無関係です。`--environment production`などで環境を明示することもできます。

開発環境ではCSS・メインJSを圧縮せず、ソースマップを出力します。本番環境ではminify・fingerprintを適用します。MathJax設定用JSは環境によらず圧縮・ハッシュ付与します。JSは`defer`で読み込みます。

## 主なファイル

| パス | 役割 |
| --- | --- |
| `hugo.toml` | URL、言語、コード表示、数式などの設定 |
| `config/_default/languages.yaml` | 日英のヘッダーナビゲーションメニュー |
| `content/` | 日英のMarkdownページ |
| `content/home/` | ヒーローとトップページの各セクション |
| `data/publications.yaml` | 日英共通の論文情報 |
| `data/talks.yaml` | 日英共通の講演情報 |
| `data/projects.yaml` | トップ・一覧・CVで共有する外部資金情報 |
| `archetypes/` | `hugo new`で作るコンテンツの雛形 |
| `themes/mytheme/layouts/` | ページテンプレート、パーシャル、ショートコード |
| `themes/mytheme/assets/css/` | リセット・共通・各部品のCSS |
| `themes/mytheme/assets/js/` | メニュー制御とMathJax設定 |
| `themes/mytheme/assets/icon/` | メニュー・閉じるボタン・シェブロンのSVG |
| `themes/mytheme/assets/icons/` | 連絡先・言語切り替えなどのSVG |
| `static/` | 必要に応じて配置する画像・PDFなど。公開時にそのままコピーされる |
| `docs/design.md` | 詳細な実装仕様 |
| `AGENTS.md` | Codexと開発するときの作業方針 |
| `.github/workflows/hugo.yaml` | GitHub Pagesへのビルド・公開処理 |

`public/`は生成物です。直接編集せず、元のMarkdown・データ・テンプレートを編集します。

## hugo.tomlの設定

### Hugo標準の設定とテーマ独自の設定

**現時点では、このテーマが参照する独自のグローバル`[params]`設定はありません。** トップの`widget`や表示件数の`limit`などは、`hugo.toml`ではなく各Markdownのフロントマターに指定します。

| 設定 | 用途・注意点 |
| --- | --- |
| `baseURL` | 公開先URL。現在は`https://t-kemmochi.github.io/New-site/`。サブディレクトリを含め正しく指定する |
| `theme = 'mytheme'` | 自作テーマの選択 |
| `defaultContentLanguage` / `defaultContentLanguageInSubdir` | 既定言語と`/ja/`を付ける設定 |
| `timeZone` | 日付の解釈。現在は`Asia/Tokyo` |
| `languages.ja.title` / `languages.en.title` | ヘッダーのサイト名・ホームへのリンクの表示名 |
| `services.googleAnalytics.id` | GA4測定ID。空欄なら計測コードを出力しない |
| `markup.highlight` | Hugo内蔵のコード表示。現在は`noClasses = true`、`style = 'monokai'` |
| `markup.goldmark.extensions.passthrough` | 数式の区切りをMarkdown処理から保護する設定 |

これらはHugo標準の設定です。既存の`languages.*.label`と`languages.*.params.description`は現在のテンプレートでは表示に使っていません。言語切り替えの表示名「日本語」「English」はテンプレート側にあります。

GA4の例：

```toml
[services.googleAnalytics]
  id = 'G-XXXXXXXXXX'
```

計測コードは本番ビルドだけに出力し、`hugo server`では出力しません。コードや計測の設定値をREADMEに書くだけでは有効にならず、`hugo.toml`を編集する必要があります。

### ヘッダーメニューの設定

メニューだけを**`config/_default/languages.yaml`**に分離しています。Hugoが`hugo.toml`と自動で統合する標準の設定ファイルです。言語名・サイト名などの設定は引き続き`hugo.toml`で管理します。

```yaml
ja:
  menus:
    main:
      - identifier: cv
        name: CV
        pageRef: /cv
        weight: 20
en:
  menus:
    main:
      - identifier: cv
        name: CV
        pageRef: /cv
        weight: 10
```

これは1項目だけを抜き出した例です。`ja`・`en`それぞれの`menus.main`に項目を追加します。`identifier`はメニュー内で一意にし、`name`は表示名、`pageRef`は現在の言語のページパス、`weight`は小さい順の表示順です。ホームは`pageRef: /`を指定します。PCとハンバーガーメニューは同じ定義を使い、現在のページ・祖先ページの表示も従来どおりです。

## トップページの編集

### ファイルと表示の関係

日本語は`.ja.md`、英語は`.en.md`を編集します。

| ファイル（日本語版） | 役割 |
| --- | --- |
| `content/_index.ja.md` | トップページの入口。ページ全体の`math`もここで指定 |
| `content/home/_index.ja.md` | 名前・職位・所属・アイコンリンクなどのヒーロー |
| `content/home/research.ja.md` | 研究分野とキーワード |
| `content/home/work.ja.md` | 注目論文と、論文・講演一覧へのCTA |
| `content/home/projects.ja.md` | 継続中の研究課題と一覧へのCTA |
| `content/home/news.ja.md` | 最新Newsと一覧へのCTA |
| `content/home/contact.ja.md` | メールアドレス・住所 |

トップページは現在の言語の`home`配下を読み込みます。`home/_index.*.md`の`cascade.build`は、これらをトップへの組み込み専用にするための設定です。独立ページを意図せず出力しないよう、保持してください。

### セクションを追加・並べ替える

例えば`content/home/teaching.ja.md`を作ります。

```markdown
---
title: "Teaching"
weight: 45
widget: "section"
---

担当授業についてMarkdownで記述します。
```

`weight`の小さい順に表示します。`title`はセクション見出し、ファイル名はページ内リンクのIDになります。この例は`#teaching`です。英語版も必要なら`teaching.en.md`を作ります。

| `widget` | 内容 | 独自パラメータ |
| --- | --- | --- |
| `section` | 本文のMarkdown・ショートコードをそのまま表示 | なし。省略時もこれを使用。旧名`text`も利用可能 |
| `news` | 新しいNewsの要約と、その後に本文 | `limit`：表示件数、既定3 |
| `projects` | 継続中の課題すべてと、その後に本文 | 件数制限なし |
| `publications` | 査読済み英語論文の新しいものと、その後に本文 | `limit`：表示件数、既定3。DOIのないものは省略 |

現在のWorkは`widget: section`の中で`featured_articles`を使っています。`featured_articles`は`featured: true`で選ぶため、`widget: publications`の抽出条件とは異なります。

ヒーローの名前は`content/home/_index.*.md`の`title`です。職位・所属は`hero_header`の内側のMarkdownを編集します。トップで数式を使う場合は、入口の`content/_index.*.md`に`math: true`を指定してください。

## 通常ページ・News・Memo・Project

CV・論文一覧・講演一覧は共通の通常ページテンプレートで、Markdownとショートコードから内容を組み立てています。専用のページレイアウトを編集する必要はありません。

| 編集対象 | パスの例 |
| --- | --- |
| CV | `content/cv/index.ja.md` |
| 論文一覧 | `content/publications/_index.ja.md` |
| 講演一覧 | `content/talks/_index.ja.md` |
| News・Memo・Projectの一覧設定 | 各ディレクトリの`_index.ja.md` |

### 新しいページ

```sh
hugo new content notes/example.ja.md
hugo new content --kind news news/example.ja.md
hugo new content --kind memo memo/example.ja.md
hugo new content --kind project project/example.ja.md
```

archetypesと既存のMarkdownのフロントマターは、`---`で囲んだYAML形式に統一しています。雛形は通常`draft: true`です。公開するときは`false`にします。英語版は同じ場所に`.en.md`で作ります。翻訳ページがないとき、言語切り替えは相手言語のトップへ移動します。

Newsは`date`をタイトルとして使い、`title`を指定しても表示には使いません。Memoは`title`・`date`と、任意の`lastmod`を使います。Memoの公開日はラベルなしの日付だけを表示し、更新日は「最終更新」（英語ではLast modified）と表示します。

Memoの一覧は、フロントマターの`summary`に空でない文字列を指定すると、そのMarkdownだけを概要として表示します。「続きを読む」は引き続き表示し、個別ページの本文はそのままです。例：`summary: "このメモの**概要**です。"`。

`summary`が未指定・空欄の場合のMemoとNewsの要約は、Markdown中の`<!--more-->`（`<!-- more -->`も可）までです。区切りがない場合は全文を表示します。

```markdown
ここが一覧にも表示する概要です。

<!--more-->

ここから個別ページで読む本文です。
```

一覧の1ページ当たり件数は、各`_index.*.md`の`page_size`で指定します。既定は3件です。

### 研究課題（外部資金）

編集先は**`data/projects.yaml`**です。トップ・一覧・CVは同じデータを参照し、課題ごとのMarkdownからは情報を抽出しません。

```yaml
- id: '15J07471'
  grant_id: '15J07471'
  grant_type:
    ja: 科研費 特別研究員奨励費
    en: JSPS KAKENHI Grant-in-Aid for JSPS Fellows
  title:
    ja: 離散最大正則性とその有限要素法・有限体積法への応用
    en: Discrete maximal regularity and its applications to finite element and finite volume methods
  role:
    ja: 研究代表者
    en: Principal investigator
  is_PI: true
  period_start: '2015-04'
  period_end: '2018-03'
  external: true
  url:
    ja: https://kaken.nii.ac.jp/grant/KAKENHI-PROJECT-15J07471/
    en: https://kaken.nii.ac.jp/en/grant/KAKENHI-PROJECT-15J07471/
```

| 項目 | 内容 |
| --- | --- |
| `id` | 一意な文字列。CVで個別指定するときのキー |
| `grant_id` | 表示する課題番号（文字列） |
| `title` / `grant_type` / `role` | 題目・研究種別・役割。共通の文字列か`ja`/`en`のマッピング |
| `is_PI` | 代表者なら`true`、分担者なら`false`。必須の真偽値 |
| `principal_investigator` | `is_PI: false`の場合に必須の代表者名。文字列または日英マッピング |
| `period_start` / `period_end` | 引用符付き`'YYYY-MM'`の開始・終了年月 |
| `external` | 省略時`true`。`true`なら外部URL、`false`ならサイト内ページ |
| `url` | 必須の`ja`/`en`マッピング。外部HTTP(S) URL、または`external: false`時のサイト内パス。現在の言語のURLがなければエラー |

文字列の日英マッピングで英語が未指定なら日本語を使用します。URLは別言語へフォールバックしないため、`url.ja`・`url.en`を両方記入します。同じリンク先なら同じ値で構いません。英語題目などの訳は必要に応じて確認してください。既存の先頭3件はダミーデータ、15J07471はユーザー提供の情報です。

個別ページが必要になったら、通常のMarkdownページを作成し、データに`external: false`と`url.ja: /project/example`・`url.en: /project/example`を入れ子のマッピングで指定します。日英で異なるパスも指定できます。`hugo new content --kind project project/example.ja.md`は、その本文用の薄い雛形を作ります。言語・公開先のサブディレクトリは内部リンク解決時に反映されます。外部専用課題にはMarkdownページは不要です。既存の外部専用サンプルMarkdownは参考用に残し、出力・一覧取得を停止しています。

ステータスは期間とビルド年月で自動判定し、開始月前は開始予定、終了月までは継続中、その翌月から完了です。トップは継続中だけ、一覧とCVは完了済みも含み、開始年月の新しい順に表示します。月が変わったら再ビルドしてください。

`content/project/_content.gotmpl`は、Hugoの標準ページ送りに必要な内部レコードをデータから生成します。これらの個別HTMLは出力せず、任意の個別ページは別の通常Markdownで作成します。

### 数式とコード

Markdown内に書いた`<dl>`などの生HTMLは、そのままHTMLとして描画します。`hugo.toml`の`markup.goldmark.renderer.unsafe = true`で有効にしています。

各ページのフロントマターに`math: true`を指定するとMathJaxを読み込みます。省略時は無効です。

```latex
インライン：$a^2+b^2=c^2$

\[
  \int_0^1 x^2\,dx = \frac{1}{3}
\]

\begin{align*}
  a &= b+c \\
  d &= e+f
\end{align*}
```

コードは通常の言語名付きコードフェンスで記述します。`c`、`bash`、`powershell`、`latex`、`julia`などを使えます。追加の`code`パラメータは不要です。

## ショートコード

引数は以下の例のように名前付きで指定します。本文を持つものは閉じタグが必要です。

### `cta`：案内リンク

```markdown
{{< cta text="論文一覧" url="/publications" >}}
{{< cta text="連絡先" url="#contact" >}}
{{< cta text="外部サイト" url="https://example.com/" external=true >}}
```

`text`と`url`は必須です。`external`の既定は`false`で、内部ページは現在の言語・公開先のパスを考慮して解決します。外部リンクには`external=true`が必要で、別タブで開きます。色・シェブロンの寸法はCSS変数で調整します。

### `static_link`：staticファイルへのリンク

```markdown
{{< static_link text="資料PDF" static_path="pdf/handout.pdf" >}}
{{< static_link text="資料を別タブで開く" static_path="pdf/handout.pdf" newtab=true >}}
```

閉じタグは不要です。`text`（リンク文字列）と`static_path`（`static/`以下の相対パス）は必須で、`newtab`は省略時`false`です。例えば`static/pdf/handout.pdf`を配置したら、`static_path="pdf/handout.pdf"`と書きます。先頭の`static/`や`/`は付けません。

URLは公開先のサブディレクトリを反映し、言語プレフィックスは付けません。現在の設定では`/New-site/pdf/handout.pdf`になります。`newtab=true`のときだけ`target="_blank"`と`rel="noopener noreferrer"`を付けます。外部URL・親ディレクトリへの移動・クエリ・フラグメントは指定せず、リンク先のファイルをstatic内に配置してください。

### `hero_header`：名前・職位・所属

```markdown
{{< hero_header >}}
准教授

[大学](https://example.com/) [学部](https://example.com/faculty/) [学科](https://example.com/department/)
{{< /hero_header >}}
```

引数はありません。ページの`title`をh1にして、本文のMarkdownとともに左線付きの`header`に入れます。ヒーロー用の`content/home/_index.*.md`で使います。

### `icon_link`：アイコンのリンク

```markdown
{{< icon_link icon="icons/mail.svg" url="#contact" label="連絡先" >}}
```

`icon`・`url`・読み上げ用の`label`は必須です。`icon`は`themes/mytheme/assets/`からの相対パスで、SVGなどをCSSマスクにします。内部ページ、ページ内リンク、HTTP(S)の外部リンクを指定できます。

### `keywords`：横並びのキーワード

```markdown
{{< keywords >}}
- 有限要素法
- 数値解析
- 構造保存解法
{{< /keywords >}}
```

引数はありません。内側のMarkdownリストを、折り返す枠付きのキーワードとして表示します。

### `contact`：連絡先

```markdown
{{< contact icon="icons/mail.svg" text="name [at] example.ac.jp" kind="email" >}}
{{< contact icon="icons/location.svg" text="〒000-0000\n住所を記載" address=true >}}
{{< contact icon="icons/mail.svg" text="name@example.ac.jp" kind="email" url="mailto:name@example.ac.jp" >}}
```

| 引数 | 内容 |
| --- | --- |
| `icon` / `text` | 必須。アイコンのアセットパスと表示文字列 |
| `address` | `true`なら`address`要素、既定は`false`で`div`要素 |
| `url` | 省略時はリンクなし。ページ内・内部ページ・HTTP(S)・`mailto:`に対応 |
| `kind="email"` | メール文字列を等幅フォントにする。省略時は通常書体 |

`text`内の`\n`は改行になります。`text`はMarkdownではなく文字列です。アイコン自体は装飾で、`url`を指定したときだけ文字がリンクになります。

### `featured_articles`：注目論文

```markdown
{{< featured_articles >}}
{{< featured_articles limit=2 >}}
```

共通の論文データから`featured: true`のものを`date`の新しい順に表示します。`limit`は1以上の整数で、既定は1です。対象には有効なDOIが必要です。言語や査読の有無による自動絞り込みは行いません。

### `publications`：条件付き論文一覧

```markdown
{{< publications kind="preprint" >}}
{{< publications kind="article" language="en" peer_reviewed=true >}}
{{< publications kind="article" language="ja" peer_reviewed=true limit=5 >}}
```

`kind`・`language`・`peer_reviewed`を組み合わせ、**すべての条件に一致**するものを抽出します。省略した条件では絞り込みません。`limit`は任意の1以上の整数で、省略時は全件です。`date`の新しい順に並べ、逆順の標準番号を持つ`ol`を出力します。カテゴリ見出しはMarkdown側で書きます。

### `talks`：年ごとの講演一覧

```markdown
{{< talks year=2025 >}}
{{< talks year=2025 language="en" >}}
```

`year`は必須の4桁の年です。`language`は任意で、省略時は全言語、`"en"`なら英語講演だけです。年のh2見出しと、新しい順の`ol`を出力します。

日本語の講演一覧では言語を指定せず、英語版では`language="en"`を指定しています。新しい年のデータを足したら、一覧Markdownにもその年のショートコードを追加してください。

### `cv_list`・`cv_entry`：経歴・役職の履歴

```markdown
{{< cv_list layout="timeline" >}}
  {{< cv_entry start="2025-04" end="present" >}}
    **[所属機関](https://example.com/)**

    准教授
  {{< /cv_entry >}}
  {{< cv_entry date="2018-03" >}}
    博士（数理科学）
  {{< /cv_entry >}}
{{< /cv_list >}}
```

`cv_list`の引数は`layout`だけです。`timeline`が既定で、時期を先に表示し点・線を付けます。`list`は通常の箇条書きで、本文の下に時期を表示します。項目の順番はMarkdownの記載順で、自動整列しません。

`cv_entry`は`cv_list`の直接の子として使い、`start`と`end`、または`date`だけを指定します。年月は`"YYYY-MM"`、継続中は`end="present"`です。`date`と`start`・`end`は併用できません。本文にはリンク・太字・リスト・数式・コードなどのMarkdownを書けます。

共通の字下げは自動で除去し、本文内の相対的な字下げは維持します。見出しは外側に通常の`##`・`###`で記述します。

### `cv_period`：同じリスト項目に期間だけを添える

```markdown
- 若手研究部会
  {{< cv_list layout="list" >}}
    {{< cv_entry start="2025-04" end="present" >}}
      主査
    {{< /cv_entry >}}
    {{< cv_entry start="2023-04" end="2025-03" >}}
      幹事運営委員
    {{< /cv_entry >}}
  {{< /cv_list >}}
- [Journal A](https://example.com/journal-a) 編集委員
  {{< cv_period start="2021-04" end="present" >}}
- 代表会員
  {{< cv_period start="2022-04" end="present" >}}
- 研究奨励賞
  {{< cv_period date="2024-06" >}}
```

`cv_period`は閉じタグ不要です。`cv_entry`と同じ年月引数を受け付け、リストを追加せず、期間を`p`・`time`要素で出力します。`date`単独指定は正式な使い方です。`present`は日本語版で「現在」、英語版で「Present」になります。CV内の年月は`2026年11月`／`November 2026`のようにローカライズし、time要素のdatetimeはYYYY-MMのまま保持します。

外側は黒丸、入れ子の`cv_list layout="list"`は白丸です。期間表示の余白は上ではなく下に付きます。

### `cv_grants`：外部資金一覧

```markdown
### 研究代表者
{{< cv_grants is_PI=true >}}

### 研究分担者
{{< cv_grants is_PI=false >}}

{{< cv_grants id="15J07471" >}}
```

`data/projects.yaml`を参照し、通常の`ul`/`li`を出力します。`is_PI`は任意の真偽値で、省略時は全役割です。`id`も任意で、指定した1課題を表示します。両方の指定はAND条件で、未知のID・未対応引数・不正な真偽値はビルドエラーです。

各項目は「研究種別 (課題番号: 番号リンク) → 題目 → 期間 → 分担者の場合のみ代表者名」を改行して表示します。課題番号はデータの`url`へリンクし、期間は日英にローカライズします。見出しはMarkdown側で記述します。

## 論文データ

編集先は**`data/publications.yaml`**です。日英の一覧・トップの注目論文は同じデータを参照するので、論文ごとの日英ファイルを作る必要はありません。

```yaml
- id: example-paper
  title: A numerical method for an example equation
  authors:
    - First Author
    - Second Author
  kind: article
  language: en
  peer_reviewed: true
  featured: true
  date: '2025-04-01'
  year: 2025
  journal: Example Journal
  volume: '12'
  number: '3'
  pages: '101–120'
  doi: '10.1234/example.2025.001'
  links:
    - label: arXiv
      url: https://arxiv.org/abs/2501.00001
    - label: Video
      url: https://example.com/video
```

上記は書式説明用の架空の情報です。URL・DOIは実データに置き換えてください。

| 項目 | 内容・省略時の扱い |
| --- | --- |
| `id` | 管理用の一意な識別子。重複しない名前を付ける |
| `title` / `authors` | タイトルと著者名の配列。基本情報として記入する |
| `kind` | 例：`preprint`、`article`。独自の種類も使えるが、一覧側の抽出条件と合わせる |
| `language` | 論文の言語。`en`または`ja`を明示する |
| `peer_reviewed` | 査読あり`true`、なし`false`。絞り込みを使うなら省略せず書く |
| `featured` | 注目論文にするなら`true`。省略したものは選ばれない |
| `date` | 並び替え用。引用符付きの日付・年。例：`'2025-04-01'`、年しか分からない場合は`'2025'` |
| `year` | 書誌情報として表示する発行年。`date`とは別に管理 |
| `journal` | 雑誌名。英語論文のみイタリック |
| `volume` / `number` / `pages` | 巻・号・ページ。ない項目は省略可能 |
| `article_number` | 論文番号。指定時は`pages`より優先 |
| `arxiv` | arXivのID番号（例：`'2308.02334'`）。`kind: preprint`の場合はタイトル直後にリンクなしで表示 |
| `doi` | `10.`から始まる識別子。`https://doi.org/`は付けない |
| `links` | 任意の補足リンク。`label`とHTTP(S)の絶対`url`を組にした配列 |

雑誌・巻号ページ・発行年が未確定でも、ない項目を省いて表示できます。`date`がないデータも表示可能ですが、新しい順を安定させたい場合は既知の年・日付を記入してください。年だけの既存データと日付を混在させる場合も、不明な月日を推測して埋める必要はありません。

DOIは書誌情報の下・リンク群の上に`DOI: 識別子`として表示し、リンク用のバッジも`doi`から自動生成します。arXiv・動画・PDFなどへのリンクは`links`に追加してください。`arxiv`はプレプリントの番号表示に使いますが、自動でリンクにはしません。`source_note`は表示しません。

`content/publications/sample-paper-*`は以前のページ方式のサンプルで、現在の一覧データには使っていません。新しい論文はYAMLに追加します。

## 講演データ

編集先は**`data/talks.yaml`**です。日本語版・英語版で同じデータを使います。

```yaml
- id: talk-2025-example
  year: 2025
  invite: true
  authors:
    - First Author
    - Second Author
  title: An example talk
  workshop: Example Workshop
  url: https://example.com/workshop
  venue: Example University
  city: Nagoya, Japan
  period_start: '2025-09-01'
  period_end: '2025-09-03'
  date: '2025-09-02'
  language: en
  links:
    - label: Slides
      url: https://example.com/slides.pdf
```

| 項目 | 内容・省略時の扱い |
| --- | --- |
| `id` | 管理用の一意な識別子 |
| `year` | 必須。講演一覧で分類する発表年（4桁） |
| `title` / `authors` / `workshop` | 必須。題目・著者配列・研究集会名 |
| `period_start` | 必須。開催初日。引用符付き`'YYYY-MM-DD'` |
| `period_end` | 最終日。1日開催なら省略 |
| `date` | 実際の発表日。任意、引用符付き`'YYYY-MM-DD'` |
| `invite` | 招待講演なら`true`。省略時`false`。フィールド名は`invited`ではない |
| `language` | 発表言語。省略時`ja`、英語は`en` |
| `venue` / `city` | 会場・都市。分からなければ省略可能 |
| `url` | 研究集会へのリンク。`workshop_url`ではない |
| `venue_url` | 任意の会場リンク |
| `links` | 任意の補足リンク。`label`・`url`の配列 |
| `format` | `poster`ならポスター発表の表示を追加 |
| `canceled` | 任意の**中止理由の文字列**。真偽値ではない |

並び順は、`date`があれば発表日、なければ`period_start`の降順です。`year`は一覧の分類に使います。新しい年を追加するときは、日英の`content/talks/_index.*.md`にも対応する`talks`を追記してください。

招待講演にはピンクのInvitedバッジを付けます。中止の例は`canceled: '主催者の都合により中止'`です。講演情報全体に取り消し線を付け、理由を別行で表示します。

講演の`title`はMarkdown・数式に対応します。数式は表示先の一覧ページで`math: true`にします。論文タイトルは現在文字列として扱うため、講演と同じMarkdown処理ではありません。

## 見た目の調整

色・文字サイズ・余白は主にCSSカスタムプロパティで指定します。`hugo.toml`のパラメータではありません。

| 調整したい内容 | 編集先・変数の例 |
| --- | --- |
| 基本色・文字サイズ・共通幅 | `assets/css/main.css`の`--link-color`、`--font-size-base`、`--content-max-width` |
| リストの字下げ | `main.css`の`--list-indent`。通常のMarkdownリストとCVのlistで共通 |
| トップのセクション間隔 | `home.css`の`--home-section-gap` |
| CVの時期・タイムライン | `cv.css`の`--cv-period-gap`、`--cv-timeline-padding-start` |
| ヘッダー・メニュー | `header.css` |
| 論文・講演・各一覧 | 対応する`publications.css`・`talks.css`など |

上記のアセットパスは`themes/mytheme/`からの相対パスです。CSSは編集用ファイルの分割を保ち、配信時に`reset.css`と、それ以外を結合した`site.css`の2本にします。`assets/css/components/`は現在未使用です。

本文はOpen SansとLINE Seed JP、h1・h2とメニューはMontserrat、等幅部分はInconsolataを使います。Google Fontsの読み込みは`layouts/_partials/head.html`、フッターの氏名は`layouts/_partials/footer.html`で編集します。これらの値は現時点では設定ファイルから変更する仕組みを設けていません。

## 公開と更新時の確認

普段の開発は`develop`で行います。現在のGitHub Actionsは、**`main`へのpush**または手動実行でGitHub Pagesに公開します。`develop`にpushするだけでは、自動で本番サイトは更新されません。

更新時は次を確認してください。

1. `hugo server -D`で編集内容を確認し、公開対象の`draft`を見直す。
2. `hugo --minify`で本番用ビルドが通ることを確認する。
3. 日英のメニュー・言語切り替えと、`/New-site/`配下のリンクを確認する。
4. PC・スマホ幅の表示を確認する。
5. 新しい講演年の見出し追加、注目論文の`featured`・DOI、課題の期間を確認する。

サンプル・ダミーデータが残っています。実際のサイトとして公開する際は、内容・連絡先・氏名・外部リンクを確認して置き換えてください。PDFや画像の参照先を変更する場合は、ファイル本体も配置します。
