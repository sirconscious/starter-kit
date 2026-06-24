# Sidebar Collapse Button in Footer

## New File

`src/components/sidebar-collapse-button.tsx`:

```tsx
'use client'

import { PanelLeftClose } from 'lucide-react'
import { useSidebar } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'

export function SidebarCollapseButton() {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleSidebar}
      className="w-full justify-start gap-2"
    >
      <PanelLeftClose className="size-4" />
      <span>Collapse sidebar</span>
    </Button>
  )
}
```

## Modified File

`src/components/app-sidebar.tsx`:
- Re-add `SidebarFooter` import from `@/components/ui/sidebar`
- Import `SidebarCollapseButton` from `@/components/sidebar-collapse-button`
- Add `<SidebarFooter>` with `<SidebarCollapseButton />` before closing `</Sidebar>`
