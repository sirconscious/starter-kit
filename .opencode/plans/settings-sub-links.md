# Settings Sub-Links Implementation

## Goal
Split the Settings page into User Settings and Organization Settings, with an expandable sidebar.

## Route Structure

```
settings/
├── page.tsx                          → redirect(`/dashboard/${orgSlug}/settings/user`)
├── user/[[...rest]]/page.tsx         → <UserProfile />
└── organization/[[...rest]]/page.tsx → <OrganizationProfile />
```

## New Files

### 1. `src/components/settings-nav-item.tsx`
Client component — collapsible Settings nav item with two sub-links.

```tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Settings,
  User,
  Building,
  ChevronDown,
} from 'lucide-react'
import {
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

export function SettingsNavItem({ orgSlug }: { orgSlug: string }) {
  const [open, setOpen] = useState(true)

  return (
    <SidebarMenuItem>
      <SidebarMenuButton onClick={() => setOpen(!open)}>
        <Settings className="size-4" />
        <span>Settings</span>
        <ChevronDown
          className={`ml-auto size-4 transition-transform ${open ? '' : '-rotate-90'}`}
        />
      </SidebarMenuButton>
      {open && (
        <SidebarMenuSub>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton render={<Link href={`/dashboard/${orgSlug}/settings/user`} />}>
              <User className="size-4" />
              <span>User Settings</span>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton render={<Link href={`/dashboard/${orgSlug}/settings/organization`} />}>
              <Building className="size-4" />
              <span>Org Settings</span>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  )
}
```

### 2. `src/app/(dashboard)/dashboard/[orgSlug]/settings/page.tsx`

```tsx
import { redirect } from 'next/navigation'

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ orgSlug: string }>
}) {
  const { orgSlug } = await params
  redirect(`/dashboard/${orgSlug}/settings/user`)
}
```

### 3. `src/app/(dashboard)/dashboard/[orgSlug]/settings/user/[[...rest]]/page.tsx`

```tsx
import { UserProfile } from '@clerk/nextjs'

export default function UserSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">User Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your personal account settings.
        </p>
      </div>

      <UserProfile />
    </div>
  )
}
```

### 4. `src/app/(dashboard)/dashboard/[orgSlug]/settings/organization/[[...rest]]/page.tsx`

```tsx
import { OrganizationProfile } from '@clerk/nextjs'

export default function OrgSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Organization Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your organization settings and preferences.
        </p>
      </div>

      <OrganizationProfile />
    </div>
  )
}
```

## Modified Files

### `src/components/app-sidebar.tsx`
- Import `SettingsNavItem` from `@/components/settings-nav-item`
- Replace the `Settings` nav item in `navItems.map()` with `<SettingsNavItem orgSlug={orgSlug} />`
- Remove `Settings` from `navItems` array (it's now rendered separately)
- Import stays: Settings icon still used if needed

## Deleted Files

- `src/app/(dashboard)/dashboard/[orgSlug]/settings/[[...rest]]/page.tsx`

## Build verification

```bash
npx next build
```
Check the route table includes `/dashboard/[orgSlug]/settings/user/[[...rest]]` and `/dashboard/[orgSlug]/settings/organization/[[...rest]]`.
