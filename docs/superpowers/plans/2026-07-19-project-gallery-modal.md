# Project Gallery Modal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "gallery" button to project cards that opens a modal showing that project's screenshots, using the existing hand-rolled modal pattern (no new dependency).

**Architecture:** Extend `Project` type with optional `images` field; a single shared `GalleryModal.astro` (mounted once in `Layout.astro`, like `DaisyModal.astro`) eagerly globs all screenshots under `src/assets/project-preview/`, pre-renders one hidden image group per project slug, and vanilla JS shows/hides groups + cycles images on trigger click / prev / next / arrow keys / Escape / backdrop click.

**Tech Stack:** Astro (`astro:assets` `<Image>`, `import.meta.glob`), Tailwind, astro-icon (`tabler:photo`, `tabler:chevron-left`, `tabler:chevron-right`), vanilla JS + View Transitions (`astro:after-swap`).

This repo has no test runner (`package.json` has no `test` script). Verification here means: `astro check`/`astro build` for type correctness, plus manual browser verification (dev server + click-through), per the project's `verify` skill — not unit tests.

## Global Constraints

- No new npm dependencies — reuse `DaisyModal.astro`'s vanilla toggle pattern exactly (`hidden`/`flex` class toggle, `document.body.style.overflow`, `astro:after-swap` re-init).
- Only projects with a non-empty `images` array get a gallery button; all others render exactly as today.
- Images live at `src/assets/project-preview/<slug>/<file>`, already present for `meetkeep` (`1.png`, `2.png`).
- Keep code simple — this is a small portfolio site, not an app; don't add abstractions beyond what these two components need.

---

### Task 1: Add `images` field to `Project` type and wire up `meetkeep` project data

**Files:**
- Modify: `src/data/profile.ts:26-33` (Project interface), `src/data/profile.ts:344-350` (meetkeep entry)

**Interfaces:**
- Produces: `Project.images?: string[]` — each string is a path relative to `src/assets/project-preview/`, e.g. `'meetkeep/1.png'`. First path segment (before `/`) is the project's gallery slug.

- [ ] **Step 1: Add the field to the `Project` interface**

In `src/data/profile.ts`, change:

```ts
export interface Project {
	title: string;
	description: string;
	tags: string[];
	repoUrl: string;
	liveUrl?: string;
	pinned?: boolean;
}
```

to:

```ts
export interface Project {
	title: string;
	description: string;
	tags: string[];
	repoUrl: string;
	liveUrl?: string;
	pinned?: boolean;
	images?: string[];
}
```

- [ ] **Step 2: Add `images` to the MeetKeep project entry**

Find the MeetKeep entry in the `projects` array:

```ts
		{
			title: 'MeetKeep',
			description: 'A Chrome extension that automatically injects a meeting timer into Google Meet.',
			tags: ['JavaScript', 'Chrome Extension'],
			repoUrl: 'https://github.com/ibnumardini/meetkeep',
			liveUrl: 'https://ibnumardini.github.io/meetkeep/',
		},
```

Change it to:

```ts
		{
			title: 'MeetKeep',
			description: 'A Chrome extension that automatically injects a meeting timer into Google Meet.',
			tags: ['JavaScript', 'Chrome Extension'],
			repoUrl: 'https://github.com/ibnumardini/meetkeep',
			liveUrl: 'https://ibnumardini.github.io/meetkeep/',
			images: ['meetkeep/1.png', 'meetkeep/2.png'],
		},
```

- [ ] **Step 3: Verify types compile**

Run: `bun run astro check`
Expected: no new type errors (pre-existing errors, if any, are unrelated and unchanged).

- [ ] **Step 4: Commit**

```bash
git add src/data/profile.ts
git commit -m "feat: add images field to Project type for gallery"
```

---

### Task 2: Build `GalleryModal.astro` and mount it in `Layout.astro`

**Files:**
- Create: `src/components/GalleryModal.astro`
- Modify: `src/layouts/Layout.astro` (import + mount, alongside `DaisyModal`)

**Interfaces:**
- Consumes: `profile.projects` from `../data/profile` (specifically each project's `title` and `images`).
- Produces: DOM contract that `ProjectCard.astro` (Task 3) depends on:
  - A clickable element with attribute `data-gallery-trigger` and `data-gallery-slug="<slug>"` opens the modal to that slug's image group.
  - Slug = `images[0].split('/')[0]` (the folder name), computed the same way in both files.

- [ ] **Step 1: Create the component file with glob import and markup**

Create `src/components/GalleryModal.astro`:

```astro
---
import { Image } from 'astro:assets';
import { Icon } from 'astro-icon/components';
import { profile } from '../data/profile';

const screenshots = import.meta.glob('/src/assets/project-preview/**/*.{png,jpg,jpeg,webp}', {
	eager: true,
	import: 'default',
});

const galleryProjects = profile.projects.filter((project) => project.images?.length);
---

<div
	id="gallery-modal"
	class="fixed inset-0 z-50 hidden items-center justify-center border-b border-slate-200/80 bg-white/70 backdrop-blur-lg dark:border-slate-800/80 dark:bg-slate-950/70"
>
	<div class="w-full max-w-2xl px-6">
		<div class="mb-4 flex justify-end">
			<button
				id="gallery-close"
				aria-label="Close"
				class="flex cursor-pointer items-center justify-center rounded-full bg-slate-900 p-2 text-white shadow-lg transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
			>
				<Icon name="tabler:x" size={16} />
			</button>
		</div>
		<div class="relative">
			<button
				id="gallery-prev"
				aria-label="Previous screenshot"
				class="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer rounded-full bg-slate-900/70 p-2 text-white hover:bg-slate-900"
			>
				<Icon name="tabler:chevron-left" size={20} />
			</button>
			<button
				id="gallery-next"
				aria-label="Next screenshot"
				class="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-full bg-slate-900/70 p-2 text-white hover:bg-slate-900"
			>
				<Icon name="tabler:chevron-right" size={20} />
			</button>
			{
				galleryProjects.map((project) => {
					const slug = project.images![0].split('/')[0];
					return (
						<div data-slug={slug} class="gallery-group hidden">
							{project.images!.map((path, i) => {
								const image = screenshots[`/src/assets/project-preview/${path}`];
								if (!image) return null;
								return (
									<Image
										src={image as ImageMetadata}
										alt={`${project.title} screenshot ${i + 1}`}
										widths={[400, 800]}
										sizes="(min-width: 768px) 600px, 100vw"
										class:list={['gallery-image w-full rounded-lg object-cover', i === 0 ? '' : 'hidden']}
									/>
								);
							})}
						</div>
					);
				})
			}
		</div>
	</div>
</div>

<script>
	function initGalleryModal() {
		const modal = document.getElementById('gallery-modal');
		const closeBtn = document.getElementById('gallery-close');
		const prevBtn = document.getElementById('gallery-prev');
		const nextBtn = document.getElementById('gallery-next');
		if (!modal || !closeBtn || !prevBtn || !nextBtn) return;

		let activeImages: HTMLElement[] = [];
		let activeIndex = 0;

		const showIndex = (index: number) => {
			activeImages.forEach((img, i) => img.classList.toggle('hidden', i !== index));
			activeIndex = index;
		};

		const toggle = (show: boolean) => {
			modal.classList.toggle('hidden', !show);
			modal.classList.toggle('flex', show);
			document.body.style.overflow = show ? 'hidden' : '';
		};

		const open = (slug: string) => {
			const groups = modal.querySelectorAll<HTMLElement>('.gallery-group');
			let matched: HTMLElement | null = null;
			groups.forEach((group) => {
				const isMatch = group.dataset.slug === slug;
				group.classList.toggle('hidden', !isMatch);
				if (isMatch) matched = group;
			});
			if (!matched) return;
			activeImages = Array.from((matched as HTMLElement).querySelectorAll<HTMLElement>('.gallery-image'));
			showIndex(0);
			toggle(true);
		};

		document.querySelectorAll<HTMLElement>('[data-gallery-trigger]').forEach((trigger) => {
			trigger.addEventListener('click', () => {
				const slug = trigger.dataset.gallerySlug;
				if (slug) open(slug);
			});
		});

		const step = (delta: number) => {
			if (activeImages.length === 0) return;
			const next = (activeIndex + delta + activeImages.length) % activeImages.length;
			showIndex(next);
		};

		closeBtn.addEventListener('click', () => toggle(false));
		prevBtn.addEventListener('click', () => step(-1));
		nextBtn.addEventListener('click', () => step(1));
		modal.addEventListener('click', (e) => {
			if (e.target === modal) toggle(false);
		});
		document.addEventListener('keydown', (e) => {
			if (modal.classList.contains('hidden')) return;
			if (e.key === 'Escape') toggle(false);
			if (e.key === 'ArrowLeft') step(-1);
			if (e.key === 'ArrowRight') step(1);
		});
	}

	initGalleryModal();
	document.addEventListener('astro:after-swap', initGalleryModal);
</script>
```

- [ ] **Step 2: Mount it in the layout**

In `src/layouts/Layout.astro`, find the import line:

```ts
import DaisyModal from '../components/DaisyModal.astro';
```

Add below it:

```ts
import GalleryModal from '../components/GalleryModal.astro';
```

Find `<DaisyModal />` in the template and add below it:

```astro
<DaisyModal />
<GalleryModal />
```

- [ ] **Step 3: Verify types compile**

Run: `bun run astro check`
Expected: no new type errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/GalleryModal.astro src/layouts/Layout.astro
git commit -m "feat: add shared gallery modal component"
```

---

### Task 3: Add gallery trigger button to `ProjectCard.astro`

**Files:**
- Modify: `src/components/ProjectCard.astro`

**Interfaces:**
- Consumes: `data-gallery-trigger` / `data-gallery-slug` DOM contract from Task 2.

- [ ] **Step 1: Destructure `images` from props**

Change:

```astro
const { title, description, tags, repoUrl, liveUrl } = Astro.props;
```

to:

```astro
const { title, description, tags, repoUrl, liveUrl, images } = Astro.props;
const gallerySlug = images?.[0]?.split('/')[0];
```

- [ ] **Step 2: Add the gallery button next to the existing icons**

Find this block:

```astro
			<div class="flex items-center gap-3">
				{
					liveUrl && (
						<a href={liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${title} live demo`}>
							<Icon
								name="tabler:external-link"
								size={18}
								class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
							/>
						</a>
					)
				}
				<a href={repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`${title} source on GitHub`}>
					<Icon
						name="tabler:brand-github"
						size={18}
						class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
					/>
				</a>
			</div>
```

Replace with:

```astro
			<div class="flex items-center gap-3">
				{
					gallerySlug && (
						<button
							type="button"
							data-gallery-trigger
							data-gallery-slug={gallerySlug}
							aria-label={`${title} screenshots`}
						>
							<Icon
								name="tabler:photo"
								size={18}
								class="cursor-pointer text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
							/>
						</button>
					)
				}
				{
					liveUrl && (
						<a href={liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${title} live demo`}>
							<Icon
								name="tabler:external-link"
								size={18}
								class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
							/>
						</a>
					)
				}
				<a href={repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`${title} source on GitHub`}>
					<Icon
						name="tabler:brand-github"
						size={18}
						class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
					/>
				</a>
			</div>
```

- [ ] **Step 3: Verify types compile**

Run: `bun run astro check`
Expected: no new type errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectCard.astro
git commit -m "feat: add gallery trigger button to project card"
```

---

### Task 4: Add optional per-image captions

> Added after Tasks 1-3 shipped: user asked for (1) an optional caption/description per screenshot, and (2) a wider modal image. This changes `Project.images` from `string[]` to an object array, so it touches the type (Task 1's file), the modal (Task 2's file), and the card (Task 3's file) together — not splittable across separate task reviews since the type change binds all three. The width bump only touches Task 2's file, bundled in here since both changes land in `GalleryModal.astro` together.

**Files:**
- Modify: `src/data/profile.ts:26-34` (Project interface), `src/data/profile.ts:351` (meetkeep entry)
- Modify: `src/components/GalleryModal.astro` (image rendering + caption display)
- Modify: `src/components/ProjectCard.astro` (gallery slug derivation)

**Interfaces:**
- Produces: `Project.images?: { src: string; caption?: string }[]` — `src` is the path relative to `src/assets/project-preview/` (e.g. `'meetkeep/1.png'`), same meaning as the old string entries. Gallery slug = `images[0].src.split('/')[0]`.

- [ ] **Step 1: Change the `Project` interface**

In `src/data/profile.ts`, change:

```ts
	images?: string[];
```

to:

```ts
	images?: { src: string; caption?: string }[];
```

- [ ] **Step 2: Update the MeetKeep entry to the new shape**

Change:

```ts
			images: ['meetkeep/1.png', 'meetkeep/2.png'],
```

to:

```ts
			images: [{ src: 'meetkeep/1.png' }, { src: 'meetkeep/2.png' }],
```

(No captions written yet for MeetKeep — `caption` stays optional and unset here. Add real captions later by filling in `caption: '...'` on any entry.)

- [ ] **Step 3: Verify types compile**

Run: `bun run astro check`
Expected: type errors surface in `GalleryModal.astro` and `ProjectCard.astro` (Steps 4-6 fix them) but not in `profile.ts` itself.

- [ ] **Step 4: Update `GalleryModal.astro`'s slug derivation and image rendering, and widen the modal**

Change:

```astro
				galleryProjects.map((project) => {
					const slug = project.images![0].split('/')[0];
					return (
						<div data-slug={slug} class="gallery-group hidden">
							{project.images!.map((path, i) => {
								const image = screenshots[`/src/assets/project-preview/${path}`];
								if (!image) return null;
								return (
									<Image
										src={image as ImageMetadata}
										alt={`${project.title} screenshot ${i + 1}`}
										widths={[400, 800]}
										sizes="(min-width: 768px) 600px, 100vw"
										class:list={['gallery-image w-full rounded-lg object-cover', i === 0 ? '' : 'hidden']}
									/>
								);
							})}
						</div>
					);
				})
```

to:

```astro
				galleryProjects.map((project) => {
					const slug = project.images![0].src.split('/')[0];
					return (
						<div data-slug={slug} class="gallery-group hidden">
							{project.images!.map((entry, i) => {
								const image = screenshots[`/src/assets/project-preview/${entry.src}`];
								if (!image) return null;
								return (
									<figure class:list={['gallery-image', i === 0 ? '' : 'hidden']}>
										<Image
											src={image as ImageMetadata}
											alt={entry.caption ?? `${project.title} screenshot ${i + 1}`}
											widths={[400, 800, 1200]}
											sizes="(min-width: 768px) 850px, 100vw"
											class="w-full rounded-lg object-cover"
										/>
										{entry.caption && (
											<figcaption class="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
												{entry.caption}
											</figcaption>
										)}
									</figure>
								);
							})}
						</div>
					);
				})
```

`.gallery-image` moves from the `<Image>` tag to the wrapping `<figure>`, since the show/hide toggle in the script operates on whole image+caption units, not just the `<img>`. No script changes needed — `querySelectorAll<HTMLElement>('.gallery-image')` still selects the same number of elements per group, just now `<figure>` instead of `<img>`.

Also widen the modal container. Change:

```astro
	<div class="w-full max-w-2xl px-6">
```

to:

```astro
	<div class="w-full max-w-4xl px-6">
```

(`max-w-4xl` ≈ 896px, up from `max-w-2xl` ≈ 672px; `widths`/`sizes` on the `<Image>` above are bumped to match so the optimized image doesn't upscale past its generated resolution.)

- [ ] **Step 5: Update `ProjectCard.astro`'s slug derivation**

Change:

```astro
const gallerySlug = images?.[0]?.split('/')[0];
```

to:

```astro
const gallerySlug = images?.[0]?.src.split('/')[0];
```

- [ ] **Step 6: Verify types compile and build succeeds**

Run: `bun run astro check`
Expected: 0 errors.

Run: `bun run build`
Expected: build succeeds, MeetKeep screenshots still optimize correctly.

- [ ] **Step 7: Commit**

```bash
git add src/data/profile.ts src/components/GalleryModal.astro src/components/ProjectCard.astro
git commit -m "feat: support optional captions on gallery images"
```

---

### Task 5: Add image counter ("1 / 2") to the gallery modal

> Added after Task 4 was dispatched: user asked to show current/total position while browsing a project's screenshots.

**Files:**
- Modify: `src/components/GalleryModal.astro`

**Interfaces:**
- Consumes: `activeImages`, `activeIndex`, `showIndex()` from the existing script in `GalleryModal.astro` (Task 2/4's code).

- [ ] **Step 1: Add the counter element to the markup**

Find:

```astro
		<div class="mb-4 flex justify-end">
			<button
				id="gallery-close"
```

Change to:

```astro
		<div class="mb-4 flex items-center justify-between">
			<span id="gallery-counter" class="text-sm text-slate-500 dark:text-slate-400"></span>
			<button
				id="gallery-close"
```

- [ ] **Step 2: Update the script to populate it**

Find:

```ts
		let activeImages: HTMLElement[] = [];
		let activeIndex = 0;

		const showIndex = (index: number) => {
			activeImages.forEach((img, i) => img.classList.toggle('hidden', i !== index));
			activeIndex = index;
		};
```

Change to:

```ts
		const counter = document.getElementById('gallery-counter');
		let activeImages: HTMLElement[] = [];
		let activeIndex = 0;

		const showIndex = (index: number) => {
			activeImages.forEach((img, i) => img.classList.toggle('hidden', i !== index));
			activeIndex = index;
			if (counter) counter.textContent = `${index + 1} / ${activeImages.length}`;
		};
```

`counter` is looked up once per `initGalleryModal()` call (same lifecycle as `modal`/`closeBtn`/etc.), so it's correctly re-queried after `astro:after-swap`. No guard added on `!counter` blocking the rest of init — the counter is cosmetic, so its absence shouldn't disable prev/next/close.

- [ ] **Step 3: Verify types compile**

Run: `bun run astro check`
Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/GalleryModal.astro
git commit -m "feat: show image position counter in gallery modal"
```

---

### Task 6: Manual verification

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server in background**

Run: `astro dev --background`

- [ ] **Step 2: Build check**

Run: `bun run build`
Expected: build succeeds with no errors (confirms glob paths resolve and images optimize correctly).

- [ ] **Step 3: Browser walkthrough**

Open `/projects` in a browser. Confirm:
- MeetKeep card shows a photo icon button; other project cards do not.
- Clicking the photo icon opens the modal showing `1.png` first.
- Next/prev buttons and Left/Right arrow keys cycle between `1.png` and `2.png`, wrapping at both ends.
- Escape, the X button, and clicking the backdrop all close the modal.
- Page scroll is locked while modal is open and restored after close.
- MeetKeep's captions ("Real-time Timer", "Meeting Time Recap") appear centered below their respective images, and switching between images swaps the caption text correctly.
- Modal shows "1 / 2" when the first image is active and "2 / 2" after clicking next, updating correctly on prev/next and arrow keys too.

- [ ] **Step 4: Stop the dev server**

Run: `astro dev stop`
