# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-scroll personal site (profile + portfolio + blog teaser) plus a separate `/blog` and `/blog/[slug]`, for `ibnumardini`, deployed to `ibnu.mardini.dev`.

**Architecture:** Astro 7 static site. Tailwind v4 via `@tailwindcss/vite` (no separate integration package). Icons via `@lucide/astro`. Blog posts as markdown files loaded through Astro Content Collections. Hardcoded profile data in a typed TS module. Light/dark theme via `class` strategy + localStorage, no-flash inline script in `<head>`.

**Tech Stack:** Astro 7.0.7, Tailwind CSS v4 (`@tailwindcss/vite` + `tailwindcss` npm packages), `@lucide/astro`, Space Grotesk (Google Fonts `<link>`), Astro Content Collections (`astro:content`).

## Global Constraints

- Site config `site` field must be `https://ibnu.mardini.dev` (from spec).
- No CMS/admin UI — blog posts are markdown files in `src/content/blog/`.
- No contact form — email is a `mailto:` link only.
- No analytics, no comments, no i18n.
- English site copy only.
- Light mode is the default; dark mode toggles via a button, persisted in `localStorage`, using Tailwind `darkMode: 'class'`.
- Logo swap: `public/images/light_logo.png` in light mode, `public/images/dark_logo.png` in dark mode.
- This project has no existing test runner (bare Astro scaffold, no test deps). Verification for every task is `bun run build` succeeding and manual check via `astro dev` — there is no unit-testable logic here (static markup/content), so TDD steps are replaced with build/dev-server verification gates.
- **Astro 7 content collections API correction (discovered during Task 4):** Astro 5+ replaced the old `type: 'content'` collection API. The schema file lives at `src/content.config.ts` (not `src/content/config.ts`) and must define a `loader: glob({ pattern: '**/*.md', base: './src/content/blog' })` (imported from `astro/loaders`) instead of `type: 'content'`. Collection entries no longer have `.slug` — use `.id` instead. Entries no longer have a `.render()` method — import `render` from `astro:content` and call `render(entry)` instead of `entry.render()`. Any task below written against the old API (`.slug`, `entry.render()`, `src/content/config.ts`) must use the corrected API instead — this note supersedes those code snippets.

---

### Task 1: Install Tailwind v4 and wire it into Astro config

**Files:**
- Modify: `package.json` (add deps)
- Modify: `astro.config.mjs`
- Create: `src/styles/global.css`

**Interfaces:**
- Produces: `src/styles/global.css` importable from any layout via `import '../styles/global.css'`.

- [ ] **Step 1: Install packages**

Run: `bun add tailwindcss @tailwindcss/vite`
Expected: `package.json` dependencies gain `tailwindcss` and `@tailwindcss/vite`.

- [ ] **Step 2: Create the global stylesheet**

Create `src/styles/global.css`:

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));
```

- [ ] **Step 3: Wire the Vite plugin into Astro config**

Replace `astro.config.mjs` with:

```js
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://ibnu.mardini.dev',
	vite: {
		plugins: [tailwindcss()],
	},
});
```

- [ ] **Step 4: Verify build succeeds**

Run: `bun run build`
Expected: build completes with no errors (page still just renders the default `Welcome` component, but Tailwind/Vite config must not break the build).

- [ ] **Step 5: Commit**

```bash
git add package.json bun.lock astro.config.mjs src/styles/global.css
git commit -m "feat: add Tailwind CSS v4 via Vite plugin"
```

---

### Task 2: Install lucide icons

**Files:**
- Modify: `package.json`

**Interfaces:**
- Produces: importable icon components, e.g. `import { Github, Linkedin, Mail, Sun, Moon } from '@lucide/astro'`.

- [ ] **Step 1: Install package**

Run: `bun add @lucide/astro`
Expected: `@lucide/astro` added to `package.json` dependencies.

- [ ] **Step 2: Verify import works**

Create a scratch check inline (do not commit): temporarily add `import { Github } from '@lucide/astro';` to `src/pages/index.astro` frontmatter and `<Github />` in the markup, run `bun run build`, confirm no module-resolution error, then remove the scratch lines before continuing (this file gets properly rewritten in Task 8 anyway).

- [ ] **Step 3: Commit**

```bash
git add package.json bun.lock
git commit -m "feat: add @lucide/astro for icons"
```

---

### Task 3: Profile data module

**Files:**
- Create: `src/data/profile.ts`

**Interfaces:**
- Produces:
  - `interface SocialLink { label: string; url: string; icon: 'github' | 'linkedin' | 'mail' }`
  - `interface SkillGroup { category: string; items: string[] }`
  - `interface ExperienceEntry { company: string; companyUrl?: string; role: string; dates: string; bullets: string[] }`
  - `interface Project { title: string; description: string; tags: string[]; repoUrl: string }`
  - `export const profile: { name: string; title: string; summary: string; location: string; socials: SocialLink[]; skills: SkillGroup[]; experience: ExperienceEntry[]; projects: Project[] }`

- [ ] **Step 1: Write the data module**

Create `src/data/profile.ts`:

```ts
export interface SocialLink {
	label: string;
	url: string;
	icon: 'github' | 'linkedin' | 'mail';
}

export interface SkillGroup {
	category: string;
	items: string[];
}

export interface ExperienceEntry {
	company: string;
	companyUrl?: string;
	role: string;
	dates: string;
	bullets: string[];
}

export interface Project {
	title: string;
	description: string;
	tags: string[];
	repoUrl: string;
}

export const profile = {
	name: 'Muhammad Fatkurozi',
	title: 'Software Engineer | Back-end Developer',
	summary:
		'Backend Engineer with 5+ years of experience specializing in high-scale REST APIs, distributed systems, and modern backend stacks (Go, JavaScript, Laravel). Experienced in leading backend teams, optimizing infrastructure, and delivering reliable production systems.',
	location: 'Yogyakarta, Indonesia',
	socials: [
		{ label: 'Email', url: 'mailto:hi@mardini.dev', icon: 'mail' },
		{ label: 'LinkedIn', url: 'https://linkedin.com/in/ibnumardini', icon: 'linkedin' },
		{ label: 'GitHub', url: 'https://github.com/ibnumardini', icon: 'github' },
	] satisfies SocialLink[],
	skills: [
		{
			category: 'Backend',
			items: [
				'PHP', 'JavaScript', 'TypeScript', 'Go', 'Laravel', 'CodeIgniter', 'Node.js',
				'Express.js', 'NestJs', 'AdonisJs', 'Echo Framework', 'GORM', 'Prisma',
			],
		},
		{
			category: 'Frontend',
			items: ['HTML', 'CSS', 'ReactJS', 'Alpine.js', 'jQuery', 'Sass', 'Tailwind CSS', 'Bootstrap', 'Ant Design'],
		},
		{
			category: 'DBMS',
			items: ['MySQL', 'PostgreSQL', 'SQLite', 'MongoDB', 'Redis', 'Firebase'],
		},
		{
			category: 'DevOps & Infrastructure',
			items: [
				'GNU/Linux', 'Docker', 'Kubernetes', 'Nginx', 'Haproxy', 'Traefik',
				'Object Storage S3', 'OpenTelemetry', 'Grafana', 'Loki', 'Prometheus', 'GitLab CI/CD', 'Dokploy',
			],
		},
		{
			category: 'Cloud Platforms',
			items: ['AWS', 'Vultr', 'Google Cloud', 'GitLab', 'GitHub', 'Firebase', 'Cloudflare'],
		},
		{
			category: 'Tools',
			items: ['Git', 'Helm', 'RabbitMQ', 'Vite', 'Jira', 'Postman', 'VSCode'],
		},
	] satisfies SkillGroup[],
	experience: [
		{
			company: 'PT Kedata Indonesia Digital',
			companyUrl: 'https://kedata.online',
			role: 'Backend Developer',
			dates: 'Dec 2025 - Present',
			bullets: [
				'Enhance and support legacy APIs and apps on Go and PostgreSQL.',
				'Architected advanced synchronization workflows to guarantee high-precision data alignment across multiple heterogeneous databases.',
			],
		},
		{
			company: 'PT Teknologi Pelanggan Bahagia (PT TPB)',
			companyUrl: 'https://woo-wa.com',
			role: 'Web Developer',
			dates: 'Jan 2025 - Nov 2025',
			bullets: [
				'Modernize and maintain legacy APIs and apps on Express.js and Laravel.',
				'Implement CI/CD for better deployment and reduce manual processes by 98%.',
				'Improved the application by integrating RabbitMQ and Server-Sent Events for real-time reminder notifications.',
			],
		},
		{
			company: 'Woowa CRM',
			role: 'Backend Lead',
			dates: 'March 2024 - Jan 2025',
			bullets: [
				'Effectively led a team of 3-4 members to achieve project goals.',
				'Conducted comprehensive code reviews on merge requests to prevent potential production bugs.',
				'Organize application deployment to a Kubernetes cluster with 100% zero downtime.',
				'Enhanced developer experience (DX) by ensuring 100% of generated code meets standards.',
			],
		},
		{
			company: 'Woowa CRM',
			companyUrl: 'https://woowacrm.com',
			role: 'Backend Web Developer',
			dates: 'April 2022 - Feb 2024',
			bullets: [
				'Entrusted with the design, development, and maintenance of RESTful API services and Web App products, using Node.js, Express.js, TypeScript, NestJs, ReactJs, Laravel, MySQL, PostgreSQL, MongoDB, Redis, Firebase, Docker, Kubernetes.',
				'Efficiently manage millions of contact records, ensuring rapid response times.',
				'Design an expandable database schema to accommodate growing data needs.',
			],
		},
		{
			company: 'PT Qodr Bee Berinovasi',
			companyUrl: 'https://qodrbee.com',
			role: 'Web Developer',
			dates: 'Sept 2019 - April 2022',
			bullets: [
				'Entrusted with designing, building, and sustaining client websites, information systems, RESTful APIs, and company products using PHP, WordPress, Laravel, CodeIgniter, Go, MySQL, PostgreSQL, and RabbitMQ.',
				"Developed a streamlined version of the company's WordPress plugin, optimizing performance by reducing 80% of non-essential features.",
				'Successfully developed a high-volume WhatsApp broadcast application in Go, leveraging RabbitMQ for efficient message handling and delivery.',
			],
		},
	] satisfies ExperienceEntry[],
	projects: [
		{
			title: 'SIMALU',
			description:
				'Sistem Informasi Manajemen Alumni — specialized software crafted to help educational institutions and organizations efficiently manage and maintain alumni relations.',
			tags: ['PHP', 'Laravel 11', 'MySQL 8', 'JavaScript', 'Bootstrap 5', 'Tabler.io'],
			repoUrl: 'https://github.com/ibnumardini/simalu',
		},
		{
			title: 'Wilayah ID API',
			description:
				'A RESTful API that provides structured Indonesian administrative region data from provinces to villages, designed to simplify integration of regional data into various applications.',
			tags: ['Go', 'MySQL', 'go-chi'],
			repoUrl: 'https://github.com/ibnumardini/wilayah-indonesia-api',
		},
		{
			title: 'My UMBY Profile API',
			description:
				'An API Gateway for securely verifying and retrieving student records at Universitas Mercu Buana Yogyakarta, including scraping and validating data from official academic sources.',
			tags: ['JavaScript', 'Node.js', 'Express.js'],
			repoUrl: 'https://github.com/ibnumardini/my-umby-profile-api',
		},
	] satisfies Project[],
};
```

- [ ] **Step 2: Note deferred verification**

This module isn't imported by any page until Task 5 (Layout, SocialLinks) and Task 8 (homepage). It will be type-checked as part of `bun run build` in those tasks. No standalone verification step here — proceed directly to commit.

- [ ] **Step 3: Commit**

```bash
git add src/data/profile.ts
git commit -m "feat: add hardcoded profile/experience/project data"
```

---

### Task 4: Blog content collection

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/blog/hello-world.md`

**Interfaces:**
- Produces: `getCollection('blog')` returning entries with `data: { title: string; date: Date; description: string }` and `.render()` available on each entry (standard Astro Content Collections API).

- [ ] **Step 1: Define the collection schema**

Create `src/content/config.ts`:

```ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		description: z.string(),
	}),
});

export const collections = { blog };
```

- [ ] **Step 2: Add a starter post**

Create `src/content/blog/hello-world.md`:

```md
---
title: "Hello, World"
date: 2026-07-10
description: "First post on this blog — why I built this site and what's next."
---

This is the first post on my new site. I'll be writing here about backend engineering, distributed systems, and whatever I'm building at the time.

More soon.
```

- [ ] **Step 3: Verify build succeeds**

Run: `bun run build`
Expected: no content-collection schema errors.

- [ ] **Step 4: Commit**

```bash
git add src/content/config.ts src/content/blog/hello-world.md
git commit -m "feat: add blog content collection with starter post"
```

---

### Task 5: Shared Layout with fonts, theme no-flash script, header, footer

**Files:**
- Modify: `src/layouts/Layout.astro`
- Create: `src/components/ThemeToggle.astro`
- Create: `src/components/SocialLinks.astro`
- Delete: `src/components/Welcome.astro` (no longer used after Task 8 rewrites the homepage)
- Delete: `src/assets/astro.svg`, `src/assets/background.svg` (Welcome-only assets)

**Interfaces:**
- Consumes: `profile.socials` from `src/data/profile.ts` (Task 3).
- Produces: `Layout.astro` accepting `Props: { title: string; description?: string }`, rendering `<slot />` inside `<body>` with header (logo + nav + `ThemeToggle`) and footer (copyright + `SocialLinks`).
- Produces: `ThemeToggle.astro` — no props, self-contained button + inline script toggling `document.documentElement.classList.toggle('dark')` and persisting to `localStorage.theme`.
- Produces: `SocialLinks.astro` — `Props: { size?: number }` (default 20), renders one `<a>` per `profile.socials` entry with the matching lucide icon (`Mail`, `Linkedin`, `Github`).

- [ ] **Step 1: Write SocialLinks component**

Create `src/components/SocialLinks.astro`:

```astro
---
import { Mail, Linkedin, Github } from '@lucide/astro';
import { profile } from '../data/profile';

interface Props {
	size?: number;
}

const { size = 20 } = Astro.props;

const iconMap = {
	mail: Mail,
	linkedin: Linkedin,
	github: Github,
};
---

<div class="flex items-center gap-4">
	{profile.socials.map((social) => {
		const Icon = iconMap[social.icon];
		return (
			<a
				href={social.url}
				aria-label={social.label}
				target={social.icon === 'mail' ? undefined : '_blank'}
				rel={social.icon === 'mail' ? undefined : 'noopener noreferrer'}
				class="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
			>
				<Icon size={size} />
			</a>
		);
	})}
</div>
```

- [ ] **Step 2: Write ThemeToggle component**

Create `src/components/ThemeToggle.astro`:

```astro
---
import { Sun, Moon } from '@lucide/astro';
---

<button
	id="theme-toggle"
	type="button"
	aria-label="Toggle dark mode"
	class="rounded-full p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
>
	<Sun size={18} class="block dark:hidden" />
	<Moon size={18} class="hidden dark:block" />
</button>

<script>
	const button = document.getElementById('theme-toggle');
	button?.addEventListener('click', () => {
		const isDark = document.documentElement.classList.toggle('dark');
		localStorage.theme = isDark ? 'dark' : 'light';
	});
</script>
```

- [ ] **Step 3: Rewrite Layout.astro**

Replace `src/layouts/Layout.astro` with:

```astro
---
import ThemeToggle from '../components/ThemeToggle.astro';
import SocialLinks from '../components/SocialLinks.astro';
import { profile } from '../data/profile';
import '../styles/global.css';

interface Props {
	title: string;
	description?: string;
}

const { title, description = profile.summary } = Astro.props;
---

<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="description" content={description} />
		<link rel="icon" type="image/png" href="/images/light_logo.png" />
		<meta name="generator" content={Astro.generator} />
		<title>{title}</title>
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
			rel="stylesheet"
		/>
		<script is:inline>
			const stored = localStorage.theme;
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			if (stored === 'dark' || (!stored && prefersDark)) {
				document.documentElement.classList.add('dark');
			}
		</script>
	</head>
	<body class="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors">
		<header class="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
			<a href="/" class="flex items-center gap-2">
				<img src="/images/light_logo.png" alt="ibnumardini logo" class="h-8 w-auto dark:hidden" />
				<img src="/images/dark_logo.png" alt="ibnumardini logo" class="hidden h-8 w-auto dark:block" />
				<span class="font-semibold">ibnumardini</span>
			</a>
			<nav class="flex items-center gap-6">
				<a href="/#portfolio" class="text-sm hover:underline">Portfolio</a>
				<a href="/blog" class="text-sm hover:underline">Blog</a>
				<ThemeToggle />
			</nav>
		</header>
		<main class="mx-auto max-w-3xl px-6">
			<slot />
		</main>
		<footer class="mx-auto flex max-w-3xl items-center justify-between px-6 py-10 text-sm text-slate-500 dark:text-slate-400">
			<p>&copy; {new Date().getFullYear()} {profile.name}</p>
			<SocialLinks size={18} />
		</footer>
	</body>
</html>
```

- [ ] **Step 4: Set Tailwind font-family and remove default Welcome-only assets**

Append to `src/styles/global.css`:

```css
@theme {
	--font-sans: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
}
```

Run: `rm src/components/Welcome.astro src/assets/astro.svg src/assets/background.svg`

- [ ] **Step 5: Verify build succeeds**

Run: `bun run build`
Expected: fails at this point because `src/pages/index.astro` still imports the now-deleted `Welcome` component — this is expected and resolved in Task 8. Confirm the failure is specifically the missing `Welcome` import (not a Tailwind/font/layout error) before moving on.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: rebuild Layout with header/footer, theme toggle, fonts"
```

---

### Task 6: ExperienceItem and ProjectCard components

**Files:**
- Create: `src/components/ExperienceItem.astro`
- Create: `src/components/ProjectCard.astro`

**Interfaces:**
- Consumes: `ExperienceEntry` and `Project` types from `src/data/profile.ts` (Task 3).
- Produces: `ExperienceItem.astro` — `Props: ExperienceEntry`. `ProjectCard.astro` — `Props: Project`.

- [ ] **Step 1: Write ExperienceItem**

Create `src/components/ExperienceItem.astro`:

```astro
---
import type { ExperienceEntry } from '../data/profile';

type Props = ExperienceEntry;

const { company, companyUrl, role, dates, bullets } = Astro.props;
---

<div class="border-l-2 border-slate-200 dark:border-slate-800 pl-4 py-2">
	<div class="flex flex-wrap items-baseline justify-between gap-x-4">
		<h3 class="font-semibold">
			{role} ·{' '}
			{companyUrl ? (
				<a href={companyUrl} target="_blank" rel="noopener noreferrer" class="hover:underline">
					{company}
				</a>
			) : (
				company
			)}
		</h3>
		<span class="text-sm text-slate-500 dark:text-slate-400">{dates}</span>
	</div>
	<ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">
		{bullets.map((bullet) => <li>{bullet}</li>)}
	</ul>
</div>
```

- [ ] **Step 2: Write ProjectCard**

Create `src/components/ProjectCard.astro`:

```astro
---
import { Github } from '@lucide/astro';
import type { Project } from '../data/profile';

type Props = Project;

const { title, description, tags, repoUrl } = Astro.props;
---

<a
	href={repoUrl}
	target="_blank"
	rel="noopener noreferrer"
	class="block rounded-lg border border-slate-200 p-5 hover:border-slate-400 dark:border-slate-800 dark:hover:border-slate-600 transition-colors"
>
	<div class="flex items-center justify-between">
		<h3 class="font-semibold">{title}</h3>
		<Github size={18} class="text-slate-400" />
	</div>
	<p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
	<div class="mt-3 flex flex-wrap gap-2">
		{tags.map((tag) => (
			<span class="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
				{tag}
			</span>
		))}
	</div>
</a>
```

- [ ] **Step 3: Verify build succeeds**

Run: `bun run build`
Expected: still fails only due to the Task 8 dependency on `Welcome` (same known failure as Task 5 Step 5) — confirm no new errors from these two files by checking the error output mentions only `Welcome`.

- [ ] **Step 4: Commit**

```bash
git add src/components/ExperienceItem.astro src/components/ProjectCard.astro
git commit -m "feat: add ExperienceItem and ProjectCard components"
```

---

### Task 7: BlogCard component

**Files:**
- Create: `src/components/BlogCard.astro`

**Interfaces:**
- Consumes: a blog collection entry shape `{ id: string; data: { title: string; date: Date; description: string } }` (from `astro:content` `getCollection('blog')`, defined in Task 4 — Astro 7 loader-based collections expose `.id`, not `.slug`).
- Produces: `BlogCard.astro` — `Props: { id: string; title: string; date: Date; description: string }`.

- [ ] **Step 1: Write BlogCard**

Create `src/components/BlogCard.astro`:

```astro
---
interface Props {
	id: string;
	title: string;
	date: Date;
	description: string;
}

const { id, title, date, description } = Astro.props;

const formattedDate = date.toLocaleDateString('en-US', {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
});
---

<a href={`/blog/${id}`} class="block py-4 group">
	<p class="text-sm text-slate-500 dark:text-slate-400">{formattedDate}</p>
	<h3 class="font-semibold group-hover:underline">{title}</h3>
	<p class="mt-1 text-sm text-slate-600 dark:text-slate-300">{description}</p>
</a>
```

- [ ] **Step 2: Verify build succeeds**

Run: `bun run build`
Expected: still fails only due to the known Task 8 `Welcome` dependency — confirm no new errors introduced by this file.

- [ ] **Step 3: Commit**

```bash
git add src/components/BlogCard.astro
git commit -m "feat: add BlogCard component"
```

---

### Task 8: Homepage (single-scroll: hero, skills, experience, portfolio, blog teaser)

**Files:**
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `profile` from `src/data/profile.ts` (Task 3), `ExperienceItem`/`ProjectCard` (Task 6), `BlogCard` (Task 7), `getCollection` from `astro:content` (Task 4), `Layout` (Task 5), `SocialLinks` (Task 5).

- [ ] **Step 1: Write the homepage**

Replace `src/pages/index.astro` with:

```astro
---
import { getCollection } from 'astro:content';
import Layout from '../layouts/Layout.astro';
import SocialLinks from '../components/SocialLinks.astro';
import ExperienceItem from '../components/ExperienceItem.astro';
import ProjectCard from '../components/ProjectCard.astro';
import BlogCard from '../components/BlogCard.astro';
import { profile } from '../data/profile';

const posts = (await getCollection('blog'))
	.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
	.slice(0, 3);
---

<Layout title={`${profile.name} — ${profile.title}`}>
	<section class="py-16">
		<h1 class="text-3xl font-bold sm:text-4xl">{profile.name}</h1>
		<p class="mt-2 text-lg text-slate-600 dark:text-slate-300">{profile.title}</p>
		<p class="mt-4 max-w-xl text-slate-600 dark:text-slate-300">{profile.summary}</p>
		<p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{profile.location}</p>
		<div class="mt-6">
			<SocialLinks size={22} />
		</div>
	</section>

	<section class="py-10">
		<h2 class="text-xl font-semibold">Skills</h2>
		<div class="mt-4 grid gap-4 sm:grid-cols-2">
			{profile.skills.map((group) => (
				<div>
					<h3 class="text-sm font-medium text-slate-500 dark:text-slate-400">{group.category}</h3>
					<p class="mt-1 text-sm text-slate-700 dark:text-slate-300">{group.items.join(', ')}</p>
				</div>
			))}
		</div>
	</section>

	<section class="py-10">
		<h2 class="text-xl font-semibold">Experience</h2>
		<div class="mt-4 space-y-6">
			{profile.experience.map((entry) => <ExperienceItem {...entry} />)}
		</div>
	</section>

	<section id="portfolio" class="py-10">
		<h2 class="text-xl font-semibold">Portfolio</h2>
		<div class="mt-4 grid gap-4 sm:grid-cols-2">
			{profile.projects.map((project) => <ProjectCard {...project} />)}
		</div>
	</section>

	<section class="py-10">
		<div class="flex items-baseline justify-between">
			<h2 class="text-xl font-semibold">Blog</h2>
			<a href="/blog" class="text-sm hover:underline">View all</a>
		</div>
		<div class="mt-2 divide-y divide-slate-200 dark:divide-slate-800">
			{posts.map((post) => (
				<BlogCard id={post.id} title={post.data.title} date={post.data.date} description={post.data.description} />
			))}
		</div>
	</section>
</Layout>
```

- [ ] **Step 2: Verify build succeeds**

Run: `bun run build`
Expected: build completes with no errors (this resolves the known-failing state from Tasks 5-7).

- [ ] **Step 3: Manual check in dev server**

Run: `astro dev --background`, then check `astro dev status` for the local URL, and confirm in a browser (or via `curl http://localhost:4321/` and grep for `profile.name`) that the hero section renders the name, skills list, experience entries, 3 project cards, and up to 3 blog teaser cards.
Run: `astro dev stop` when done.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: build homepage with hero, skills, experience, portfolio, blog teaser"
```

---

### Task 9: Blog list and single-post pages

**Files:**
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/[slug].astro`

**Interfaces:**
- Consumes: `getCollection`, `CollectionEntry` from `astro:content` (Task 4), `Layout` (Task 5), `BlogCard` (Task 7).

- [ ] **Step 1: Write the blog list page**

Create `src/pages/blog/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import Layout from '../../layouts/Layout.astro';
import BlogCard from '../../components/BlogCard.astro';
import { profile } from '../../data/profile';

const posts = (await getCollection('blog')).sort(
	(a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
);
---

<Layout title={`Blog — ${profile.name}`} description="Writing on backend engineering and distributed systems.">
	<section class="py-16">
		<h1 class="text-2xl font-bold">Blog</h1>
		<div class="mt-6 divide-y divide-slate-200 dark:divide-slate-800">
			{posts.map((post) => (
				<BlogCard id={post.id} title={post.data.title} date={post.data.date} description={post.data.description} />
			))}
		</div>
	</section>
</Layout>
```

- [ ] **Step 2: Write the single-post page**

Create `src/pages/blog/[slug].astro`:

```astro
---
import { getCollection, render, type CollectionEntry } from 'astro:content';
import Layout from '../../layouts/Layout.astro';
import { profile } from '../../data/profile';

export async function getStaticPaths() {
	const posts = await getCollection('blog');
	return posts.map((post) => ({
		params: { slug: post.id },
		props: { post },
	}));
}

interface Props {
	post: CollectionEntry<'blog'>;
}

const { post } = Astro.props;
const { Content } = await render(post);

const formattedDate = post.data.date.toLocaleDateString('en-US', {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
});
---

<Layout title={`${post.data.title} — ${profile.name}`} description={post.data.description}>
	<article class="py-16">
		<a href="/blog" class="text-sm hover:underline">&larr; Back to blog</a>
		<h1 class="mt-4 text-2xl font-bold">{post.data.title}</h1>
		<p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{formattedDate}</p>
		<div class="prose prose-slate mt-6 max-w-none dark:prose-invert">
			<Content />
		</div>
	</article>
</Layout>
```

- [ ] **Step 3: Verify build succeeds**

Run: `bun run build`
Expected: build completes and outputs `dist/blog/index.html` and `dist/blog/hello-world/index.html`.

- [ ] **Step 4: Manual check in dev server**

Run: `astro dev --background`, then confirm `/blog` lists the "Hello, World" post and `/blog/hello-world` renders its content, via `curl http://localhost:4321/blog` and `curl http://localhost:4321/blog/hello-world` grepping for the post title.
Run: `astro dev stop` when done.

- [ ] **Step 5: Commit**

```bash
git add src/pages/blog/index.astro src/pages/blog/[slug].astro
git commit -m "feat: add blog list and single-post pages"
```

---

### Task 10: Final full-site verification

**Files:** none (verification only)

- [ ] **Step 1: Full production build**

Run: `bun run build`
Expected: zero errors, `dist/` contains `index.html`, `blog/index.html`, `blog/hello-world/index.html`.

- [ ] **Step 2: Preview production build**

Run: `bun run preview` in the background (or `astro preview` if that script differs), confirm homepage, blog list, and blog post all return HTTP 200 via `curl -o /dev/null -s -w "%{http_code}\n"` for `/`, `/blog`, `/blog/hello-world`.
Stop the preview server afterward.

- [ ] **Step 3: Confirm dark mode toggle and logo swap manually**

Using `astro dev --background`, open the homepage in a browser, click the theme toggle, confirm the page background/text switch and the logo image swaps between `light_logo.png` and `dark_logo.png`. Run `astro dev stop` when done.

- [ ] **Step 4: Final commit if any fixups were needed**

If Steps 1-3 required any code changes, commit them with an appropriate `fix:` message. If no changes were needed, no commit is required for this task.

---
