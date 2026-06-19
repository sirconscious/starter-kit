'use client'

import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <nav className="sticky top-0 z-50 bg-background border-b border-border h-[60px] px-8 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          Saas<span className="text-primary">Kit</span>
        </Link>
        <div className="hidden md:flex gap-6">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">Features</a>
          <a href="#stack" className="text-sm font-medium text-muted-foreground hover:text-foreground">Stack</a>
          <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">Pricing</Link>
          <a href="https://github.com/sirconscious/starter-kit" className="text-sm font-medium text-muted-foreground hover:text-foreground">Docs</a>
        </div>
        <div className="flex gap-2 items-center">
          <Show when="signed-out">
            <SignInButton>
              <button className="text-sm font-semibold px-4 py-2 rounded-lg border border-border bg-transparent text-foreground">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="text-sm font-semibold px-4 py-2 rounded-lg bg-primary text-primary-foreground">
                Get Started &rarr;
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link href="/dashboard">
              <button className="text-sm font-semibold px-4 py-2 rounded-lg border border-border bg-transparent text-foreground">
                Dashboard
              </button>
            </Link>
            <UserButton />
          </Show>
        </div>
      </nav>

      <section className="py-16 sm:py-24 px-4 sm:px-8 text-center border-b border-border">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.08] text-foreground max-w-2xl mx-auto mb-5">
          The SaaS Starter Kit built to <span className="text-primary">actually ship</span>
        </h1>
        <p className="text-base text-muted-foreground max-w-lg mx-auto mb-9 leading-relaxed">
          Auth, billing, multi-tenancy, and a full dashboard &mdash; wired up and ready. Skip the boilerplate. Ship your product.
        </p>
        <div className="flex-col sm:flex-row gap-3 justify-center mb-12">
          <SignUpButton>
            <button className="text-[15px] font-semibold px-6 py-2.5 rounded-lg bg-primary text-primary-foreground">
              Start Building Free
            </button>
          </SignUpButton>
          <a href="https://github.com/sirconscious/starter-kit">
            <button className="text-[15px] font-semibold px-6 py-2.5 rounded-lg border border-border bg-transparent text-foreground">
              View on GitHub
            </button>
          </a>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="bg-card border border-border px-3 py-1 rounded-full text-xs font-medium text-muted-foreground">Next.js 16</span>
          <span className="bg-card border border-border px-3 py-1 rounded-full text-xs font-medium text-muted-foreground">Clerk</span>
          <span className="bg-card border border-border px-3 py-1 rounded-full text-xs font-medium text-muted-foreground">Prisma</span>
          <span className="bg-card border border-border px-3 py-1 rounded-full text-xs font-medium text-muted-foreground">Neon</span>
          <span className="bg-card border border-border px-3 py-1 rounded-full text-xs font-medium text-muted-foreground">shadcn/ui</span>
          <span className="bg-card border border-border px-3 py-1 rounded-full text-xs font-medium text-muted-foreground">Tailwind v4</span>
          <span className="bg-card border border-border px-3 py-1 rounded-full text-xs font-medium text-muted-foreground">TypeScript</span>
          <span className="bg-card border border-border px-3 py-1 rounded-full text-xs font-medium text-muted-foreground">Vercel</span>
        </div>
      </section>

      <section className="px-4 sm:px-8 py-4 border-b border-border flex items-center gap-4">
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground whitespace-nowrap">
          Trusted stack
        </span>
        <div className="w-px h-5 bg-border" />
        <div className="flex gap-6 flex-wrap items-center">
          <span className="text-xs font-bold tracking-wider text-border uppercase">NEXT.JS</span>
          <span className="text-xs font-bold tracking-wider text-border uppercase">CLERK</span>
          <span className="text-xs font-bold tracking-wider text-border uppercase">PRISMA</span>
          <span className="text-xs font-bold tracking-wider text-border uppercase">NEON</span>
          <span className="text-xs font-bold tracking-wider text-border uppercase">VERCEL</span>
          <span className="text-xs font-bold tracking-wider text-border uppercase">SHADCN/UI</span>
        </div>
      </section>

      <section id="features" className="py-16 px-4 sm:px-8 border-b border-border">
        <p className="text-xs font-bold uppercase tracking-widest text-primary text-center mb-3">
          What&apos;s included
        </p>
        <h2 className="text-3xl font-extrabold tracking-tight text-center mb-2">
          Everything wired. Nothing missing.
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-12">
          The decisions are already made. The integrations are already connected.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-[15px] font-bold mb-2">Auth + Organizations</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Clerk handles sign-up, sign-in, org switching, invitations, and roles. Multi-tenant from the first line.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-[15px] font-bold mb-2">Database Ready</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Prisma ORM connected to Neon PostgreSQL. Org-scoped schema, migrations committed, and ready to extend.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-[15px] font-bold mb-2">Billing Included</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Clerk Billing APIs integrated. Pricing table, subscription plans, and feature gating &mdash; no Stripe config needed.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-[15px] font-bold mb-2">Dashboard Layout</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sidebar navigation, org switcher, user menu, and a collapsible layout with persistent state via cookies.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-[15px] font-bold mb-2">shadcn/ui + Tailwind v4</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Full component library, custom theme via CSS variables, and a dark mode Clerk appearance out of the box.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-[15px] font-bold mb-2">Deploy in Minutes</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Configured for Vercel. Add your env vars, push to GitHub, and your SaaS is live on a production URL.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-8 border-b border-border bg-card">
        <p className="text-xs font-bold uppercase tracking-widest text-primary text-center mb-3">
          How it works
        </p>
        <h2 className="text-3xl font-extrabold tracking-tight text-center">
          From clone to deployed in under an hour
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border mt-12">
          <div className="py-8 md:py-0 md:px-8 first:pt-0 md:first:pl-0 last:pb-0 md:last:pr-0">
            <p className="text-5xl font-extrabold text-border leading-none mb-4">01</p>
            <h3 className="text-base font-bold mb-2">Clone &amp; install</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Fork the repo, run npm install, and add your Clerk and Neon environment variables to .env.
            </p>
          </div>
          <div className="py-8 md:py-0 md:px-8 first:pt-0 md:first:pl-0 last:pb-0 md:last:pr-0">
            <p className="text-5xl font-extrabold text-border leading-none mb-4">02</p>
            <h3 className="text-base font-bold mb-2">Configure your plans</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Set up subscription plans in the Clerk Dashboard. The pricing table renders them automatically.
            </p>
          </div>
          <div className="py-8 md:py-0 md:px-8 first:pt-0 md:first:pl-0 last:pb-0 md:last:pr-0">
            <p className="text-5xl font-extrabold text-border leading-none mb-4">03</p>
            <h3 className="text-base font-bold mb-2">Ship your feature</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Auth, billing, and database are done. Write the code that makes your product unique and deploy.
            </p>
          </div>
        </div>
      </section>

      <section id="stack" className="py-16 px-4 sm:px-8 border-b border-border">
        <p className="text-xs font-bold uppercase tracking-widest text-primary text-center mb-3">
          The stack
        </p>
        <h2 className="text-3xl font-extrabold tracking-tight text-center">
          Chosen for a reason
        </h2>
        <p className="text-sm text-muted-foreground text-center mt-2 mb-12">
          Every tool in this kit is production-grade and widely adopted.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-card border border-border rounded-lg p-5">
            <p className="text-sm font-bold">Next.js 16</p>
            <p className="text-xs text-muted-foreground mt-0.5">App Router, Turbopack</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary mt-3">Framework</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-5">
            <p className="text-sm font-bold">Clerk</p>
            <p className="text-xs text-muted-foreground mt-0.5">Auth, Orgs, Billing</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary mt-3">Authentication</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-5">
            <p className="text-sm font-bold">Prisma</p>
            <p className="text-xs text-muted-foreground mt-0.5">Type-safe ORM</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary mt-3">Database</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-5">
            <p className="text-sm font-bold">Neon</p>
            <p className="text-xs text-muted-foreground mt-0.5">Serverless Postgres</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary mt-3">Database</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-5">
            <p className="text-sm font-bold">shadcn/ui</p>
            <p className="text-xs text-muted-foreground mt-0.5">Radix + Tailwind</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary mt-3">Components</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-5">
            <p className="text-sm font-bold">Tailwind v4</p>
            <p className="text-xs text-muted-foreground mt-0.5">CSS-first config</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary mt-3">Styling</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-5">
            <p className="text-sm font-bold">TypeScript</p>
            <p className="text-xs text-muted-foreground mt-0.5">Strict mode</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary mt-3">Language</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-5">
            <p className="text-sm font-bold">Vercel</p>
            <p className="text-xs text-muted-foreground mt-0.5">Edge deployment</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary mt-3">Hosting</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-8 text-center bg-primary">
        <h2 className="text-4xl font-extrabold tracking-tight text-primary-foreground mb-3">
          Ready to stop rebuilding boilerplate?
        </h2>
        <p className="text-[15px] text-primary-foreground/75 mb-8">
          Clone the repo, add your keys, and ship something real.
        </p>
        <div className="flex-col sm:flex-row gap-3 justify-center">
          <SignUpButton>
            <button className="text-sm font-bold px-6 py-2.5 rounded-lg bg-primary-foreground text-primary">
              Start Building Free
            </button>
          </SignUpButton>
          <a href="https://github.com/sirconscious/starter-kit">
            <button className="text-sm font-semibold px-6 py-2.5 rounded-lg border border-primary-foreground/40 text-primary-foreground bg-transparent">
              View on GitHub
            </button>
          </a>
        </div>
      </section>

      <footer className="px-4 sm:px-8 py-6 border-t border-border bg-background flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
        <p className="text-[15px]">
          Saas<span className="text-primary font-bold">Kit</span>
        </p>
        <p className="text-xs text-muted-foreground">
          Open source &middot; MIT License &middot; Built with Next.js &amp; Clerk
        </p>
      </footer>
    </>
  )
}
