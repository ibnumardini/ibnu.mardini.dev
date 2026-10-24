# Project Category Filter

## Goal

Allow visitors to filter the projects page by clicking the existing category
pill in a project card, showing only projects in that category and restoring
all projects when the active category is clicked again.

## Design

- Keep filtering scoped to `src/pages/projects.astro`; featured projects on the
  home page remain unchanged.
- Generate a unique list of categories from `profile.projects` and render an
  `All` button above the project grid.
- Add `data-project-category` to each project card wrapper.
- Add an optional `filterable` prop to `ProjectCard`; when enabled on the
  projects page, render the category pill as a native button with
  `data-project-filter-category`. Keep it a non-interactive span elsewhere.
- Use a small client-side script to toggle card visibility without navigation
  or dependencies.
- Mark the selected filter with the existing accent styling and
  `aria-pressed="true"`; use `aria-pressed="false"` for inactive controls.
- Group controls with an accessible label and preserve visible keyboard focus.
- Clicking the active category resets the view to all projects and activates
  `All`.
- Set the card wrapper's `hidden` property for filtered cards so they leave the
  layout and accessibility tree.

## Validation

- Run `bunx astro check`.
- Run `bun run build`.
- Verify every category in the data (`Library`, `Web App`, `API`, `CLI App`, and
  `Chrome Extension`) filters correctly, and clicking the active category or
  `All` restores the complete list.
- Do not commit changes.
