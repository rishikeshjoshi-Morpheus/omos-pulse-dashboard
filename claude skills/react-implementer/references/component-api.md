# @rishikeshjoshi-morpheus/ui — Component API Reference

108 components built on Chakra UI 3.33. All imported from `@rishikeshjoshi-morpheus/ui`.

## Import Pattern

```jsx
import { ComponentName } from '@rishikeshjoshi-morpheus/ui';
import '@rishikeshjoshi-morpheus/ui/tokens.css'; // in entry point only
```

---

## ⚠️ CRITICAL: `.Root` Rules — Read Before Writing Any Compound Component

There are TWO patterns in this library. Getting this wrong causes a silent runtime crash ("Element type is invalid: got undefined").

### Pattern A — Component IS the root (NO `.Root` sub-key)
Use `<ComponentName ...>` directly as the wrapper. These components do NOT have a `.Root` property:

| Component | Correct root tag | Sub-components available |
|-----------|-----------------|--------------------------|
| `Table`   | `<Table size="sm">` | `.Header` `.Body` `.Row` `.Cell` `.ColumnHeader` `.Caption` `.ScrollArea` |
| `Tabs`    | `<Tabs defaultValue="x">` | `.List` `.Trigger` `.Content` `.ContentGroup` `.Indicator` |
| `Timeline`| `<Timeline>` | `.Item` `.Connector` `.Separator` `.Indicator` `.Content` `.Title` `.Description` |
| `Modal`   | `<Modal open={open} onOpenChange={...}>` | `.Content` `.Header` `.Body` `.Footer` `.Title` `.Description` `.CloseTrigger` `.ActionTrigger` |
| `Drawer`  | `<Drawer open={open} onOpenChange={...} placement="end">` | `.Content` `.Header` `.Body` `.Footer` `.Title` `.Description` `.CloseTrigger` `.ActionTrigger` |
| `Menu`    | `<Menu>` | `.Trigger` `.Content` `.Item` `.ItemGroup` `.ItemGroupLabel` `.Separator` `.ItemCommand` `.CheckboxItem` `.RadioItemGroup` `.RadioItem` `.ContextTrigger` `.TriggerItem` |
| `Card`    | `<Card>` | `.Header` `.Body` `.Footer` `.Title` `.Description` |
| `Accordion`| `<Accordion>` | `.Item` `.ItemTrigger` `.ItemContent` `.ItemIndicator` `.ItemBody` |
| `Avatar`  | `<Avatar>` | `.Group` |
| `Steps`   | `<Steps defaultStep={0} count={n}>` | `.List` `.Item` `.Trigger` `.Indicator` `.Separator` `.Content` `.Title` `.Description` `.NextTrigger` `.PrevTrigger` `.CompletedContent` |
| `Popover` | `<Popover>` | `.Trigger` `.Content` `.Arrow` `.Header` `.Body` `.Footer` `.Title` `.Description` `.CloseTrigger` |
| `Stat`    | `<Stat>` | `.Label` `.ValueText` `.HelpText` `.UpIndicator` `.DownIndicator` |
| `DataList`| `<DataList>` | `.Item` `.ItemLabel` `.ItemValue` |
| `RadioGroup` | `<RadioGroup>` | `.Item` `.ItemHiddenInput` `.ItemIndicator` `.ItemText` |
| `RadioCard`  | `<RadioCard>` | `.Item` `.ItemControl` `.ItemText` `.ItemDescription` `.ItemIndicator` `.ItemHiddenInput` `.ItemContent` `.ItemAddon` `.Label` |
| `Tooltip` | `<Tooltip>` | `.Trigger` `.Content` `.Arrow` `.Positioner` |

### Pattern B — Component has a `.Root` sub-key
Only `Breadcrumb` explicitly has `.Root` (as an alias to a different component):

| Component | Correct root tag |
|-----------|-----------------|
| `Breadcrumb` | `<Breadcrumb.Root>` | `.List` `.Item` `.Link` `.CurrentLink` `.Ellipsis` `.Separator` |

---

## Compound Component Usage Examples

### Table
```jsx
<Table size="sm">
  <Table.Header>
    <Table.Row bg="gray.50">
      <Table.ColumnHeader scope="col">Name</Table.ColumnHeader>
      <Table.ColumnHeader scope="col">Value</Table.ColumnHeader>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row _hover={{ bg: 'blue.50' }}>
      <Table.Cell>Row data</Table.Cell>
      <Table.Cell>Row data</Table.Cell>
    </Table.Row>
  </Table.Body>
  <Table.Caption>Optional caption</Table.Caption>
</Table>
```

### Tabs
```jsx
<Tabs defaultValue="tab1" variant="line" size="sm">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Content 1</Tabs.Content>
  <Tabs.Content value="tab2">Content 2</Tabs.Content>
</Tabs>
```
Controlled: `value={val} onValueChange={(e) => setVal(e.value)}`
Props: `defaultValue`, `value`, `onValueChange`, `variant` ("line"|"enclosed"|"plain"), `size` ("sm"|"md"|"lg")

### Timeline
```jsx
<Timeline>
  <Timeline.Item>
    <Timeline.Indicator bg="green.500" />
    <Timeline.Connector />
    <Timeline.Content>
      <Timeline.Title>Event title</Timeline.Title>
      <Timeline.Description>Details here</Timeline.Description>
    </Timeline.Content>
  </Timeline.Item>
</Timeline>
```

### Modal
```jsx
<Modal open={open} onOpenChange={(d) => { if (!d.open) onClose(); }} size="md">
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Title</Modal.Title>
    </Modal.Header>
    <Modal.Body>Content</Modal.Body>
    <Modal.Footer>
      <Button variant="outline" onClick={onClose}>Cancel</Button>
      <Button colorPalette="blue">Save</Button>
    </Modal.Footer>
    <Modal.CloseTrigger />
  </Modal.Content>
</Modal>
```
Props: `open`, `onOpenChange`, `size` ("sm"|"md"|"lg"|"xl"|"full"), `placement` (default: "center"), `scrollBehavior` (default: "inside"), `closeOnInteractOutside`, `closeOnEscape`

### Drawer
```jsx
<Drawer open={open} onOpenChange={(d) => { if (!d.open) onClose(); }} placement="end" size="md">
  <Drawer.Content>
    <Drawer.Header><Drawer.Title>Title</Drawer.Title></Drawer.Header>
    <Drawer.Body>Content</Drawer.Body>
    <Drawer.Footer>Actions</Drawer.Footer>
    <Drawer.CloseTrigger />
  </Drawer.Content>
</Drawer>
```

### Menu
```jsx
<Menu>
  <Menu.Trigger asChild><Button>Actions</Button></Menu.Trigger>
  <Menu.Content>
    <Menu.Item value="edit">Edit</Menu.Item>
    <Menu.Item value="delete">Delete</Menu.Item>
    <Menu.Separator />
    <Menu.ItemGroup>
      <Menu.ItemGroupLabel>More</Menu.ItemGroupLabel>
      <Menu.Item value="duplicate">Duplicate</Menu.Item>
    </Menu.ItemGroup>
  </Menu.Content>
</Menu>
```

### Card
```jsx
<Card>
  <Card.Header><Card.Title>Title</Card.Title></Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

### Accordion
```jsx
<Accordion>
  <Accordion.Item value="a">
    <Accordion.ItemTrigger>Section A</Accordion.ItemTrigger>
    <Accordion.ItemContent>Content A</Accordion.ItemContent>
  </Accordion.Item>
</Accordion>
```
Props: `multiple`, `defaultValue={["a"]}`, `collapsible`

### Popover
```jsx
<Popover>
  <Popover.Trigger asChild><Button>Open</Button></Popover.Trigger>
  <Popover.Content>
    <Popover.Header>Title</Popover.Header>
    <Popover.Body>Content</Popover.Body>
    <Popover.CloseTrigger />
  </Popover.Content>
</Popover>
```

### Steps
```jsx
<Steps defaultStep={0} count={3}>
  <Steps.List>
    <Steps.Item index={0}><Steps.Trigger><Steps.Indicator /><Steps.Title>Step 1</Steps.Title></Steps.Trigger><Steps.Separator /></Steps.Item>
    <Steps.Item index={1}><Steps.Trigger><Steps.Indicator /><Steps.Title>Step 2</Steps.Title></Steps.Trigger><Steps.Separator /></Steps.Item>
  </Steps.List>
  <Steps.Content index={0}>Step 1 content</Steps.Content>
  <Steps.Content index={1}>Step 2 content</Steps.Content>
  <Steps.CompletedContent>Done!</Steps.CompletedContent>
  <Steps.PrevTrigger asChild><Button variant="outline">Back</Button></Steps.PrevTrigger>
  <Steps.NextTrigger asChild><Button>Next</Button></Steps.NextTrigger>
</Steps>
```

### Breadcrumb
```jsx
// ⚠️ Exception — Breadcrumb DOES use .Root
<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
      <Breadcrumb.Separator />
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <Breadcrumb.CurrentLink>Current Page</Breadcrumb.CurrentLink>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

### Stat
```jsx
<Stat>
  <Stat.Label>Revenue</Stat.Label>
  <Stat.ValueText>$12.4K</Stat.ValueText>
  <Stat.HelpText>
    <Stat.UpIndicator /> 8.2% vs last week
  </Stat.HelpText>
</Stat>
```

### DataList
```jsx
<DataList>
  <DataList.Item>
    <DataList.ItemLabel>Status</DataList.ItemLabel>
    <DataList.ItemValue>Active</DataList.ItemValue>
  </DataList.Item>
</DataList>
```

### Tooltip
```jsx
// Simple usage (wraps child automatically)
<Tooltip content="Help text">
  <Button>Hover me</Button>
</Tooltip>
```

### RadioGroup
```jsx
<RadioGroup value={val} onValueChange={(e) => setVal(e.value)}>
  <RadioGroup.Item value="a">
    <RadioGroup.ItemHiddenInput />
    <RadioGroup.ItemIndicator />
    <RadioGroup.ItemText>Option A</RadioGroup.ItemText>
  </RadioGroup.Item>
</RadioGroup>
```

### Avatar
```jsx
<Avatar name="John Doe" src="/avatar.jpg" size="md" />
<Avatar.Group>
  <Avatar name="Alice" />
  <Avatar name="Bob" />
</Avatar.Group>
```

---

## Simple Components (Direct Use — No Dot Notation)

### Alert
```jsx
<Alert status="info" title="Optional title">
  Body text here
</Alert>
```
Props: `status` ("info"|"warning"|"error"|"success"), `title`, `icon` (false to hide), `closable`, `onClose`

### Input
```jsx
<Input
  label="Field Label"
  placeholder="Type here..."
  helperText="Optional help"
  errorText="Error message"
  invalid={false}
  required={true}
  disabled={false}
  readOnly={false}
  value={val}
  onChange={(e) => setVal(e.target.value)}
/>
```

### Select
```jsx
<Select
  label="Choose"
  placeholder="Select option"
  options={[
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
  ]}
  invalid={false}
  required={true}
  disabled={false}
/>
```

### Button
```jsx
<Button variant="solid" colorPalette="blue" size="sm">Primary</Button>
<Button variant="outline" size="sm">Secondary</Button>
<Button variant="ghost" size="sm">Tertiary</Button>
<Button variant="subtle" size="sm">Subtle</Button>
```
Props: `variant`, `colorPalette`, `size` ("xs"|"sm"|"md"|"lg"), `loading`, `disabled`, `asChild`

### Badge
```jsx
<Badge colorPalette="green" variant="subtle" size="sm">Active</Badge>
```
Props: `colorPalette`, `variant` ("subtle"|"solid"|"outline"|"surface"), `size`

### Tag
```jsx
<Tag colorPalette="blue" variant="subtle" size="sm">Category</Tag>
```

### Checkbox
```jsx
<Checkbox label="Accept terms" checked={val} onCheckedChange={(e) => setVal(e.checked)} />
```
Props: `label`, `checked`, `onCheckedChange`, `disabled`, `invalid`

### Switch
```jsx
<Switch label="Enable feature" checked={val} onCheckedChange={(e) => setVal(e.checked)} />
```
Props: `label`, `checked`, `onCheckedChange`, `disabled`

### Spinner
```jsx
<Spinner size="md" />
```

### Separator
```jsx
<Separator orientation="horizontal" />   // or "vertical"
```

---

## Layout & Utility Components

All re-exported from Chakra UI — use style props, NOT inline styles:
```jsx
// Box, Flex, Stack, HStack, VStack, Grid, Center, Container, Spacer
// Text, Heading, Span, Strong, Em, Link, Image
```

```jsx
<Box p="4" bg="bg.subtle" borderRadius="md" borderWidth="1px" borderColor="border">
<Flex alignItems="center" gap="3" justifyContent="space-between">
<Stack gap="4">          // vertical stack
<HStack gap="2">         // horizontal stack
<Grid templateColumns="repeat(3, 1fr)" gap="4">
<Text fontSize="sm" color="fg.muted" fontWeight="medium">
<Heading size="md" color="fg">
```

**Design token reference:**
- Spacing: `1`=4px `2`=8px `3`=12px `4`=16px `5`=20px `6`=24px `8`=32px `10`=40px `12`=48px
- Colors: `fg` `fg.muted` `fg.subtle` `bg` `bg.muted` `bg.subtle` `border` `border.muted`
- `colorPalette`: `blue` `green` `red` `orange` `yellow` `purple` `teal` `cyan` `pink` `gray`
- Border radius: `sm` `md` `lg` `xl` `2xl` `full`

---

## Full Component List (108)

Accordion, ActionBar, Alert, AspectRatio, Avatar, Badge, Bleed, Blockquote, Box, Breadcrumb, Button, Card, Carousel, Center, Checkbox, CheckboxCard, Checkmark, ClientOnly, Clipboard, CloseButton, Code, CodeBlock, Collapsible, ColorModeToggle, ColorPicker, ColorSwatch, Combobox, Container, DataList, DatePicker, DownloadTrigger, Drawer, Editable, Em, EmptyState, Environment, Field, Fieldset, FileUpload, Flex, Float, FocusTrap, For, Format, Grid, Group, Heading, Highlight, HoverCard, Icon, Image, Input, InputAddon, InputElement, InputGroup, Kbd, Link, List, Listbox, Loader, Locale, Mark, Marquee, Menu, Modal, NativeSelect, NumberInput, Pagination, PinInput, Popover, Portal, Presence, Progress, ProgressCircle, QrCode, Quote, Radio, RadioCard, Radiomark, Rating, ScrollArea, SegmentedControl, Select, Separator, Show, Skeleton, SkipNav, Slider, Spacer, Span, Spinner, Splitter, Stack, Stat, Status, Steps, Sticky, Strong, Switch, Table, Tabs, Tag, TagsInput, Text, Textarea, Timeline, Toast, Toggle, Tooltip, TreeView, VisuallyHidden, Wrap
