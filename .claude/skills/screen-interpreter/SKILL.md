---
name: screen-interpreter
description: "Interpret any UI input — screenshot, sketch photo, Figma URL, or text brief — and produce a structured Screen Spec JSON. Use this skill whenever someone says 'interpret this screen', 'what components do I need', 'analyze this mockup', 'break down this UI', or provides an image/URL/description of a screen they want built. Also trigger when the design-orchestrator chains to this skill. This is always the FIRST step in the design-to-code pipeline."
---

# Screen Interpreter

Takes any visual or textual description of a UI screen and produces a **structured Screen Spec JSON** that downstream skills (figma-wireframer, react-implementer) can consume.

## Accepted Inputs

1. **Screenshot or sketch photo** — Use vision to identify UI regions, components, layout hierarchy, navigation patterns, and data zones
2. **Figma URL** — Use `use_figma` MCP tool to traverse the node tree, read layer names, auto-layout settings, component instances, and text content
3. **Text brief / PRD** — Parse requirements into screen zones, infer information architecture

## Process

### Step 1: Identify Screen Type

Classify the input into one of these common patterns:
- `data-management-list` — Table with CRUD actions (like Advertisers)
- `dashboard` — KPI cards + charts + summary tables
- `settings-form` — Tabbed forms with configuration options
- `wizard-flow` — Multi-step guided process
- `detail-view` — Single entity with sections
- `report` — Filters + data visualization + export

### Step 2: Zone Mapping

Break the screen into zones. Every screen has some subset of:
- `breadcrumb` — Navigation path
- `topBar` — Page header with title and actions
- `infoBanner` — Alert/notification banner
- `tabs` — Tab navigation
- `toolbar` — Filters, search, action buttons
- `dataTable` — Primary data display
- `pagination` — Table pagination
- `sidebar` — Side navigation or filters
- `modals` — Overlay dialogs triggered from the page
- `cards` — KPI or info cards
- `charts` — Data visualizations

### Step 3: Component Intent Mapping

For each zone, identify the **intent** (what it does) and the **component type** from the `@rishikeshjoshi-morpheus/ui` library:

| UI Pattern Detected | Component |
|---------------------|-----------|
| Data grid with rows/columns | `Table` (.Root .Header .Body .Row .Cell .ColumnHeader) |
| Dialog/popup overlay | `Modal` (.Root .Content .Header .Body .Footer .Title .CloseTrigger) |
| Side panel | `Drawer` (.Root .Content .Header .Body .Footer) |
| Tab navigation | `Tabs` (.Root .List .Trigger .Content) |
| Dropdown selector | `Select` (with options array) |
| Text input field | `Input` (with label, helperText, errorText props) |
| Toggle switch | `Switch` (with label prop) |
| Action button | `Button` (variant: solid/outline/ghost, colorPalette) |
| Status label | `Badge` (colorPalette, variant) |
| Info/warning banner | `Alert` (status: info/warning/error/success) |
| Navigation path | `Breadcrumb` (.Root .List .Item .Link) |
| History/activity log | `Timeline` (.Root .Item .Indicator .Connector .Content) |
| File upload area | `FileUpload` (.Dropzone .Trigger .ItemGroup) |
| Multi-step process | `Steps` (.Root .List .Item .Content .NextTrigger .PrevTrigger) |
| Checkable row | `Checkbox` (with label prop) |
| Category label | `Tag` (colorPalette, variant) |
| Page controls | `Pagination` (Root, Items, PrevTrigger, NextTrigger) |
| Empty content area | `EmptyState` (Root, Indicator, Content, Title, Description) |
| Hover info | `Tooltip` |
| Context actions | `Menu` (.Root .Trigger .Content .Item) |

### Step 4: Output Screen Spec JSON

Produce a JSON object with this structure:

```json
{
  "screenType": "data-management-list",
  "title": "Advertisers",
  "description": "Manage advertisers with CRUD, bulk upload, rules, and history",
  "zones": {
    "breadcrumb": {
      "type": "Breadcrumb",
      "items": ["Online Ad Management", "Space World"]
    },
    "infoBanner": {
      "type": "Alert",
      "status": "info",
      "text": "Edit Advertiser info..."
    },
    "toolbar": {
      "left": [{ "type": "Select", "purpose": "status-filter" }],
      "right": [
        { "type": "Button", "variant": "outline", "label": "Bulk Upload" },
        { "type": "Button", "colorPalette": "green", "label": "Create Advertiser" }
      ]
    },
    "dataTable": {
      "type": "Table",
      "columns": ["checkbox", "Advertiser ID", "Store ID", "Name", "Persona", "Spend YTD", "Spend YoY", "Rules", "Actions"],
      "features": ["row-selection", "sortable", "action-column"]
    },
    "pagination": { "type": "Pagination" }
  },
  "modals": [
    {
      "name": "AddAdvertiser",
      "trigger": "Create Advertiser button",
      "type": "Modal",
      "size": "sm",
      "fields": [
        { "type": "Input", "label": "Store(s) ID", "required": true },
        { "type": "Input", "label": "Advertiser Name", "required": true },
        { "type": "Input", "label": "Persona", "required": true }
      ]
    }
  ],
  "dataRequirements": {
    "entities": ["Advertiser"],
    "fields": ["id", "storeId", "name", "persona", "productSpendYtd", "productSpendYoY", "catalogRules", "createdAt"]
  }
}
```

### Step 5: Pass to Next Agent

Output the Screen Spec JSON and announce: "Screen Spec ready. Pass this to `figma-wireframer` to create the Figma file, or to `react-implementer` to generate code directly."

## Important Rules

- **Always use the component library names** — never say "dropdown", say `Select`. Never say "popup", say `Modal`.
- **Identify ALL modals/drawers** — these are easily missed. Look for buttons that would trigger overlays.
- **Capture data relationships** — note which fields are editable, which are display-only, which trigger actions.
- **Note compound component structure** — always specify sub-components with dot notation (Table.Row, Modal.Body).
