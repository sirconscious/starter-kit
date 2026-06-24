# Billing Page - Implementation

## File to create

`src/app/(dashboard)/dashboard/[orgSlug]/billing/page.tsx`

````tsx
import { auth } from '@clerk/nextjs/server'
import { PricingTable } from '@clerk/nextjs'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default async function BillingPage() {
  const { has } = await auth()

  const currentPlan = has({ plan: 'org:pro' })
    ? 'Pro'
    : has({ plan: 'org:starter' })
      ? 'Starter'
      : 'Free'

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your organization&apos;s subscription and billing.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">{currentPlan}</span>
            <Badge variant="outline">Active</Badge>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-4 text-lg font-semibold">Available Plans</h2>
        <PricingTable for="organization" />
      </div>
    </div>
  )
}
````

## Steps

1. Create directory: `mkdir -p src/app/\(dashboard\)/dashboard/\[orgSlug\]/billing`
2. Create the file above at `src/app/(dashboard)/dashboard/[orgSlug]/billing/page.tsx`
3. Verify with `npm run dev`

## Notes from billing skill

- `PricingTable for="organization"` displays org-level plans (must be created in Clerk Dashboard → Billing → Plans → Organization Plans tab)
- `has({ plan })` reads from session claims — zero network, instant
- Session auto-refreshes after checkout; `has()` picks up new plan on next load
- No `'use client'` needed since `PricingTable` handles its own client hydration
