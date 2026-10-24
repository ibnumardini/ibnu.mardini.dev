# Project Type Filter Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rename project categories to types and replace the projects-page pill filter row with an accessible `Filter by type` dropdown while preserving clickable type pills in cards.

**Architecture:** Rename only the project model field and its project consumers from `category` to `type`; leave unrelated skill-group categories unchanged. Use a native labeled select on `/projects`, exact type values, and a shared client-side filtering function that also handles clickable card type pills.

**Tech Stack:** Astro 7, Tailwind CSS 4, TypeScript, Bun, browser DOM APIs.

---

## Chunk 1: Rename project category data to type

**Files:**
- Modify: `src/data/profile.ts`
- Modify: `src/components/ProjectCard.astro`

- [ ] **Step 1: Rename the `Project` interface field**

Change only `Project.category` to `Project.type` in `src/data/profile.ts`. Do not
rename `SkillGroup.category` or any other unrelated category field.

- [ ] **Step 2: Rename project record properties**

Rename the `category` property to `type` for all records in `profile.projects`,
preserving their existing values and order.

- [ ] **Step 3: Update ProjectCard project consumers**

Update `ProjectCard.astro` to read `type` from the project props, emit
`data-project-type={type}`, and render the type pill from `{type}`. Keep the
optional `filterable` behavior and ensure non-filterable cards still render a
plain span.

## Chunk 2: Replace button filters with the type dropdown

**Files:**
- Modify: `src/pages/projects.astro`

- [ ] **Step 1: Derive unique project types**

Create `types` from `profile.projects.map((project) => project.type)` using
`Set`, preserving first-seen order.

- [ ] **Step 2: Render the accessible filter control**

Replace the filter button group with:

```astro
<div class="mt-6 flex items-center gap-3">
	<label for="project-type-filter" class="text-sm font-semibold">Filter by type</label>
	<select id="project-type-filter" class="...focus-visible:outline-accent">
		<option value="">All types</option>
		{types.map((type) => <option value={type}>{type}</option>)}
	</select>
</div>
```

Use the repository's slate/accent light and dark styling patterns and preserve
visible focus styling.

- [ ] **Step 3: Pass filterable mode to project cards**

Render the project grid with `data-project-grid` and pass `filterable` to every
`ProjectCard`. Keep the home page calls unchanged so its type pills remain
non-interactive.

## Chunk 3: Update client-side filtering

**Files:**
- Modify: `src/pages/projects.astro`

- [ ] **Step 1: Scope DOM queries**

Query `#project-type-filter`, `[data-project-grid]`, its
`[data-project-card]` descendants, and its
`[data-project-filter-type]` buttons only.

- [ ] **Step 2: Implement exact type filtering**

On select change, set each card's `hidden` property to whether its
`data-project-type` differs from the selected non-empty value. An empty value
shows all cards.

- [ ] **Step 3: Connect card type pills**

On a card type-pill click, set the select value to that pill's exact type and
apply the same filtering function. Prevent default button behavior only as
needed; do not affect gallery or external-link controls.

## Chunk 4: Validate and preserve the no-commit requirement

**Files:**
- No additional files.

- [ ] **Step 1: Run Astro diagnostics**

Run `bunx astro check`.

Expected: 0 errors; unrelated existing deprecation warnings may remain.

- [ ] **Step 2: Run the production build**

Run `bun run build`.

Expected: production build completes successfully.

- [ ] **Step 3: Verify every dropdown option**

In `/projects`, verify `All types`, `Library`, `Web App`, `API`, `CLI App`, and
`Chrome Extension`. Confirm exact card counts, reset behavior, and that filtered
cards have `hidden`.

- [ ] **Step 4: Verify card-pill shortcut and accessibility**

Click a card type pill and confirm the select updates and filters. Verify the
label is associated with the select, keyboard focus is visible, and the home
page type pills remain non-interactive.

- [ ] **Step 5: Verify worktree status**

Run `git status --short` and confirm changes are uncommitted. Do not run
`git commit`.
