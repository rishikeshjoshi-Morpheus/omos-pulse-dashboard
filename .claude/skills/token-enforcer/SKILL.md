---
name: token-enforcer
description: "Audit any JSX, CSS, or TSX file (or the whole codebase) for hardcoded design values — hex colors, rgba strings, px sizes, font sizes — and replace them with the correct Osmos design tokens. Trigger this skill when someone says 'check my tokens', 'are we using variables', 'token audit', 'design system compliance', 'replace hardcoded colors', 'fix my tokens', 'enforce tokens', 'scan for hardcoded values', or 'are we using our CSS variables'. Also run automatically before committing any new UI page or component."
---

# Token Enforcer

Scans JSX/TSX/CSS files for hardcoded design values and produces exact replacement suggestions using the Osmos token system.

## Token Inventory

### Brand tokens (defined in `src/index.css` `:root`)

| Token | Value | Use for |
|---|---|---|
| `var(--osmos-brand-primary)` | `#636CFF` | Primary actions, active links, chart line 1 |
| `var(--osmos-brand-primary-muted)` | `rgba(99,108,255,0.12)` | Primary badge backgrounds |
| `var(--osmos-brand-green)` | `#1BA87A` | Positive KPIs, success states |
| `var(--osmos-brand-green-muted)` | `rgba(27,168,122,0.10)` | Positive badge backgrounds |
| `var(--osmos-brand-amber)` | `#F5A623` | Secondary chart line, warnings |
| `var(--osmos-nav-bg)` | `#1e2266` | Left navigation background |
| `var(--osmos-nav-panel-bg)` | `#212563` | Left nav sub-panel background |
| `var(--osmos-nav-accent)` | `#7B82F8` | Active nav item color, nav icons |
| `var(--osmos-nav-border)` | `rgba(123,130,248,0.25)` | Nav dividers |
| `var(--osmos-nav-active-bg)` | `rgba(123,130,248,0.20)` | Nav active item background |

### Semantic tokens (from `@rishikeshjoshi-morpheus/ui/tokens.css`)

| Token | Use for |
|---|---|
| `var(--osmos-bg)` | White/light surface (card, page bg in dark mode) |
| `var(--osmos-bg-subtle)` | Page background (light gray in light mode) |
| `var(--osmos-bg-muted)` | Table header, subtle fills |
| `var(--osmos-fg)` | Primary text |
| `var(--osmos-fg-muted)` | Secondary text |
| `var(--osmos-fg-subtle)` | Tertiary text, placeholders |
| `var(--osmos-border)` | All borders and dividers |

### Chakra prop equivalents (for files using `@rishikeshjoshi-morpheus/ui`)

When a file imports from the UI library and uses Chakra-style props, use token names directly without `var()`:

| Inline style value | Chakra prop replacement |
|---|---|
| `background: 'var(--osmos-bg)'` | `bg="bg"` |
| `background: 'var(--osmos-bg-subtle)'` | `bg="bg.subtle"` |
| `background: 'var(--osmos-bg-muted)'` | `bg="bg.muted"` |
| `color: 'var(--osmos-fg)'` | `color="fg"` |
| `color: 'var(--osmos-fg-muted)'` | `color="fg.muted"` |
| `color: 'var(--osmos-fg-subtle)'` | `color="fg.subtle"` |
| `border: '1px solid var(--osmos-border)'` | `border="1px solid" borderColor="border"` |

### Intentional exceptions (do NOT replace)

These hardcoded values are intentional and should never be flagged:

- `#EF4444` / `#22C55E` — semantic red/green for metric delta arrows (positive/negative)
- Heatmap cell intensities (inline computed background in heatmap grid)
- Chart dot colors that match their line's brand token (they reference the token already)
- `#fff` inside SVG `fill` or `stroke` attributes for icon rendering
- Values already using `var(--osmos-*)` tokens

## Audit Process

### Step 1 — Discover

Grep the target file(s) for:
```
#[0-9a-fA-F]{3,8}           # hex colors
rgba?\([^)]+\)               # rgb/rgba colors
font-size:\s*\d+px           # hardcoded font sizes
padding:\s*\d+px             # hardcoded padding
margin:\s*\d+px              # hardcoded margins
```

Run: `grep -rn --include="*.jsx" --include="*.tsx" --include="*.css" -E "(#[0-9a-fA-F]{6}|rgba?\()" src/`

### Step 2 — Triage

For each match, classify:
- **Tier 1 (Replace now)**: Color/value has a direct semantic token mapping
- **Tier 2 (Replace with brand token)**: Brand color with a `--osmos-brand-*` match
- **Tier 3 (Intentional exception)**: Heatmap, delta arrows, SVG fills — note it and skip
- **Tier 4 (Unknown)**: Color not in the token inventory — surface to user for decision

### Step 3 — Report

Produce a table:

| File | Line | Hardcoded Value | Replacement | Tier |
|---|---|---|---|---|
| `StatCards.jsx` | 56 | `#22C55E` | intentional (positive delta) | 3 |
| `TopBar.jsx` | 122 | `#E53E3E` | `var(--osmos-brand-primary)` | 1 |

### Step 4 — Apply

For all Tier 1 and Tier 2 items, use the Edit tool to apply replacements.
For Tier 4 items, ask the user which token to use before replacing.

## Output Format

```
## Token Audit Report

**Files scanned:** N
**Violations found:** X (Tier 1: A, Tier 2: B, Tier 3: C intentional, Tier 4: D unknown)

### Tier 1 — Applied ✅
[table of replacements made]

### Tier 2 — Applied ✅
[table of brand token replacements made]

### Tier 3 — Intentional (skipped) ℹ️
[list of exceptions with reason]

### Tier 4 — Needs decision ❓
[list of unknown values requiring user input]

**All replacements applied. Codebase is token-compliant.**
```
