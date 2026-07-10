# Portfolio Site Design

Date: 2026-07-10

## Purpose

Simple personal site for Muhammad Fatkurozi ("ibnumardini") holding: profile/CV, portfolio projects, and a blog. Deployed to `ibnu.mardini.dev`.

## Stack

- Astro (existing project, currently bare scaffold)
- Tailwind CSS (new dependency, `@astrojs/tailwind` or Tailwind v4 Vite plugin)
- `lucide-astro` for icons
- Google Fonts "Space Grotesk" via `<link>` in layout head
- Astro Content Collections for blog posts (markdown)

## Site Structure

- `/` — single scrolling page:
  1. Hero: name, title ("Software Engineer | Back-end Developer"), short summary, social links (email, LinkedIn, GitHub) with lucide icons, theme toggle
  2. Skills: grouped list (Backend, Frontend, DBMS, DevOps, Cloud, Tools) from PDF
  3. Experience: timeline of jobs (company, role, dates, bullets) from PDF
  4. Portfolio: 3 project cards (SIMALU, Wilayah ID API, My UMBY Profile API) — title, description, tech tags, GitHub link icon
  5. Blog teaser: latest 3 posts (title, date, excerpt) + "view all" link to `/blog`
  6. Footer: copyright, social icons repeat
- `/blog` — full list of posts, sorted by date desc
- `/blog/[slug]` — single post page, rendered markdown, back-to-blog link

## Theme

- Light mode default, dark mode toggle (button with lucide sun/moon icon in hero, swaps `<html class="dark">`, persisted via `localStorage`, no-flash inline script in `<head>`)
- Tailwind `darkMode: 'class'`
- Logo: `public/images/light_logo.png` shown in light mode, `public/images/dark_logo.png` shown in dark mode (swap via CSS `dark:` classes, both `<img>` present, one hidden)

## Data

- `src/data/profile.ts` — typed hardcoded object: name, title, contact, socials, skills groups, experience entries, projects. Sourced from the PDF resume.
- `src/content/blog/*.md` — content collection with frontmatter schema `{ title, date, description }`. One placeholder starter post included.
- `astro.config.mjs` — set `site: 'https://ibnu.mardini.dev'`

## Out of scope

- No CMS/admin UI — posts authored as markdown files directly in repo
- No contact form (mailto link only)
- No analytics/comments
- No i18n despite bilingual resume — English site copy only (matches resume's primary language use)

## Components (isolation)

- `Layout.astro` — shared head (fonts, meta, theme no-flash script), header w/ logo + nav + theme toggle, footer
- `ThemeToggle.astro` — icon button + inline script, no external deps beyond lucide icon
- `SocialLinks.astro` — reusable icon link row, takes size/variant prop
- `ProjectCard.astro` — props: title, description, tags, repoUrl
- `ExperienceItem.astro` — props: company, role, dates, bullets, url
- `BlogCard.astro` — props: title, date, description, slug
- Blog collection schema in `src/content/config.ts`

Each component takes plain props, no shared mutable state, easy to test visually in isolation.
