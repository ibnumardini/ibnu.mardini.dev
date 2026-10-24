# Project Category Badge

## Goal

Show each project's existing `category` in both the project listing and the
featured projects on the home page without adding a second card layout.

## Design

- Render the category in `ProjectCard.astro` alongside the existing tags.
- Place the category first in the flex row.
- Style the category as an accent-colored pill using
  `border-accent/40 bg-accent/20 text-slate-700` in light mode and
  `dark:border-accent/40 dark:bg-accent/10 dark:text-accent` in dark mode.
- Keep technology tags unchanged with their existing neutral slate styling.
- Preserve wrapping behavior on narrow screens.

Both pages already share `ProjectCard.astro`, so the change applies consistently
to all projects and featured projects without changes to the page data flow.

## Validation

- Run `bunx astro check` and `bun run build`.
- Confirm the category is first in every card and remains readable in light and
  dark themes.
- Do not commit changes.
