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
