# Project Gallery Modal — Design

## Problem

`ProjectCard.astro` only links out to repo/live URLs. No way to preview a project visually without leaving the site. Want a "gallery" button on each card that opens a modal showing screenshots for that project.

## Data model

Add optional field to `Project` in `src/data/profile.ts`:

```ts
export interface Project {
	title: string;
	description: string;
	tags: string[];
	repoUrl: string;
	liveUrl?: string;
	pinned?: boolean;
	images?: string[]; // filenames under src/assets/project-preview/<slug>/, e.g. ['meetkeep/1.png', 'meetkeep/2.png']
}
```

Screenshots already exist on disk: `src/assets/project-preview/meetkeep/1.png`, `2.png`. Only projects with an `images` array get the gallery button.

## Asset loading

Use `import.meta.glob('/src/assets/project-preview/**/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' })` inside the gallery component to eagerly import every screenshot under `project-preview/`. Keyed by path, so a given project's `images` entries (`'meetkeep/1.png'`) map directly to `/src/assets/project-preview/meetkeep/1.png` in the glob result. Rendered through Astro's `<Image>` for optimization, matching the existing `DaisyModal` pattern.

## Components

### `ProjectCard.astro` (edit)

Add a third icon button (`tabler:photo`, using the same styling/size as the existing GitHub/live icons) rendered only when `images?.length`. Instead of a link, it's a `<button>` with `data-gallery-trigger` and `data-gallery-slug={slugify(title)}` attributes (slug = images array's folder prefix, derived by taking the part before `/` in the first image path).

### `GalleryModal.astro` (new)

Single shared modal instance, mounted once in `Layout.astro` next to `<DaisyModal />` — not one per card, to avoid duplicating markup across every project.

- Vanilla JS + Tailwind classes, following `DaisyModal.astro`'s exact structural pattern: `hidden`/`flex` toggle, backdrop blur, close button, `Escape` key, `astro:after-swap` re-init for View Transitions.
- All screenshots for all projects are pre-rendered into hidden `<Image>` elements grouped by `data-slug`, generated at build time from the glob result. On trigger click, JS reads `data-gallery-slug`, shows the matching group, hides others, resets to first image.
- Prev/Next buttons (`tabler:chevron-left` / `tabler:chevron-right`) cycle the visible index within the current project's image group. Wrap around at ends.
- Left/Right arrow keys also cycle when modal open (added alongside existing Escape-to-close handler).
- Click on backdrop closes modal (new behavior vs. DaisyModal, small addition since gallery has more interactive surface).

## Data flow

1. Build time: `GalleryModal.astro` globs all screenshots, groups by top-level folder name (project slug), renders each project's images (only `<img>`/`<Image>` tags, all but first hidden via CSS) inside a `[data-slug]` wrapper.
2. Runtime: click on card's gallery button → JS shows modal, shows the `[data-slug]` group matching clicked project, sets first image active.
3. Prev/Next or arrow keys → toggle `active`/`hidden` class among sibling images in the visible group.
4. Close (button, Escape, or backdrop click) → hide modal, restore `body` scroll.

## No new dependencies

Confirmed with user: extend the existing hand-rolled modal pattern (`DaisyModal.astro`) rather than adding a library (e.g. GLightbox/PhotoSwipe). Keeps styling consistent and avoids a new dependency for something the codebase already does well.

## Testing

Manual verification per `verify` skill: run dev server, open `/projects`, click gallery icon on a project with images (`meetkeep`), confirm modal opens with correct screenshots, prev/next cycles correctly, Escape/backdrop/close-button all dismiss, and projects without `images` show no gallery button.
