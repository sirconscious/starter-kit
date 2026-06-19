<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
 
---
 
## What is already set up
 
- Next.js 16 (App Router)
- Prisma (connected to Neon PostgreSQL)
- Clerk (auth, organizations, billing)
- shadcn/ui
- Deployed on Vercel
 
---
 
## What still needs to be built
 
- Prisma schema (Organization, User, Membership, Project, Task)
- Clerk webhook handler → sync orgs/users to Postgres
- Billing integration using Clerk billing APIs
- Dashboard layout (org switcher, nav, user menu)
- Projects & Tasks CRUD (example feature, fully org-scoped)
- Vitest unit tests + Playwright e2e tests
- CI via GitHub Actions (lint, typecheck, tests, migration check)