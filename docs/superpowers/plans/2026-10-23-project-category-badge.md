# Project Category Badge Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Display each project's category as the first accent-colored pill alongside its existing technology tags.

**Architecture:** Reuse the shared `ProjectCard.astro` component so the category appears consistently on the projects page and the home page's featured projects. Keep the existing required `Project.category` data and neutral tag styling unchanged; only extend the tag row with a category badge.

**Tech Stack:** Astro 7, Tailwind CSS 4, TypeScript, Bun.

---

## Chunk 1: Add the category badge

**Files:**
- Modify: `src/components/ProjectCard.astro:8,48-58`
- Test: validation commands only; this Astro component has no existing component-test suite.

- [ ] **Step 1: Include `category` in the component props**

Update the destructured props in `src/components/ProjectCard.astro` to include the existing `category` field from `Project`.

- [ ] **Step 2: Render the category before the technology tags**

Inside the existing `mt-3 flex flex-wrap gap-2` container, render one category `<span>` before `tags.map`. Use:

```text
rounded-full border border-accent/40 bg-accent/20 px-2 py-0.5 text-xs text-slate-700 dark:border-accent/40 dark:bg-accent/10 dark:text-accent
```

Keep the existing tag span classes unchanged.

- [ ] **Step 3: Run focused validation**

Run `bunx astro check`.

Expected: Astro check completes successfully with 0 errors.

- [ ] **Step 4: Run the production build**

Run `bun run build`.

Expected: Astro production build completes successfully.

- [ ] **Step 5: Verify the visual result**

Open the local site and inspect both the home page's Featured Projects section
and the `/projects` page in light and dark themes.

Expected: every category badge appears before the technology tags, uses the
accent styling, and remains readable in both themes.

- [ ] **Step 6: Verify the worktree and preserve the no-commit requirement**

Run `git status --short` and
`git diff -- src/components/ProjectCard.astro`.

Expected: the component is modified and the plan/spec are untracked or modified
as expected; no commit is created.
