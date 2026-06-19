import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export default function Home() {
  return (
    <>
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="text-xl font-bold">
            SaaSKit
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/pricing">
              <Button variant="ghost">Pricing</Button>
            </Link>
            <Show when="signed-out">
              <SignInButton>
                <Button variant="ghost">Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button variant="default">Get Started</Button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        </div>
      </nav>

      <section className="py-20 text-center">
        <div className="mx-auto max-w-5xl px-6">
          <Badge variant="outline" className="mb-4">
            Open Source
          </Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            The SaaS Starter Kit built for teams
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Multi-tenant, org-based architecture. Auth, billing, database — all
            wired up. Ship your product, not your infrastructure.
          </p>
          <div className="flex items-center justify-center gap-4">
            <SignUpButton>
              <Button size="lg">Start Building Free</Button>
            </SignUpButton>
            <Link
              href="https://github.com"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              View on GitHub
            </Link>
          </div>
        </div>
      </section>

      <Separator />

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Authentication & Orgs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Clerk handles sign-up, sign-in, org switching, invitations,
                  and roles out of the box.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Database Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Prisma ORM connected to Neon PostgreSQL. Multi-tenant schema
                  scoped by org_id from day one.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Billing Included</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Clerk billing APIs integrated. Manage subscriptions and plans
                  without a separate Stripe setup.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator />

      <section className="py-16 text-center">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Badge variant="secondary">Next.js 16</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Clerk</Badge>
            <Badge variant="secondary">Prisma</Badge>
            <Badge variant="secondary">Neon</Badge>
            <Badge variant="secondary">shadcn/ui</Badge>
            <Badge variant="secondary">Tailwind v4</Badge>
            <Badge variant="secondary">Vercel</Badge>
          </div>
        </div>
      </section>

      <Separator />

      <footer className="py-8 text-center text-sm text-muted-foreground">
        <div className="mx-auto max-w-5xl px-6">
          SaaSKit — Open source. Built with Next.js & Clerk.
        </div>
      </footer>
    </>
  )
}
