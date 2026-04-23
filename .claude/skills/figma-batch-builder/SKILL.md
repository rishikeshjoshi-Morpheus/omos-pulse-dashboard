---
name: figma-batch-builder
description: "End-to-end pipeline that converts a Figma URL (section or page, max 10-15 screens) into fully wired React pages. Use this skill whenever someone says 'build this Figma section', 'implement these screens from Figma', 'here is the Figma link build it', or shares a Figma URL and expects production React code. This skill chains screen-interpreter → react-implementer → app-wirer automatically. The user only needs to share the Figma URL."
---

# Figma Batch Builder

One command turns a Figma URL into production React pages, wired into the app and verified with a build check.

**User input:** A Figma URL pointing to a page or named section (max 10–15 screens recommended).  
**Output:** Working React components in `src/components/`, routes in `App.jsx`, nav items in `LeftNav.jsx`, clean build.

---

## Phase 0 — Pre-flight

Before touching any code, read the knowledge graph so you know exactly what already exists:

```
.claude/skills/figma-batch-builder/knowledge-graph.md
```

This tells you:
- Every nav ID already wired in LeftNav.jsx
- Every `case` already in App.jsx
- Every component file already in `src/components/`
- Which screen type templates to use for fast implementation

**Never build a page that already exists.** If the Figma screen matches an existing nav ID, skip it and report it as already done.

---

## Phase 1 — Enumerate Screens

Use the Figma MCP tool to traverse the target URL:

```
mcp__ddfd2dfc-29f3-47b3-a66a-050992a7326d__use_figma
```

Extract from each top-level frame:
1. **Screen title** — the frame name verbatim (e.g. "Admin User", "Attribution Overrides")
2. **Breadcrumb path** — text nodes that read like "Control Center > User Access Management"
3. **Screen type** — classify using the taxonomy below
4. **Nav section** — which LeftNav group this belongs to

### Screen Type Taxonomy

| Type | Signals | Template |
|------|---------|----------|
| `upload-page` | Dashed dropzone + "How it works?" card + xlsx filename in banner | `TEMPLATE_UPLOAD` |
| `user-table` | Name / Email / Access Role columns + "Add New User" button | `TEMPLATE_USER_TABLE` |
| `permission-matrix` | Feature rows × Persona/Role columns with checkboxes side-by-side | `TEMPLATE_PERMISSION_MATRIX` |
| `data-management-list` | Table with CRUD: status badge + many columns + create drawer | `TEMPLATE_DATA_TABLE` |
| `log-viewer` | Timestamp / Event Type / Device ID columns + Log Tracker input zone | `TEMPLATE_LOG_VIEWER` |
| `dashboard` | KPI stat cards + charts + summary tables | `TEMPLATE_DASHBOARD` |
| `settings-form` | Tabbed form sections with config toggles/inputs | `TEMPLATE_SETTINGS_FORM` |

Stop at 15 screens. If there are more, list the extras and tell the user to share a more focused URL.

---

## Phase 2 — Extract Verbatim Content

For each screen, run the verbatim extraction checklist (from screen-interpreter rules):

- [ ] All table column headers — exact text
- [ ] All table row labels (for matrices) — exact text
- [ ] All button labels — exact wording
- [ ] All modal/drawer field labels — exact wording
- [ ] All placeholder text — exact wording
- [ ] Sample data rows — as many as visible in the frame
- [ ] Breadcrumb path — full hierarchy

**⛔ NEVER invent content.** If a text node is unreadable, mark it `[UNREADABLE]` and report it to the user before proceeding.

---

## Phase 3 — Determine Nav Wiring

For each screen, resolve:

1. **Nav ID** — match against the knowledge graph's `nav-ids` registry. If the screen's title fuzzy-matches an existing nav item label, use that ID. If no match, derive a slug: lowercase, hyphens, e.g. "Admin User" → `admin-user`.

2. **LeftNav group** — read from the breadcrumb. "Control Center > User Access Management" → group `User Access Management` in the `control-center` section.

3. **TopBar props** — `section` = first breadcrumb segment, `page` = screen title.

4. **App.jsx case key** — the nav ID.

Check the knowledge graph's `wired-pages` list. If the nav ID is already there → **skip, report as already done**.

---

## Phase 4 — Implement Components

For each screen (process up to 3 in parallel using Agent tool):

### Style Rules (non-negotiable for this codebase)
- **Only** hand-rolled inline styles — NO `@rishikeshjoshi-morpheus/ui`, NO Chakra, NO external component libraries
- CSS vars: `var(--osmos-border)`, `var(--osmos-fg)`, `var(--osmos-fg-muted)`, `var(--osmos-fg-subtle)`, `var(--osmos-bg-subtle)`, `var(--osmos-brand-primary)`, `var(--osmos-brand-primary-muted)`
- Font: `'Open Sans', sans-serif`
- Only `React` and `useState`/`useRef`/`useEffect` — no other dependencies
- For charts: `recharts` is allowed

### Template Patterns

#### TEMPLATE_UPLOAD
```jsx
// Info banner: file icon + filename.xlsx + description + "Download file for all advertisers" link (right)
// "Upload Your File" section label
// Dashed-border dropzone: upload circle icon + "Drag and drop or Upload your .xlsx file here"
//   → hidden <input type="file" accept=".xlsx" ref={fileRef} onChange={handleFile} />
// "How it works?" card (gray bg, half width): icon + title + bullet lines
// Toast on file select: "File uploaded successfully"
```

#### TEMPLATE_USER_TABLE
```jsx
// Top bar: "🔄 Change Log" blue link (left) | search input + "＋ Add New User" button (right)
// [Optional] "Select Advertiser:" label + styled select (shown in Advertiser User page)
// Table: Name (sortable) | Email | Access Role (truncated + ▾ chevron) | delete icon
// "Add New User" modal: Name input, Email input, Access Role select (Administrator/Viewer/Editor)
// Delete row → confirm + remove from state + toast
// Search filters by name case-insensitively
```

#### TEMPLATE_PERMISSION_MATRIX
```jsx
// Toolbar: tab group (left) + search input + Change Log button (right)
// Single wide table — feature rows × persona columns ALL VISIBLE SIMULTANEOUSLY (NOT tabs)
// Sticky first column (Feature label, min 320px) | persona cols 90px each, centered
// Group header rows between feature groups (e.g. "App Level Config", "Performance Dashboard")
// Custom checkbox: 16×16 div, brand-primary fill when checked, white SVG checkmark
// Footer: Save button → toast "Configuration saved successfully"
```

#### TEMPLATE_DATA_TABLE
```jsx
// Toolbar: count badge + search + action buttons (primary + outline)
// Table: Status badge | many data columns | action icons (edit/delete/view)
// Create/Edit right drawer (480px): multi-step or single form
// Pagination: prev/next + page count display
// Status badges: Active=green, Inactive=gray, Paused=orange
```

#### TEMPLATE_LOG_VIEWER
```jsx
// Zone 1: Log Tracker — labeled input + Add button + Start Logging primary button + helper text
// Zone 2: Event Log table — Event Timestamp | Field | Event Type | Device ID | Request ID | Logs
// Tab toggle: All Events / Errors / Warnings
// Event Type badge colors: info=blue, error=red, warning=orange
// "View" link in Logs column → toast with log details
```

### Component File Rules
- One `.jsx` file per screen in `src/components/`
- Filename: PascalCase matching the page title, suffix `Page` — e.g. `AdminUserPage.jsx`
- Default export: the page function
- All mock data as constants at the top of the file
- No props — all state is internal

---

## Phase 5 — Wire Into App

Edit `src/App.jsx`:

```jsx
// 1. Add import at the top (with other imports):
import NewPageComponent from './components/NewPageComponent';

// 2. Add case in renderPage() switch:
case 'nav-id':
  return (
    <>
      <TopBar section="Section Name" page="Page Title" onNavigate={setActivePage} />
      <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
        <NewPageComponent />
      </main>
    </>
  );
```

If the nav ID already has a case → skip (do not overwrite).

---

## Phase 6 — Wire Into LeftNav

Edit `src/components/LeftNav.jsx` — add to the correct section's `items` array:

```js
{ id: 'nav-id', label: 'Page Title', group: 'Group Name' },
```

Match the section by the breadcrumb's first segment:
- "Control Center" → `control-center` section
- "Analytics" → `analytics` section
- "Finance" → `finance` section
- "Health" → `health` section

Place the new item in the correct group, near other items with the same group label.

If the nav ID already exists in LeftNav → skip.

---

## Phase 7 — Build Verification

```bash
cd "/Users/rishikeshjoshi/OMOS TEST" && npx vite build --mode development 2>&1 | tail -20
```

- ✅ "built in Xms" with no errors → success
- ❌ Import errors → fix the offending import and rebuild
- ❌ JSX syntax errors → fix and rebuild

---

## Phase 8 — Update Knowledge Graph

After a successful build, append the newly wired pages to the knowledge graph:

```
.claude/skills/figma-batch-builder/knowledge-graph.md
```

Add each new page to the `wired-pages` registry and update `nav-ids` with any new IDs.

---

## Reporting Format

After completing all phases, report to the user:

```
## Build Complete — X screens added

| Screen | Component | Nav ID | Status |
|--------|-----------|--------|--------|
| Admin User | AdminUserPage.jsx | admin-user | ✅ Built |
| Attribution Overrides | AttributionOverridesPage.jsx | attribution-overrides | ✅ Built |
| Wallet Rules | — | wallet-rules | ⏭ Already existed |

Build: ✅ Clean (2741 modules, 0 errors)
```

---

## Error Handling

| Situation | Action |
|-----------|--------|
| Figma node unreadable | Mark `[UNREADABLE]`, skip that screen, report to user |
| Screen matches existing page | Skip, report as "already exists" |
| Build error after wiring | Show the error, auto-fix if it's a missing import, otherwise report |
| More than 15 screens in URL | Process first 15, list the rest for user to decide |
| Ambiguous nav ID | Use the exact frame name, slugified — don't guess |
