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
