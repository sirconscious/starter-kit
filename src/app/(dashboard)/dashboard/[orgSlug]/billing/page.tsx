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
