# josh-r-foster.github.io

Personal website for Joshua Foster. Built with [Jekyll](https://jekyllrb.com)
on the [Junior](https://github.com/thundergolfer/junior) theme and hosted via
GitHub Pages. Reveal.js slide decks for courses and talks live alongside the
Jekyll site as static HTML.

## Local development

Install dependencies once:

```bash
bundle install
```

Run the site locally:

```bash
bundle exec jekyll serve --livereload
```

Then open <http://localhost:4000>. Slide decks are served from the same host,
e.g. <http://localhost:4000/courses/bus-259/lectures/0-syllabus.html>.

To preview drafts in `_drafts/`:

```bash
bundle exec jekyll serve --drafts
```

## Authoring

- **Posts** — `_posts/YYYY-MM-DD-title.md` (or `rake post['title']`)
- **Drafts** — `_drafts/title.md` (or `rake draft['title']`)
- **Portfolio entries** — `_portfolio/*.md`
- **Slide decks** — copy an existing deck under `courses/<course>/lectures/`
  and edit. Decks load reveal.js and its plugins from `/dist` and `/plugin`,
  which are committed as static assets.

## Layout

```
_config.yml         Jekyll site config
_drafts/            Unpublished posts
_portfolio/         Portfolio collection
_posts/             Published blog posts
_includes/          Shared HTML partials
_layouts/           Jekyll layouts
_sass/              Site SCSS partials
css/                Site CSS (junior.scss compiled by Jekyll)
fonts/              Site fonts
images/             Site and slide-deck images
courses/            Course landing pages and slide decks
  bus-259/lectures/
  bus-4654/lectures/
  mba-9483/lectures/
  research/         Research talk decks
  tools/            Classroom contribution-tracker apps
dist/               Reveal.js prebuilt runtime (used by slide decks)
plugin/             Reveal.js prebuilt plugins (used by slide decks)
```

## Updating reveal.js

The contents of `dist/` and `plugin/` are reveal.js v4.0.2 prebuilt outputs
committed as static assets. To upgrade, download a newer
[reveal.js release](https://github.com/hakimel/reveal.js/releases), copy its
`dist/` and `plugin/` directories into this repo, and verify a representative
slide deck still renders.

## License

Site content © Joshua Foster. Theme open-sourced under the
[MIT license](LICENSE).
