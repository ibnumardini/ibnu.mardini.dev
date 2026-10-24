# Project Category Filter Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let visitors filter `/projects` by clicking a project category pill, with a toggle back to all projects.

**Architecture:** Reuse `ProjectCard.astro` for the category pill and add an optional `filterable` prop so only cards on `/projects` become filter controls. `projects.astro` owns the category buttons and a small client-side script that uses `data-project-category` and the `hidden` property; the home page remains unchanged.

**Tech Stack:** Astro 7, Tailwind CSS 4, TypeScript, Bun, browser DOM APIs.

---

## Chunk 1: Make project category pills filterable

**Files:**
- Modify: `src/components/ProjectCard.astro`
- Modify: `src/pages/projects.astro`
- Test: Browser validation on `/projects`; no existing component-test suite.

- [ ] **Step 1: Add an optional filterable prop**

In `src/components/ProjectCard.astro`, extend the props type with
`type Props = Project & { filterable?: boolean };`, destructure `filterable`,
and keep the default behavior non-interactive for the home page.

- [ ] **Step 2: Render the category as a filter button when enabled**

When `filterable` is true, render the category pill as:

```astro
<button
	type="button"
	data-project-filter-category={category}
	aria-pressed="false"
	class="rounded-full border border-accent/40 bg-accent/20 px-2 py-0.5 text-xs text-slate-700 transition-colors hover:bg-accent/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:border-accent/40 dark:bg-accent/10 dark:text-accent dark:hover:bg-accent/20"
>
	{category}
</button>
```

Keep the existing non-interactive accent `<span>` for cards where
`filterable` is false.

- [ ] **Step 3: Add filter controls to the projects page**

In `src/pages/projects.astro`, derive unique categories from
`profile.projects`, render a `data-project-filters` container with
`role="group"` and `aria-label="Filter projects by category"` containing an
`All` button marked `data-project-filter-all` and `aria-pressed="true"`, plus
category controls marked `data-project-filter`. Wrap the cards in a
`data-project-grid` container and pass `filterable={true}` to every
`ProjectCard`.

- [ ] **Step 4: Add category metadata to each card**

Add `data-project-category={category}` to the outer card element in
`ProjectCard.astro`, and mark that element with `data-project-card`, allowing
the page script to identify matching cards without selecting filter controls.

- [ ] **Step 5: Implement the client-side toggle**

Add a page script that:

1. Queries only `[data-project-filters]`, its
   `[data-project-filter-all]` and `[data-project-filter]` descendants, and
   `[data-project-card]` descendants of `[data-project-grid]`.
2. Also queries `[data-project-filter-category]` buttons inside cards and
   routes their clicks through the same category-filter handler.
3. On a category filter click, sets each card's `hidden` property to whether
   its `data-project-category` matches the selected category.
4. On the active category click, resets all cards to visible and activates
   `All`.
5. Updates only the filter buttons and card category buttons' `aria-pressed`
   values and active accent styling.

Use native buttons and the `hidden` property so filtered cards leave both the
   layout and accessibility tree.

- [ ] **Step 6: Run Astro diagnostics**

Run:

```bash
bunx astro check
```

Expected: 0 errors. Existing unrelated deprecation warnings may remain.

- [ ] **Step 7: Run the production build**

Run:

```bash
bun run build
```

Expected: production build completes successfully.

- [ ] **Step 8: Verify every category in the browser**

Open `/projects` and verify `Library`, `Web App`, `API`, `CLI App`, and
`Chrome Extension` each show only matching cards. Verify clicking the active
category or `All` restores every card, and verify keyboard focus/pressed state.
Confirm the home page featured cards retain non-interactive category pills.

- [ ] **Step 9: Verify no commit**

Run:

```bash
git status --short
git diff -- src/components/ProjectCard.astro src/pages/projects.astro
```

Expected: implementation changes remain uncommitted; do not run `git commit`.
