# Fix org-selection infinite re-render

## Root cause
Middleware `organizationSyncOptions.patterns: ['/dashboard/:slug']` matches `/dashboard/org-selection`, causing Clerk to keep trying to sync a non-existent org slug.

## Fix
Move org-selection out of `/dashboard/` to `/org-selection`.

### 1. Create `src/app/org-selection/page.tsx`
```tsx
import { OrganizationList } from '@clerk/nextjs'

export default function OrgSelectionPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <OrganizationList
        hidePersonal={true}
        afterSelectOrganizationUrl="/dashboard/:slug"
        afterCreateOrganizationUrl="/dashboard/:slug"
      />
    </div>
  )
}
```

### 2. Update `src/components/app-sidebar.tsx` line 28
`redirect('/dashboard/org-selection')` → `redirect('/org-selection')`

### 3. Update `src/app/(dashboard)/dashboard/page.tsx` line 8
`redirect('/dashboard/org-selection')` → `redirect('/org-selection')`

### 4. Delete old directory
`rm -rf src/app/(dashboard)/dashboard/org-selection/`
