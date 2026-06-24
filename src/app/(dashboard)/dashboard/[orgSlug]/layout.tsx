import { auth } from '@clerk/nextjs/server'
import { notFound } from 'next/navigation'

export default async function OrgLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ orgSlug: string }>
}) {
  const { orgSlug: activeSlug } = await auth()
  const { orgSlug } = await params

  if (orgSlug !== activeSlug) {
    notFound()
  }

  return <>{children}</>
}
