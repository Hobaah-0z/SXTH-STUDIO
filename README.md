# SXTH — Design Studio Website

A premium, editorial React site for **SXTH**, a design studio.
Built with **Vite + React + Tailwind CSS**.

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

Deploys cleanly to **Vercel** (zero config — it's a standard Vite app).

## Adding the real assets

The hero and portfolio currently render obvious "Placeholder —" blocks
wherever a real file is missing. Drop your real files into these exact
paths and the placeholders disappear automatically:

```
public/videos/sxth-creation.mp4
public/images/sxth-creation-poster.jpg
public/images/projects/high-five.jpg
public/images/projects/memforks.jpg
public/images/projects/project-three.jpg
public/images/projects/project-four.jpg
```

If you add an Open Graph share image, put it at:

```
public/images/og-image.jpg
```

## Project structure

```
src/
  components/   # Navbar, Hero, WorkSection, ServicesSection, etc.
  data/         # projects.js, services.js, makers.js — edit content here
  hooks/        # useReducedMotion, useScrolled, useReveal
  index.css     # design tokens, keyframes, reveal/placeholder utilities
  App.jsx       # page composition / section order
```

### Editing content without touching layout

- **Projects** — edit `src/data/projects.js`. Each project has a `layout`
  value (`full`, `offset-left`, `offset-right`) that controls how it's
  composed in the portfolio so the section doesn't read as a repeated grid.
- **Services** — edit `src/data/services.js`. The four top-level categories
  (Strategy / Brand / Digital / Campaign) are intentionally fixed in the
  brief; add or edit disciplines under each freely.
- **Makers** — edit `src/data/makers.js`.

## Design notes

- Typeface: **Instrument Sans**, loaded from Google Fonts in `index.html`.
- Palette is intentionally restrained (near-black / off-white / white) —
  the portfolio imagery is the studio's only planned source of color.
- Motion respects `prefers-reduced-motion`: the hero swaps to a static
  poster image and scroll reveals are disabled.
- `06 / CREATION` and `06` are used sparingly as a conceptual device — the
  brand itself is always written as **SXTH**, never "Sixth" or "6TH".

## Pushing to GitHub

```bash
git init
git add .
git commit -m "Initial SXTH site"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

`node_modules` and `dist` are already in `.gitignore`.
