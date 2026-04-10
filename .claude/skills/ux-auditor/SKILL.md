---
name: ux-auditor
description: "Run a structured UX audit on any screen — screenshot, Figma URL, or React code — using Peter Morville's UX Honeycomb, tailored to Osmos's retail media domain. Use this skill whenever someone says 'audit this screen', 'check the UX', 'review this for usability', 'is this good enough', 'UX review', 'accessibility check', 'design review', or when the design-orchestrator chains to this skill. Also trigger when someone asks about 'honeycomb', 'usability score', or 'UX quality'. Produces a scored report with specific fix recommendations."
---

# UX Auditor

Evaluates any screen against the **UX Honeycomb** framework, customized for Osmos's retail media platform. Produces a scored report with actionable fixes.

## Accepted Inputs

- Screenshot or photo of a screen
- Figma URL (read via `use_figma` MCP)
- React component code (read directly)
- Screen Spec JSON (from screen-interpreter)

## The Osmos UX Honeycomb

Seven dimensions, weighted for retail media workflows:

### 1. USEFUL (Weight: 20%)

**Question:** Does this screen directly serve a retail media workflow?

**Osmos-specific criteria:**
- Does it support a core task? (campaign setup, yield optimization, advertiser management, reporting, onboarding)
- Would an ad ops manager reach for this screen daily?
- Does it reduce a multi-tool workflow to a single-screen action?
- Is there data on this screen that drives revenue decisions?

**Scoring:**
- **A:** Core workflow screen, used daily, directly tied to revenue
- **B:** Supporting screen, used weekly, indirectly tied to revenue
- **C:** Administrative screen, low frequency, no clear revenue tie
- **D:** Unclear purpose or duplicates another screen's function

### 2. USABLE (Weight: 20%)

**Question:** Can the user complete the primary task efficiently?

**Osmos-specific criteria:**
- Primary action achievable in ≤ 3 clicks from the screen
- Bulk actions supported where table has > 5 rows
- Search/filter available on data tables
- Forms have sensible defaults and inline validation
- Loading states and error states are handled
- Destructive actions require confirmation

**Scoring:**
- **A:** Primary task in 1-2 clicks, bulk actions present, smart defaults
- **B:** Primary task in 3 clicks, search available, reasonable flow
- **C:** 4+ clicks, missing bulk actions or search, weak defaults
- **D:** Confusing flow, no clear primary action, error-prone

### 3. DESIRABLE (Weight: 10%)

**Question:** Does it feel like a premium SaaS tool?

**Osmos-specific criteria:**
- Consistent with Osmos brand tokens (navy, blue-violet, mint accents)
- Uses Montserrat for headings, Lato for body
- Card-based layout with 10px border-radius
- No visual clutter — clean information hierarchy
- Professional data presentation (formatted numbers, proper alignment)
- Success states use illustrations or clear feedback

**Scoring:**
- **A:** Fully on-brand, premium feel, delightful micro-interactions
- **B:** Mostly on-brand, clean but missing polish
- **C:** Generic styling, not distinctly Osmos
- **D:** Off-brand, cluttered, or dated appearance

### 4. FINDABLE (Weight: 15%)

**Question:** Can the user locate this screen and navigate within it?

**Osmos-specific criteria:**
- Accessible from sidebar nav within 2 levels
- Breadcrumb trail present and accurate
- Tab structure if screen has multiple sections
- Related actions are co-located (not scattered across menus)
- Back navigation is predictable

**Scoring:**
- **A:** Clear nav path, breadcrumbs, logical tab structure
- **B:** Nav path exists but could be more intuitive
- **C:** Buried in nav, missing breadcrumbs
- **D:** No clear path to reach this screen

### 5. ACCESSIBLE (Weight: 15%)

**Question:** Can all users interact with this screen?

**Criteria (WCAG 2.1 AA):**
- Color contrast ≥ 4.5:1 for normal text, ≥ 3:1 for large text
- All interactive elements keyboard-accessible
- Focus indicators visible (2-4px)
- `aria-label` on icon-only buttons
- Form fields have associated labels (not placeholder-only)
- Tables have proper header scope
- Images have alt text
- No information conveyed by color alone

**Scoring:**
- **A:** Full WCAG 2.1 AA compliance
- **B:** Minor issues (missing 1-2 aria labels, one contrast issue)
- **C:** Multiple issues (poor keyboard nav, missing labels)
- **D:** Major barriers (no keyboard access, critical contrast failures)

### 6. CREDIBLE (Weight: 10%)

**Question:** Does the data presentation inspire trust?

**Osmos-specific criteria:**
- Metrics have clear labels and units
- Data has timestamps or "last updated" indicators
- Numbers are formatted consistently (commas, currency symbols)
- Empty states are handled gracefully (not blank rows)
- Change history / audit trail available for critical data
- Source attribution where data comes from external systems

**Scoring:**
- **A:** All data sourced, timestamped, consistently formatted
- **B:** Mostly clean, minor formatting inconsistencies
- **C:** Missing timestamps, inconsistent formats
- **D:** Unlabeled metrics, no data provenance

### 7. VALUABLE (Weight: 10%)

**Question:** Does this screen contribute to breaking the M%G ceiling?

**Osmos-specific criteria:**
- Can this screen's actions be tied to ad revenue uplift?
- Does it reduce time-to-launch for campaigns?
- Does it increase advertiser self-service capability?
- Does it improve yield optimization (CPM, fill rate, sell-through)?
- Would removing this screen slow down M%G growth?

Read the `osmos-pmm` skill's knowledge on the ceiling-break narrative for context.

**Scoring:**
- **A:** Directly tied to M%G uplift, measurable revenue impact
- **B:** Supports operational efficiency that enables revenue
- **C:** Administrative utility, indirect value
- **D:** Unclear business value

## Output Format

Produce a structured audit report:

```
## UX Audit Report: [Screen Name]

### Overall Score: [A/B/C/D] ([weighted average]%)

| Dimension | Weight | Score | Key Finding |
|-----------|--------|-------|-------------|
| Useful    | 20%    | A     | Core advertiser management workflow |
| Usable    | 20%    | B     | Bulk upload is 3+ steps |
| Desirable | 10%    | B     | Brand tokens applied but table needs polish |
| Findable  | 15%    | A     | Clear breadcrumb, sidebar nav path |
| Accessible| 15%    | C     | Missing aria-labels on table rows |
| Credible  | 10%    | B     | Timestamps present, needs "last synced" |
| Valuable  | 10%    | A     | Directly upstream of campaign revenue |

### Fix Recommendations (Priority Order)

1. **[ACCESSIBILITY]** Add aria-label to all table row checkboxes: `aria-label="Select {advertiserName}"`
2. **[USABILITY]** Simplify bulk upload to single-step drag-drop with auto-detect
3. **[CREDIBILITY]** Add "Last synced: X minutes ago" to table footer
...

### Flow Improvements

- Consider: inline editing for Advertiser Name instead of modal
- Consider: batch rule creation from the table (select rows → "Apply Rule")

### Business Alignment Score: [A/B/C/D]
[How this screen connects to the Osmos ceiling-break narrative]
```

## Process

1. Receive the input (screenshot, code, Figma URL, or Screen Spec)
2. For each dimension, evaluate against the criteria above
3. Assign scores (A/B/C/D)
4. Generate specific, actionable fix recommendations
5. Prioritize fixes by impact (accessibility first, then usability, then polish)
6. Output the structured audit report

## Important Rules

- **Be specific** — "Add aria-label to row checkboxes" not "improve accessibility"
- **Include code patches** — show the exact code change when auditing React code
- **Score honestly** — don't inflate scores. A 'C' is useful feedback.
- **Connect to business value** — every recommendation should explain WHY it matters for retail media
- **Reference the osmos-brand skill** for visual consistency checks
- **Reference the design-skill** for the 99 UX guidelines
