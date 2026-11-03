This theme and README were created by Codex under the user's direction and review.

# A Hugo Personal Website for Researchers

[日本語版 README](README.md)

This is a researcher's personal website with Japanese and English versions. It uses custom templates, CSS, and minimal JavaScript in `themes/mytheme/`, rather than an existing theme. Publication and talk information is stored in shared YAML data used by both languages.

## Contents

- [Running and building](#running-and-building)
- [Main files](#main-files)
- [Settings in hugo.toml](#settings-in-hugotoml)
- [Editing the home page](#editing-the-home-page)
- [Regular pages, News, Memo, and Project](#regular-pages-news-memo-and-project)
- [Shortcodes](#shortcodes)
- [Publication data](#publication-data)
- [Talk data](#talk-data)
- [Adjusting the appearance](#adjusting-the-appearance)
- [Deployment and update checks](#deployment-and-update-checks)

## Running and building

The tested Hugo version is **0.168.0**, which is also used in GitHub Actions. The site's current CSS and JavaScript processing does not require installing Node.js, Tailwind CSS, or Dart Sass.

Run these commands from the repository root:

```sh
hugo server        # Development server
hugo server -D     # Also include content with draft: true
hugo --minify      # Production build; output goes to public/
```

By default, `hugo server` uses the development environment and `hugo` uses the production environment. `-D` includes drafts and does not change the environment. You can also set the environment explicitly, for example with `--environment production`.

In development, CSS and the main JavaScript file are not minified, and source maps are generated. Production builds apply minification and fingerprinting. The MathJax configuration script is minified and fingerprinted in all environments. JavaScript is loaded with `defer`.

## Main files

| Path | Purpose |
| --- | --- |
| `hugo.toml` | Settings for URLs, languages, code highlighting, mathematics, and more |
| `config/_default/languages.yaml` | Japanese and English header navigation menus |
| `content/` | Japanese and English Markdown pages |
| `content/home/` | The hero and individual home page sections |
| `data/publications.yaml` | Publication data shared by both languages |
| `data/talks.yaml` | Talk data shared by both languages |
| `data/projects.yaml` | Grant data shared by the home page, project list, and CV |
| `archetypes/` | Content templates used by `hugo new` |
| `themes/mytheme/layouts/` | Page templates, partials, and shortcodes |
| `themes/mytheme/assets/css/` | Reset, shared, and component styles |
| `themes/mytheme/assets/js/` | Menu controls and MathJax configuration |
| `themes/mytheme/assets/icon/` | SVGs for the menu, close button, and chevrons |
| `themes/mytheme/assets/icons/` | SVGs for contact details, language switching, and similar uses |
| `static/` | Images, PDFs, and other files added as needed; copied unchanged during publishing |
| `docs/design.md` | Detailed implementation specifications, in Japanese |
| `AGENTS.md` | Guidelines for developing with Codex, in Japanese |
| `.github/workflows/hugo.yaml` | Build and deployment workflow for GitHub Pages |

`public/` contains generated files. Edit the source Markdown, data, or templates instead of modifying these files directly.

## Settings in hugo.toml

### Standard Hugo settings and theme-specific settings

**The theme currently does not read any custom global `[params]` settings.** Settings such as the home page `widget` and the item count `limit` belong in each Markdown file's front matter, rather than in `hugo.toml`.

| Setting | Purpose and notes |
| --- | --- |
| `baseURL` | The public URL, currently `https://t-kemmochi.github.io/New-site/`. Include the correct subdirectory |
| `theme = 'mytheme'` | Selects the custom theme |
| `defaultContentLanguage` / `defaultContentLanguageInSubdir` | The default language and whether to include `/ja/` in its URLs |
| `timeZone` | Time zone used to interpret dates; currently `Asia/Tokyo` |
| `languages.ja.title` / `languages.en.title` | The site name shown in the header as a link to the home page |
| `services.googleAnalytics.id` | The GA4 measurement ID; no tracking code is generated when empty |
| `markup.highlight` | Hugo's built-in code highlighting; currently `noClasses = true` and `style = 'monokai'` |
| `markup.goldmark.extensions.passthrough` | Protects mathematical delimiters from Markdown processing |

These are standard Hugo settings. The existing `languages.*.label` and `languages.*.params.description` values are not currently used for display by the templates. The language switcher's labels, “日本語” and “English,” are defined in the template.

GA4 example:

```toml
[services.googleAnalytics]
  id = 'G-XXXXXXXXXX'
```

Tracking code is generated only for production builds, not when running `hugo server`. Writing a measurement ID in this README does not enable tracking; edit `hugo.toml` to configure it.

### Header menu settings

Only the menus are separated into **`config/_default/languages.yaml`**. This is a standard Hugo configuration file, automatically merged with `hugo.toml`. Language properties, site titles, and other settings remain in `hugo.toml`.

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

This example shows just one item per language. Add entries under `menus.main` for `ja` and `en`. Keep each `identifier` unique within its menu. `name` is the display label, `pageRef` is a page path in the current language, and `weight` sets the order, lowest first. Use `pageRef: /` for the home page. Desktop and hamburger menus share these definitions, and current-page and ancestor highlighting continue to work as before.

## Editing the home page

### How files map to the page

Edit `.ja.md` files for Japanese and `.en.md` files for English.

| File (Japanese version) | Purpose |
| --- | --- |
| `content/_index.ja.md` | The home page entry point; also specifies `math` for the entire page |
| `content/home/_index.ja.md` | The hero: name, position, affiliation, icon links, and related content |
| `content/home/research.ja.md` | Research areas and keywords |
| `content/home/work.ja.md` | Featured articles and CTAs to publication and talk lists |
| `content/home/projects.ja.md` | Current research projects and a CTA to the full list |
| `content/home/news.ja.md` | Latest news and a CTA to the full list |
| `content/home/contact.ja.md` | Email address and postal address |

The home page reads content under `home` in the current language. The `cascade.build` settings in `home/_index.*.md` make this content available for embedding without generating separate pages. Keep these settings to avoid unintentionally publishing standalone pages.

### Adding and reordering sections

For example, create `content/home/teaching.ja.md`:

```markdown
---
title: "Teaching"
weight: 45
widget: "section"
---

Describe your teaching in Markdown.
```

Sections appear in ascending order of `weight`. `title` becomes the section heading, and the filename determines the anchor ID: `#teaching` in this example. Create `teaching.en.md` if you also need an English version.

| `widget` | Content | Custom parameters |
| --- | --- | --- |
| `section` | Renders the Markdown body and shortcodes directly | None. This is also the default. The old name `text` is supported |
| `news` | Summaries of recent news, followed by the body | `limit`: number of items; defaults to 3 |
| `projects` | All current projects, followed by the body | No item limit |
| `publications` | Recent peer-reviewed English articles, followed by the body | `limit`: number of items; defaults to 3. Items without a DOI are skipped |

The current Work section uses `featured_articles` inside `widget: section`. This shortcode selects items with `featured: true`, so its selection criteria differ from those of `widget: publications`.

The name in the hero comes from `title` in `content/home/_index.*.md`. Edit the Markdown inside `hero_header` to change the position and affiliation. To use mathematics on the home page, set `math: true` in the entry point, `content/_index.*.md`.

## Regular pages, News, Memo, and Project

The CV, publication list, and talk list use the shared regular page template, with their content assembled from Markdown and shortcodes. There is no need to edit a dedicated page layout for these pages.

| Content to edit | Example path |
| --- | --- |
| CV | `content/cv/index.ja.md` |
| Publication list | `content/publications/_index.ja.md` |
| Talk list | `content/talks/_index.ja.md` |
| News, Memo, and Project list settings | `_index.ja.md` in the corresponding directory |

### Creating pages

```sh
hugo new content notes/example.ja.md
hugo new content --kind news news/example.ja.md
hugo new content --kind memo memo/example.ja.md
hugo new content --kind project project/example.ja.md
```

Archetypes and existing Markdown files use YAML front matter enclosed by `---` delimiters. Archetypes normally set `draft: true`. Change it to `false` when the content is ready to publish. Create the English version in the same location with the `.en.md` suffix. When a translation is unavailable, the language switcher links to the other language's home page.

News uses `date` as the title and ignores `title` even if it is specified. Memo uses `title`, `date`, and an optional `lastmod`.

News and Memo summaries include the Markdown up to `<!--more-->`. If no separator is present, the full body is displayed.

```markdown
This summary also appears on the list page.

<!--more-->

The rest of the body appears on the individual page.
```

Set `page_size` in each list's `_index.*.md` to change the number of items per page. The default is 3.

### Research projects and grants

Edit **`data/projects.yaml`**. The home page, project list, and CV share this data; individual Markdown pages are no longer the source of project metadata.

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

| Field | Description |
| --- | --- |
| `id` | A unique string used for individual selection in the CV |
| `grant_id` | The displayed grant number, as a string |
| `title` / `grant_type` / `role` | Title, grant type, and role; a shared string or a `ja`/`en` mapping |
| `is_PI` | Required boolean: `true` for the PI, `false` for a co-investigator |
| `principal_investigator` | Required when `is_PI: false`; a string or language mapping |
| `period_start` / `period_end` | Start and end months as quoted `'YYYY-MM'` strings |
| `external` | Defaults to `true`; external URL when `true`, internal page when `false` |
| `url` | A required `ja`/`en` mapping. An absolute HTTP(S) URL, or an internal page path when `external: false`. A missing URL for the current language is an error |

Text mappings fall back to Japanese when English is missing. URLs do not fall back to another language: provide both `url.ja` and `url.en`. They may have the same value when the destination is shared. Review translated titles and other labels as needed. The first three existing entries are dummy data; grant 15J07471 was provided by the user.

To add an individual page, create a regular Markdown page and set `external: false` and, for example, `url.ja: /project/example` and `url.en: /project/example` as a nested mapping in the data. The paths may differ between languages. `hugo new content --kind project project/example.ja.md` creates a minimal template for that body. Internal links account for the current language and deployment subdirectory. External-only projects need no Markdown page. Existing external-only sample Markdown files are retained for reference with rendering and listing disabled.

Status is calculated from the period and build month: upcoming before the start month, current through the end month, and completed thereafter. The home page shows only current projects; the full list and CV include completed grants, sorted by start month from newest to oldest. Rebuild when the month changes.

`content/project/_content.gotmpl` generates internal records for Hugo's standard pagination. These records do not produce individual HTML pages. Optional individual pages are separate regular Markdown pages.

### Mathematics and code

Set `math: true` in a page's front matter to load MathJax. Mathematics support is disabled when this parameter is omitted.

```latex
Inline: $a^2+b^2=c^2$

\[
  \int_0^1 x^2\,dx = \frac{1}{3}
\]

\begin{align*}
  a &= b+c \\
  d &= e+f
\end{align*}
```

Write code in standard fenced code blocks with a language identifier, such as `c`, `bash`, `powershell`, `latex`, or `julia`. No additional `code` parameter is needed.

## Shortcodes

Use named arguments as shown below. Shortcodes with a body require a closing tag.

### `cta`: navigation links

```markdown
{{< cta text="Publications" url="/publications" >}}
{{< cta text="Contact" url="#contact" >}}
{{< cta text="External website" url="https://example.com/" external=true >}}
```

`text` and `url` are required. `external` defaults to `false`; internal page links are resolved for the current language and deployment path. External links require `external=true` and open in a new tab. Colors and chevron dimensions are controlled by CSS variables.

### `hero_header`: name, position, and affiliation

```markdown
{{< hero_header >}}
Associate Professor

[University](https://example.com/) [Faculty](https://example.com/faculty/) [Department](https://example.com/department/)
{{< /hero_header >}}
```

This shortcode takes no arguments. It uses the page's `title` as an h1 and places it with the Markdown body inside a `header` with a line on the left. Use it in the hero content, `content/home/_index.*.md`.

### `icon_link`: icon links

```markdown
{{< icon_link icon="icons/mail.svg" url="#contact" label="Contact" >}}
```

`icon`, `url`, and the accessible link name `label` are required. `icon` is a path relative to `themes/mytheme/assets/`; SVGs and similar assets are used as CSS masks. The URL can point to an internal page, a page anchor, or an external HTTP(S) address.

### `keywords`: keywords in a row

```markdown
{{< keywords >}}
- Finite element methods
- Numerical analysis
- Structure-preserving methods
{{< /keywords >}}
```

This shortcode takes no arguments. It displays the enclosed Markdown list as outlined keywords in a wrapping layout.

### `contact`: contact information

```markdown
{{< contact icon="icons/mail.svg" text="name [at] example.ac.jp" kind="email" >}}
{{< contact icon="icons/location.svg" text="Postal code\nPostal address" address=true >}}
{{< contact icon="icons/mail.svg" text="name@example.ac.jp" kind="email" url="mailto:name@example.ac.jp" >}}
```

| Argument | Description |
| --- | --- |
| `icon` / `text` | Required. The icon asset path and text to display |
| `address` | Uses an `address` element when `true`; defaults to `false`, which uses a `div` |
| `url` | No link when omitted. Supports anchors, internal pages, HTTP(S), and `mailto:` |
| `kind="email"` | Displays the email text in a monospace font; otherwise uses the normal font |

`\n` in `text` produces a line break. `text` is a plain string, not Markdown. The icon is decorative; only the text becomes a link when `url` is provided.

### `featured_articles`: featured publications

```markdown
{{< featured_articles >}}
{{< featured_articles limit=2 >}}
```

Displays items with `featured: true` from the shared publication data, sorted by `date` from newest to oldest. `limit` must be a positive integer and defaults to 1. Each selected item must have a valid DOI. There is no automatic filtering by language or peer-review status.

### `publications`: filtered publication lists

```markdown
{{< publications kind="preprint" >}}
{{< publications kind="article" language="en" peer_reviewed=true >}}
{{< publications kind="article" language="ja" peer_reviewed=true limit=5 >}}
```

Combine `kind`, `language`, and `peer_reviewed` to select items that **match all specified conditions**. An omitted condition does not restrict the selection. `limit` is an optional positive integer; omitting it displays all matches. Items are sorted by `date` from newest to oldest and rendered as an `ol` with native descending numbering. Write category headings in Markdown outside the shortcode.

### `talks`: talks by year

```markdown
{{< talks year=2025 >}}
{{< talks year=2025 language="en" >}}
```

`year` is required and must be a four-digit year. `language` is optional: omit it to include all languages, or use `"en"` to include only English talks. The shortcode generates an h2 year heading and an `ol` ordered from newest to oldest.

The Japanese talk list omits the language filter, while the English list uses `language="en"`. When adding data for a new year, also add that year's shortcode to the list Markdown.

### `cv_list` and `cv_entry`: career and role histories

```markdown
{{< cv_list layout="timeline" >}}
  {{< cv_entry start="2025-04" end="present" >}}
    **[Institution](https://example.com/)**

    Associate Professor
  {{< /cv_entry >}}
  {{< cv_entry date="2018-03" >}}
    Ph.D. in Mathematical Sciences
  {{< /cv_entry >}}
{{< /cv_list >}}
```

The only argument to `cv_list` is `layout`. The default, `timeline`, displays the date first and adds dots and connecting lines. `list` uses a regular bulleted list, with the date below the body. Entries remain in their Markdown order; they are not sorted automatically.

Use `cv_entry` as a direct child of `cv_list`. Specify either `start` and `end`, or `date` alone. Months use `"YYYY-MM"`; use `end="present"` for an ongoing role. Do not combine `date` with `start` or `end`. The body accepts Markdown, including links, bold text, lists, mathematics, and code.

Common indentation is removed automatically, while relative indentation within the body is preserved. Write headings outside the shortcode with ordinary `##` or `###` Markdown.

### `cv_period`: dates within the same list item

```markdown
- Young Researchers Group
  {{< cv_list layout="list" >}}
    {{< cv_entry start="2025-04" end="present" >}}
      Chair
    {{< /cv_entry >}}
    {{< cv_entry start="2023-04" end="2025-03" >}}
      Organizing Committee Member
    {{< /cv_entry >}}
  {{< /cv_list >}}
- [Journal A](https://example.com/journal-a) Editorial Board Member
  {{< cv_period start="2021-04" end="present" >}}
- Representative Member
  {{< cv_period start="2022-04" end="present" >}}
- Research Encouragement Award
  {{< cv_period date="2024-06" >}}
```

`cv_period` does not require a closing tag. It accepts the same date arguments as `cv_entry` and outputs dates using `p` and `time` elements without creating another list. Using `date` alone is fully supported. `present` is displayed as “現在” in Japanese and “Present” in English. CV months are localized, for example as `2026年11月` or `November 2026`, while `time` elements retain YYYY-MM in their datetime attributes.

The outer list uses filled bullets, and nested `cv_list layout="list"` items use hollow bullets. Spacing is added below the date, rather than above it.

### `cv_grants`: grant lists

```markdown
### Principal Investigator
{{< cv_grants is_PI=true >}}

### Co-Investigator
{{< cv_grants is_PI=false >}}

{{< cv_grants id="15J07471" >}}
```

Reads `data/projects.yaml` and outputs ordinary `ul`/`li` elements. `is_PI` is an optional boolean; omitting it includes all roles. The optional `id` selects one grant. Both arguments are combined with AND. Unknown IDs, unsupported arguments, and invalid boolean values cause build errors.

Each item contains the grant type and linked grant number, title, period, and—only for co-investigators—the PI's name, separated by line breaks. Grant numbers link to the record's `url`, and periods are localized for the page language. Write headings in Markdown outside the shortcode.

## Publication data

Edit **`data/publications.yaml`**. Both language versions of the publication list and the home page's featured articles use this shared data, so there is no need to create separate Japanese and English files for each paper.

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

This is fictional information illustrating the format. Replace the URLs and DOI with actual values.

| Field | Description and behavior when omitted |
| --- | --- |
| `id` | A unique identifier for managing the record; avoid duplicates |
| `title` / `authors` | The title and an array of author names; include these as basic information |
| `kind` | For example, `preprint` or `article`. Custom values are possible, but must match the list's filtering conditions |
| `language` | The paper's language; explicitly specify `en` or `ja` |
| `peer_reviewed` | `true` for peer-reviewed work, `false` otherwise. Specify it explicitly when filtering by this field |
| `featured` | Set to `true` to feature the paper. Omitted values are not selected |
| `date` | Used for sorting. A quoted date or year, such as `'2025-04-01'` or `'2025'` when only the year is known |
| `year` | The publication year displayed in the citation; managed separately from `date` |
| `journal` | The journal name; italicized only for English papers |
| `volume` / `number` / `pages` | Volume, issue, and pages; omit unavailable fields |
| `article_number` | An article number; takes precedence over `pages` when specified |
| `arxiv` | The arXiv ID, such as `'2308.02334'`. For `kind: preprint`, it is shown immediately after the title as plain text |
| `doi` | The identifier starting with `10.`; do not include `https://doi.org/` |
| `links` | Optional additional links: an array of `label` and absolute HTTP(S) `url` pairs |

Records can be rendered before the journal, volume, issue, pages, or year are finalized; simply omit unavailable fields. Records without `date` can also be displayed, but enter a known year or date when a consistent chronological order is needed. When mixing existing year-only records with full dates, there is no need to invent unknown months or days.

The DOI is displayed as `DOI: identifier` below the bibliographic information and above the links, and a DOI link badge is also generated automatically from `doi`. Add arXiv, video, PDF, and other links to `links`. The `arxiv` field displays the identifier for preprints but does not automatically create a link. `source_note` is not displayed.

`content/publications/sample-paper-*` contains samples from the earlier page-based approach and is not used as data for the current list. Add new papers to the YAML file.

## Talk data

Edit **`data/talks.yaml`**. Japanese and English pages share this data.

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

| Field | Description and behavior when omitted |
| --- | --- |
| `id` | A unique identifier for managing the record |
| `year` | Required. The four-digit presentation year used to group the talk |
| `title` / `authors` / `workshop` | Required. The title, author array, and meeting name |
| `period_start` | Required. The first day of the meeting, as a quoted `'YYYY-MM-DD'` string |
| `period_end` | The last day; omit for a one-day meeting |
| `date` | Optional presentation date, as a quoted `'YYYY-MM-DD'` string |
| `invite` | `true` for an invited talk; defaults to `false`. The field is named `invite`, not `invited` |
| `language` | Presentation language; defaults to `ja`. Use `en` for English |
| `venue` / `city` | Venue and city; omit if unknown |
| `url` | Link to the meeting; the field is not named `workshop_url` |
| `venue_url` | An optional venue link |
| `links` | Optional additional links: an array of `label` and `url` pairs |
| `format` | Set to `poster` to add a poster presentation label |
| `canceled` | An optional **string containing the cancellation reason**, not a boolean |

Talks are sorted from newest to oldest using `date` when available, otherwise `period_start`. `year` determines which yearly list includes the talk. When adding a new year, add the corresponding `talks` shortcode to both language versions of `content/talks/_index.*.md`.

Invited talks have a pink Invited badge. For a cancellation, for example, use `canceled: 'Canceled by the organizers'`. The talk information is struck through, and the reason appears on a separate line.

A talk's `title` supports Markdown and mathematics. Set `math: true` on the list page to render mathematics. Publication titles are currently treated as plain strings and do not receive the same Markdown processing as talk titles.

## Adjusting the appearance

Colors, font sizes, and spacing are primarily configured through CSS custom properties, not parameters in `hugo.toml`.

| What to adjust | File and example variables |
| --- | --- |
| Base colors, font sizes, and content width | `assets/css/main.css`: `--link-color`, `--font-size-base`, `--content-max-width` |
| List indentation | `main.css`: `--list-indent`, shared by ordinary Markdown lists and CV lists |
| Home page section spacing | `home.css`: `--home-section-gap` |
| CV dates and timelines | `cv.css`: `--cv-period-gap`, `--cv-timeline-padding-start` |
| Header and menu | `header.css` |
| Publications, talks, and other lists | The corresponding files, such as `publications.css` and `talks.css` |

These asset paths are relative to `themes/mytheme/`. CSS source files remain separate for editing. For delivery, they are built into two files: `reset.css` and `site.css`, which combines the remaining styles. `assets/css/components/` is currently unused.

Body text uses Open Sans and LINE Seed JP; h1, h2, and menus use Montserrat; monospace text uses Inconsolata. Edit `layouts/_partials/head.html` to change the Google Fonts loading and `layouts/_partials/footer.html` to change the name in the footer. These values currently cannot be changed through the configuration file.

## Deployment and update checks

Regular development takes place on `develop`. The current GitHub Actions workflow deploys to GitHub Pages on **pushes to `main`** or when run manually. Pushing to `develop` alone does not automatically update the production site.

When updating the site:

1. Preview changes with `hugo server -D` and check the `draft` status of content to publish.
2. Confirm that the production build succeeds with `hugo --minify`.
3. Check menus, language switching, and links under `/New-site/` in both languages.
4. Check desktop and mobile layouts.
5. Check headings for new talk years, `featured` flags and DOIs for featured papers, and project dates.

Sample and dummy data remain in the repository. Before publishing it as an actual personal site, review and replace the content, contact information, names, and external links. If you change PDF or image references, also provide the corresponding files.
