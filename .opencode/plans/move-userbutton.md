# Move UserButton to Header

## Changes

### 1. `src/app/(dashboard)/layout.tsx`
- Import `UserButton` from `@clerk/nextjs`
- Add `<UserButton />` before the Sun button in the header

```tsx
import { UserButton } from '@clerk/nextjs'
// ...
<header className="sticky top-0 z-10 flex h-14 items-center gap-2 border-b bg-background px-4">
  <SidebarTrigger />
  <Separator orientation="vertical" className="h-4" />
  <span className="text-sm text-muted-foreground">Dashboard</span>
  <div className="ml-auto flex items-center gap-2">
    <UserButton />
    <Button variant="ghost" size="icon">
      <Sun className="size-4" />
    </Button>
  </div>
</header>
```

### 2. `src/components/app-sidebar.tsx`
- Remove `UserButton` import
- Remove the `SidebarFooter` section entirely

## Result
Header: `[≡] | Dashboard              [UserButton] [☀️]`
Sidebar: No more UserButton in footer.
