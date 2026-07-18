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

### Task 4: Manual verification

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

- [ ] **Step 4: Stop the dev server**

Run: `astro dev stop`
