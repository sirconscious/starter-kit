'use client'

import { PricingTable } from '@clerk/nextjs'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

export default function PricingPage() {
  return (
    <>
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="text-xl font-bold">
            SaaSKit
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Home</Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="py-16 text-center">
        <div className="mx-auto max-w-5xl px-6">
          <Badge variant="outline">Billing</Badge>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">
            Simple, transparent pricing
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-lg text-muted-foreground">
            Start free. Scale as you grow. No hidden fees, no surprises.
          </p>
        </div>
      </section>

      <Separator />

      <section className="py-12 text-center">
        <div className="mx-auto max-w-5xl px-6">
          <PricingTable />
        </div>
      </section>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <div className="mx-auto max-w-5xl px-6">
          SaaSKit — Open source. Built with Next.js & Clerk.
        </div>
      </footer>
    </>
  )
}
