import { auth } from '@clerk/nextjs/server'

export default async function OrgDashboardPage() {
  const { orgId, orgSlug } = await auth()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Active org: {orgSlug} ({orgId})
        </p>
      </div>
    </div>
  )
}
