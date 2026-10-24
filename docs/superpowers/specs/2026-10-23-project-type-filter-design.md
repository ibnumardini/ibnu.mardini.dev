# Project Type Filter

This specification supersedes
`2026-10-23-project-category-filter-design.md`: the approved filter interaction
is changed from a row of category buttons to a native type dropdown, while the
clickable card-pill shortcut remains.

## Goal

Use the term `type` consistently for projects and replace the category-pill
filter controls with an intuitive `Filter by type` native dropdown.

## Design

- Rename only `Project.category` to `Project.type`, the `category` property on
  project records, and the project consumers in `ProjectCard.astro` and
  `projects.astro`. Unrelated `category` fields such as skill-group
  categories remain unchanged.
- Keep the type pill first in each project card.
- Keep the type pill clickable on the projects page as a shortcut to filtering;
  cards rendered elsewhere keep a non-interactive pill.
- Replace the top filter button group on `/projects` with a visible
  `<label for="project-type-filter">Filter by type</label>` and a native
  `<select id="project-type-filter">`.
- Use the empty string `""` as the reset option value with visible text
  `All types`; use each exact project type string as the value for its option.
  Preserve first-seen order from `profile.projects`.
- Selecting a type hides cards whose `data-project-type` does not exactly match.
- Selecting the empty reset value shows every card.
- Clicking a card type pill updates the select and applies the same filter.
- Keep the existing client-side, no-reload behavior and use the `hidden`
  property for filtered cards.
- Use accessible labeling for the select and preserve visible focus styling.

## Validation

- Run `bunx astro check`.
- Run `bun run build`.
- Verify every option (`All types`, `Library`, `Web App`, `API`, `CLI App`, and
  `Chrome Extension`) in the browser.
- Verify a card type pill updates the select and filtering, and `All types`
  restores all cards.
- Verify keyboard focus and selection, the label/select association, and the
  `hidden` state of filtered cards.
- Verify the home page uses non-interactive type pills.
- Do not commit changes.
