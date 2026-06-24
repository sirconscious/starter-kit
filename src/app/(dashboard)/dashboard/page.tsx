import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function DashboardRootPage() {
  const { orgSlug } = await auth()

  if (!orgSlug) {
    redirect('/org-selection')
  }

  redirect(`/dashboard/${orgSlug}`)
}
